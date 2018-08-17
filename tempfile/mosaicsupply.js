"use strict";
exports.__esModule = true;
var nem2_sdk_1 = require("nem2-sdk");
//우리 프로젝트의 자체적인 모자이크를 위한 네임스페이스를 만드는 함수
var init = function () {
    var namespaceHttp = new nem2_sdk_1.NamespaceHttp('http://localhost:3000');
    //rootnamespace라는 이름의 namespace가 있는지 확인
    var namespace = new nem2_sdk_1.NamespaceId('rootnamespace');
    namespaceHttp.getNamespace(namespace).subscribe(function (namespace) { return console.log(namespace); }, function (err) { return console.error(err); });
    var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
    //namespace의 owner의 private 키
    var privateKey = 'AAABC5B801F936D03D60EA1C9A6A2D9872B83D41FC80AF6B9747C33D2800ACD8';
    var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
    //namespace의 이름 = rootnamespace
    var namespaceName = 'rootnamespace';
    //namespace 생성
    var registerNamespaceTransaction = nem2_sdk_1.RegisterNamespaceTransaction.createRootNamespace(nem2_sdk_1.Deadline.create(), namespaceName, nem2_sdk_1.UInt64.fromUint(1000), nem2_sdk_1.NetworkType.MIJIN_TEST);
    //namepsace 생성 확인용 사인
    var signedTransaction = account.sign(registerNamespaceTransaction);
    transactionHttp.announce(signedTransaction).subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
};
//계정에 rootnamespace:src를 할당하는 함수(※※※※※※※※계정을 만들고 트랜잭션을 발생시키기 위해서 쓰는 함수※※※※※※※※※)
var mosaic_supply = function () {
    var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
    //할당 받는 계정의 private 키
    var privateKey = 'F8198655A67278F77524880A1AB592922C12012F9ACA11D146147B231DE961DA';
    var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
    // Replace with namespace name and mosaic name
    var namespaceName = 'rootnamespace';
    var mosaicName = 'srcc';
    //모자이크 정의 트랜잭션
    /*
     *  모자이크를 만들 땐 두 가지 트랜잭션을 발행해야 함
     *  1. 모자이크 정의 트랜잭션
     *  2. 모자이크 공급 트랜잭션
     */
    //rootnamespace:src 모자이크는 supplymutable 하고 transferable 함
    var mosaicDefinitionTransaction = nem2_sdk_1.MosaicDefinitionTransaction.create(nem2_sdk_1.Deadline.create(), mosaicName, namespaceName, nem2_sdk_1.MosaicProperties.create({
        supplyMutable: true,
        transferable: true,
        levyMutable: false,
        divisibility: 0,
        duration: nem2_sdk_1.UInt64.fromUint(1000)
    }), nem2_sdk_1.NetworkType.MIJIN_TEST);
    var mosaicSupplyChangeTransaction = nem2_sdk_1.MosaicSupplyChangeTransaction.create(nem2_sdk_1.Deadline.create(), mosaicDefinitionTransaction.mosaicId, nem2_sdk_1.MosaicSupplyType.Increase, nem2_sdk_1.UInt64.fromUint(1000000), nem2_sdk_1.NetworkType.MIJIN_TEST);
    // 모자이크 정의 트랜잭션, 모자이크 공급 트랜잭션 두개 모두 아래의 집계 트랜잭션을 사용해서 발표 할 수 있다.
    var aggregateTransaction = nem2_sdk_1.AggregateTransaction.createComplete(nem2_sdk_1.Deadline.create(), [
        mosaicDefinitionTransaction.toAggregate(account.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(account.publicAccount)
    ], nem2_sdk_1.NetworkType.MIJIN_TEST, []);
    var signedTransaction = account.sign(aggregateTransaction);
    transactionHttp
        .announce(signedTransaction)
        .subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
};
//돈 전송 함수
var transfer = function (money) {
    //돈을 받는 계정의 address
    var recipientAddress = nem2_sdk_1.Address.createFromRawAddress('SDK5PUEEYEXH22TL3WAMRJ5D36TQN6OY4AXCQ74B');
    var transferTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), recipientAddress, [new nem2_sdk_1.Mosaic(new nem2_sdk_1.MosaicId('rootnamespace:src'), nem2_sdk_1.UInt64.fromUint(money))], nem2_sdk_1.PlainMessage.create("Welcome To NEM"), nem2_sdk_1.NetworkType.MIJIN_TEST);
    //돈을 주는 계정의 address
    var privateKey = 'AAABC5B801F936D03D60EA1C9A6A2D9872B83D41FC80AF6B9747C33D2800ACD8';
    var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
    var signedTransaction = account.sign(transferTransaction);
    var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
    transactionHttp.announce(signedTransaction).subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
};
//init();
mosaic_supply();
//transfer(100);
