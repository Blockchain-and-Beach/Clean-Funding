"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nem2_sdk_1 = require("nem2-sdk");
function charge(address, money) {
    //address: 이 버튼을 누르는 후원자 계정의 주소
    //교환 트랜잭션: 네임스페이스 foo 안의 token이라는 모자이크를 10만큼 address에 줌
    const transferTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), nem2_sdk_1.Address.createFromRawAddress(address), [new nem2_sdk_1.Mosaic(new nem2_sdk_1.MosaicId('rootnamespace:src'), nem2_sdk_1.UInt64.fromUint(money))], nem2_sdk_1.PlainMessage.create('충전 완료'), nem2_sdk_1.NetworkType.MIJIN_TEST);
    //모자이크를 줄 계정의 private키. 돈을 보낼 master 계정의 private 키가 필요함.
    const privateKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
    //돈을 줬다는 것을 사인함
    const signedTransaction = account.sign(transferTransaction);
    const transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.log(err));
}
//# sourceMappingURL=charge.js.map