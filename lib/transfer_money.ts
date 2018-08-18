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
        //루트 네임스페이스: 루트 모자이크
        [new Mosaic(new MosaicId('rootnamespace:src'), UInt64.fromUint(MONEY))],
        PlainMessage.create("Welcome To NEM"),
        NetworkType.MIJIN_TEST);

    //돈을 주는 계정의 private 키, 즉 마스터 계정의 private 키
    const privateKey = process.env.ADMIN_KEY;
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = account.sign(transferTransaction);
    const transactionHttp = new TransactionHttp('http://ec2-13-209-47-31.ap-northeast-2.compute.amazonaws.com:3000');
    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));
}

export {transfer};