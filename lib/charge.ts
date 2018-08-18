import {
    Account,
    Address,
    Deadline,
    UInt64,
    NetworkType,
    PlainMessage,
    TransferTransaction,
    Mosaic,
    MosaicId,
    TransactionHttp
} from 'nem2-sdk';

module.exports = (address: string, money: number): void => {
    //address: 이 버튼을 누르는 후원자 계정의 주소
    //교환 트랜잭션: 네임스페이스 foo 안의 token이라는 모자이크를 10만큼 address에 줌
    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        Address.createFromRawAddress(address),
        [new Mosaic(new MosaicId('rootnamespace:src'), UInt64.fromUint(money))],
        PlainMessage.create('충전 완료'),
        NetworkType.MIJIN_TEST
    );
    
    //모자이크를 줄 계정의 private키. 돈을 보낼 master 계정의 private 키가 필요함.
    const privateKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

    //돈을 줬다는 것을 사인함
    const signedTransaction = account.sign(transferTransaction);

    const transactionHttp = new TransactionHttp('http://localhost:3000');

    transactionHttp.announce(signedTransaction).subscribe(
        x => console.log(x),
        err => console.log(err)
    );
}
