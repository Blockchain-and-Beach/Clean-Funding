"use strict";
exports.__esModule = true;
//개발에 필요한 기능들을 nem2-sdk에서 import함
var nem2_sdk_1 = require("nem2-sdk");
/*var event_listener = document.getElementById('btn_charge');
 
//if 충전 버튼이 눌리면
event_listener.onclick = function() {
    //충전 버튼을 누르면 모자이크 충전하는 함수
    alert("Hello NEM");
}

var charge = (): void => {
    //후원자들의 데이터가 있는 db에서 후원자 정보를 가지고 nem account를 만들기.

}*/
//const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
//console.log('Your new account address is: ', account.address.pretty(), 'andits private key', account.privateKey);
var transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
var privatekey = '36EC654B441D8E6DD6EC5B2EE4A45B3C06E49BEAEE552517C57D0D24EF66AD1C';
var account = nem2_sdk_1.Account.createFromPrivateKey(privatekey, nem2_sdk_1.NetworkType.MIJIN_TEST);
var cosignatory1PublicKey = '1247526150A4026B7ED0B9AEA5F8BB49E7804977A40715DAB4E36DBE792B5922';
var cosignatory1 = nem2_sdk_1.PublicAccount.createFromPublicKey(cosignatory1PublicKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
var cosignatory2PublicKey = '36EC654B441D8E6DD6EC5B2EE4A45B3C06E49BEAEE552517C57D0D24EF66AD1C';
var cosignatory2 = nem2_sdk_1.PublicAccount.createFromPublicKey(cosignatory2PublicKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
var convertIntoMultisigTransaction = nem2_sdk_1.ModifyMultisigAccountTransaction.create(nem2_sdk_1.Deadline.create(), 1, 1, [
    new nem2_sdk_1.MultisigCosignatoryModification(nem2_sdk_1.MultisigCosignatoryModificationType.Add, cosignatory1),
    new nem2_sdk_1.MultisigCosignatoryModification(nem2_sdk_1.MultisigCosignatoryModificationType.Add, cosignatory2)
], nem2_sdk_1.NetworkType.MIJIN_TEST);
var signedTransaction = account.sign(convertIntoMultisigTransaction);
transactionHttp.announce(signedTransaction).subscribe(function (x) { return console.log(x); }, function (err) { return console.log(err); });
