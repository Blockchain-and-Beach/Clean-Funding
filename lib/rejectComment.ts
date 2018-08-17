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

 function rejectComment(senderAddress/*address*/, rejectMessage?:string)
 {
     const recipientAddress = Address.createFromRawAddress(senderAddress);
     const transferRejectTransaction = TransferTransaction.create(
         Deadline.create(),
         recipientAddress,
         [],        // null xem
         PlainMessage.create(rejectMessage),
        NetworkType.MIJIN_TEST);
 }