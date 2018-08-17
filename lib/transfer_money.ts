import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp, 
    PublicAccount, ModifyMultisigAccountTransaction, MultisigCosignatoryModification, MultisigCosignatoryModificationType, Transaction, 
    MosaicSupplyChangeTransaction, MosaicDefinitionTransaction, AggregateTransaction, MosaicProperties, MosaicSupplyType, NamespaceId, NamespaceHttp,
    RegisterNamespaceTransaction
} from 'nem2-sdk';

//돈 전송 함수 money: 돈의 양, address: 돈을 받을 계정의 주소
function transfer(MONEY: number, ADDRESS: string): void {
    //돈을 받는 계정의 address
    const recipientAddress = Address.createFromRawAddress(ADDRESS);
    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipientAddress,
        [new Mosaic(new MosaicId('rootnamespace:src'), UInt64.fromUint(MONEY))],
        PlainMessage.create("Welcome To NEM"),
        NetworkType.MIJIN_TEST);

    //돈을 주는 계정의 private 키, 즉 마스터 계정의 private 키
    const privateKey = 'AAABC5B801F936D03D60EA1C9A6A2D9872B83D41FC80AF6B9747C33D2800ACD8';
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = account.sign(transferTransaction);
    const transactionHttp = new TransactionHttp('http://localhost:3000');
    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));
}