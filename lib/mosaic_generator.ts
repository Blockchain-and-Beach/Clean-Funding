import {
    Account, Address, Deadline, UInt64, NetworkType, TransferTransaction, Mosaic, MosaicId, 
    PublicAccount, MultisigCosignatoryModification, Transaction, 
    MosaicDefinitionTransaction, AggregateTransaction, MosaicProperties, MosaicSupplyType, MosaicSupplyChangeTransaction, TransactionHttp
} from 'nem2-sdk';

<<<<<<< HEAD
//네임스페이스에 모자이크 생성
function mosaic_generator(NsName: string, MosaicName: string): void {
    const transactionHttp = new TransactionHttp('http://localhost:3000');

    //할당 받는 계정의 private 키, 나중에는 마스터 계정의 Address가 위치해야 함
    const privateKey = 'AAD1356E211974CE41D2B05ADB1B33CADE9E0ED4F71811FA023ACCA7D8B50432';
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
=======
//이 모듈 내에서만 사용할 함수.
//모자이크 정의 트랜젝션 객체 만듬.
function makeMosaicDefTransaction(nsName: string, mosaicName: string) {
    return MosaicDefinitionTransaction.create(
        Deadline.create(),
        mosaicName,
        nsName,
        MosaicProperties.create({
            supplyMutable: true,
            transferable: true,
            levyMutable: false,
            divisibility: 0,
            duration: UInt64.fromUint(1000)
        }),
        NetworkType.MIJIN_TEST
    );
}

//SupplyChangeTransaction 만드는 함수.
function makeMosaicSupTransaction(mosaicId : MosaicId, amount : number) {
    if(amount == 0) return null;
    
    let supType = MosaicSupplyType.Increase;
    let amg = amount;

    if(amount < 0) {
        supType = MosaicSupplyType.Decrease;
        amg     = -amg
    }

    return MosaicSupplyChangeTransaction.create(
        Deadline.create(),
        mosaicId,
        supType,
        UInt64.fromUint(amg),
        NetworkType.MIJIN_TEST
    );
}

//지정한 네임스페이스에 모자이크를 만든다. 
//변수명 보면 다 알겠지..
function makeMosaic(nsName, mosaicName, amount) {
    const transactionHttp = new TransactionHttp("http://" + process.env.HOST);

    const privateKey = process.env.ADMIN_KEY as string;
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

    const defTransaction = makeMosaicDefTransaction(nsName, mosaicName);
    const supTransaction = makeMosaicSupTransaction(defTransaction.mosaicId,amount);

>>>>>>> dev
    const aggregateTransaction = AggregateTransaction.createComplete(
        Deadline.create(),
        [
            defTransaction.toAggregate(account.publicAccount),
            supTransaction.toAggregate(account.publicAccount)
        ],
        NetworkType.MIJIN_TEST,
        []
    );

    const signedTransaction = account.sign(aggregateTransaction);

    transactionHttp
        .announce(signedTransaction)
        .subscribe(x=> console.log(x), err => console.error(err));
}

//mosaicName의 supply 양을 변경함. 
//변수명 보면 알겠지..
//참고로 mosaicName은 rootnamespace:subnamespace:mosaicname구조임.
function mosaicChangeSupply(mosaicName,amount) {
    const transactionHttp = new TransactionHttp("http://" + process.env.HOST);

    const privateKey = process.env.ADMIN_KEY as string;
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const mosaicId = new MosaicId(mosaicName);

    const supTransaction = makeMosaicSupTransaction(mosaicId, amount);

    const signedTransaction = account.sign(supTransaction);

    transactionHttp
        .announce(signedTransaction)
        .subscribe(x => console.log(x), err => console.error(err));
}

<<<<<<< HEAD

mosaic_generator('alice', 'fuck');
export {mosaic_generator};
=======
export {mosaicChangeSupply,makeMosaic};
>>>>>>> dev
