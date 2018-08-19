import {
    Account, Address, Deadline, UInt64, NetworkType, TransferTransaction, Mosaic, MosaicId, 
    PublicAccount, MultisigCosignatoryModification, Transaction, 
    MosaicDefinitionTransaction, AggregateTransaction, MosaicProperties, MosaicSupplyType, MosaicSupplyChangeTransaction, TransactionHttp
} from 'nem2-sdk';

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

makeMosaic("vvv", "token", 10000);
makeMosaic("vvv", "won", 10000);

export {mosaicChangeSupply,makeMosaic};
