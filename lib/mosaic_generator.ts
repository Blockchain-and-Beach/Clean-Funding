import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp, 
    PublicAccount, ModifyMultisigAccountTransaction, MultisigCosignatoryModification, MultisigCosignatoryModificationType, Transaction, 
    MosaicSupplyChangeTransaction, MosaicDefinitionTransaction, AggregateTransaction, MosaicProperties, MosaicSupplyType, NamespaceId, NamespaceHttp,
    RegisterNamespaceTransaction
} from 'nem2-sdk';

//네임스페이스에 모자이크 생성
function mosaic_supply(NsName: string, MosaicName: string): void {
    const transactionHttp = new TransactionHttp('http://ec2-13-209-47-31.ap-northeast-2.compute.amazonaws.com:3000');

    //할당 받는 계정의 private 키, 나중에는 마스터 계정의 Address가 위치해야 함
    const privateKey = process.env.ADMIN_KEY;
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    
    //모자이크 정의 트랜잭션
    /*
     *  모자이크를 만들 땐 두 가지 트랜잭션을 발행해야 함
     *  1. 모자이크 정의 트랜잭션
     *  2. 모자이크 공급 트랜잭션
     */
    //rootnamespace:src 모자이크는 supplymutable 하고 transferable 함
    const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
    Deadline.create(),
    MosaicName,
    NsName,
    MosaicProperties.create({
        supplyMutable: true,
        transferable: true,
        levyMutable: false,
        divisibility: 0,
        duration: UInt64.fromUint(1000)
    }),
    NetworkType.MIJIN_TEST);

    const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicDefinitionTransaction.mosaicId,
    MosaicSupplyType.Increase,
    UInt64.fromUint(1000000),
    NetworkType.MIJIN_TEST);

    // 모자이크 정의 트랜잭션, 모자이크 공급 트랜잭션 두개 모두 아래의 집계 트랜잭션을 사용해서 발표 할 수 있다.
    const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        mosaicDefinitionTransaction.toAggregate(account.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(account.publicAccount)
    ],
    NetworkType.MIJIN_TEST,
    []);

    const signedTransaction = account.sign(aggregateTransaction);

    transactionHttp
        .announce(signedTransaction)
        .subscribe(x=> console.log(x),err => console.error(err));
}

export {mosaic_supply};