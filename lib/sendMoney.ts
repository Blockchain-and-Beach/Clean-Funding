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
    const recipientAddress = Address.createFromRawAddress(receiverAddress);
    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipientAddress,
        [new Mosaic(new MosaicId(nsName + ':' + mosaicName), UInt64.fromUint(coinNum))],
        PlainMessage.create(message),
        NetworkType.MIJIN_TEST);
    
    console.log(senderPrivateKey);
    const senderAccount = Account.createFromPrivateKey(senderPrivateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = senderAccount.sign(transferTransaction);
    console.log("fuck");
    const transactionHttp = new TransactionHttp('http://localhost:3000');

    transactionHttp.announce(signedTransaction).subscribe(
        x => console.log(x), err => console.log(err)
    );
}

export {sendMoney};
