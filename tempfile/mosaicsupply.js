"use strict";
exports.__esModule = true;
var nem2_sdk_1 = require("nem2-sdk");
//우리 프로젝트의 자체적인 모자이크를 위한 네임스페이를 만드는 함수
var init = function () {
    var namespaceHttp = new nem2_sdk_1.NamespaceHttp('http://localhost:3000');
    //rootnamespace라는 이름의 namespace가 있는지 확인
    var namespace = new nem2_sdk_1.NamespaceId('rootnamespace');
    namespaceHttp.getNamespace(namespace).subscribe(function (namespace) { return console.log(namespace); }, function (err) { return console.error(err); });
    var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
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
////
var mosaic_supply = function () {
    var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
    var privateKey = 'AAABC5B801F936D03D60EA1C9A6A2D9872B83D41FC80AF6B9747C33D2800ACD8';
    var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
    // Replace with namespace name and mosaic name
    var namespaceName = 'rootnamespace';
    var mosaicName = 'src';
    var mosaicDefinitionTransaction = nem2_sdk_1.MosaicDefinitionTransaction.create(nem2_sdk_1.Deadline.create(), mosaicName, namespaceName, nem2_sdk_1.MosaicProperties.create({
        supplyMutable: true,
        transferable: true,
        levyMutable: false,
        divisibility: 0,
        duration: nem2_sdk_1.UInt64.fromUint(1000)
    }), nem2_sdk_1.NetworkType.MIJIN_TEST);
    var mosaicSupplyChangeTransaction = nem2_sdk_1.MosaicSupplyChangeTransaction.create(nem2_sdk_1.Deadline.create(), mosaicDefinitionTransaction.mosaicId, nem2_sdk_1.MosaicSupplyType.Increase, nem2_sdk_1.UInt64.fromUint(1000000), nem2_sdk_1.NetworkType.MIJIN_TEST);
    var aggregateTransaction = nem2_sdk_1.AggregateTransaction.createComplete(nem2_sdk_1.Deadline.create(), [
        mosaicDefinitionTransaction.toAggregate(account.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(account.publicAccount)
    ], nem2_sdk_1.NetworkType.MIJIN_TEST, []);
    var signedTransaction = account.sign(aggregateTransaction);
    transactionHttp
        .announce(signedTransaction)
        .subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
};
var transfer = function (money) {
    var recipientAddress = nem2_sdk_1.Address.createFromRawAddress('SDK5PUEEYEXH22TL3WAMRJ5D36TQN6OY4AXCQ74B');
    var transferTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), recipientAddress, [new nem2_sdk_1.Mosaic(new nem2_sdk_1.MosaicId('rootnamespace:src'), nem2_sdk_1.UInt64.fromUint(money))], nem2_sdk_1.PlainMessage.create("Welcome To NEM"), nem2_sdk_1.NetworkType.MIJIN_TEST);
    var privateKey = 'AAABC5B801F936D03D60EA1C9A6A2D9872B83D41FC80AF6B9747C33D2800ACD8';
    var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
    var signedTransaction = account.sign(transferTransaction);
    var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
    transactionHttp.announce(signedTransaction).subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
};
init();
mosaic_supply();
transfer(100);
