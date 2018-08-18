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

function sendMoney(nsName:string, mosaicName:string, senderPrivateKey:string, receiverPublicKey:string, coinNum:number, message?:string)
{
    const recipientAddress = Address.createFromPublicKey(receiverPublicKey, NetworkType.MIJIN_TEST);

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

export  {sendMoney};
