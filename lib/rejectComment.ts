// last modifier : CafeM0ca
// 후원자가 투표반대 누르고 호출되는 함수 
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
    Password

 } from 'nem2-sdk';

 function rejectComment(senderPrivateKey:string ,recieverAddress:string/*address*/, rejectMessage?:string)
 {
     const recipientAddress = Address.createFromRawAddress(recieverAddress);
     const transferRejectTransaction = TransferTransaction.create(
         Deadline.create(),
         recipientAddress,
         [],        // null xem
         PlainMessage.create(rejectMessage),
        NetworkType.MIJIN_TEST);

    const account = Account.createFromPrivateKey(senderPrivateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = account.sign(transferRejectTransaction);
    const transactionHttp = new TransactionHttp('http://ec2-13-209-47-31.ap-northeast-2.compute.amazonaws.com:3000');

    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));

 }
 rejectComment("150A3301BEED03A4477FD9FB1E8D6F8494313DDDDE5D209F2521C5ADD73D32CF", 
    "SDL3AYVT3ZQXRHV2OSLOFBJWS3YSZ3NVNGGFXJSH ", "test rejectmessage");
 