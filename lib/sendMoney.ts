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
    TransactionHttp,
    Password,
    NamespaceName

 } from 'nem2-sdk';

 function sendMoney(nsName:string, mosaicName:string, senderPrivateKey:string, receiverAddress:string, coinNum:number, message?:string)
 {
    //senderPrivateKey: 웹에서 후원자가 자신의 privateKey를 입력하는 방식.
    //receiverPublicKey: 게시자의 publicKey로 address추적 publicKey는 서버에 저장되어있어야함
    const recipientAddress = Address.createFromRawAddress(receiverAddress);
    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipientAddress,
        [new Mosaic(new MosaicId(nsName + ':' + mosaicName), UInt64.fromUint(coinNum))],
        PlainMessage.create(message),
        NetworkType.MIJIN_TEST);

    const senderAccount = Account.createFromPrivateKey(senderPrivateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = senderAccount.sign(transferTransaction);
    const transactionHttp = new TransactionHttp('http://ec2-13-209-47-31.ap-northeast-2.compute.amazonaws.com:3000');

    transactionHttp.announce(signedTransaction).subscribe(
        x => console.log(x), err => console.log(err)
    );
 }
