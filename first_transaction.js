"use strict";
exports.__esModule = true;
var nem2_sdk_1 = require("nem2-sdk");
//후원자들의 데이터가 있는 db에서 후원자 정보를 가지고 nem account를 만들기.
var transferTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), 
//충전 버튼을 누른 후원자의 계정의 어드레스
//나중에 후원자의 어드레스가 유동적으로 돌아갈 수 있도록 바꾸어야 함
nem2_sdk_1.Address.createFromRawAddress('SBNXZTHWORF7U24M32TZYAZS7RXD4I2G54Y7VFI3'), [new nem2_sdk_1.Mosaic(new nem2_sdk_1.MosaicId('foo:token'), nem2_sdk_1.UInt64.fromUint(10))], nem2_sdk_1.PlainMessage.create('충전 됌'), nem2_sdk_1.NetworkType.MIJIN_TEST);
//모자이크를 주는 사람의 프라이빗 키
//모자이크를 주는 전용 어카운트를 만듬
var privateKey = '26E2BF9FF583155842B6BB7BE92000C61E1F7E737CE5041AF947AA1FA1328FAD';
var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
var signedTransaction = account.sign(transferTransaction);
var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
transactionHttp.announce(signedTransaction).subscribe(function (x) { return console.log(x); }, function (err) { return console.log(err); });
