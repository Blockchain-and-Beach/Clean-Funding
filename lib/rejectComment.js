"use strict";
exports.__esModule = true;
// last modifier : CafeM0ca
// 후원자가 투표반대 누르고 호출되는 함수 
var nem2_sdk_1 = require("nem2-sdk");
function rejectComment(senderPrivateKey, recieverAddress /*address*/, rejectMessage) {
    var recipientAddress = nem2_sdk_1.Address.createFromRawAddress(recieverAddress);
    var transferRejectTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), recipientAddress, [], // null xem
    nem2_sdk_1.PlainMessage.create(rejectMessage), nem2_sdk_1.NetworkType.MIJIN_TEST);
    var account = nem2_sdk_1.Account.createFromPrivateKey(senderPrivateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
    var signedTransaction = account.sign(transferRejectTransaction);
    var transactionHttp = new nem2_sdk_1.TransactionHttp('http://ec2-13-209-47-31.ap-northeast-2.compute.amazonaws.com:3000');
    transactionHttp.announce(signedTransaction).subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
}
rejectComment("150A3301BEED03A4477FD9FB1E8D6F8494313DDDDE5D209F2521C5ADD73D32CF", "SDL3AYVT3ZQXRHV2OSLOFBJWS3YSZ3NVNGGFXJSH ", "test rejectmessage");
