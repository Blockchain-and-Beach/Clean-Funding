import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp, 
    PublicAccount, ModifyMultisigAccountTransaction, MultisigCosignatoryModification, MultisigCosignatoryModificationType, Transaction, 
    MosaicSupplyChangeTransaction, MosaicDefinitionTransaction, AggregateTransaction, MosaicProperties, MosaicSupplyType, NamespaceId, NamespaceHttp,
    RegisterNamespaceTransaction
} from 'nem2-sdk';


//우리 프로젝트의 자체적인 모자이크를 위한 네임스페이스를 만드는 함수
const init = (): void => {
    const namespaceHttp = new NamespaceHttp('http://localhost:3000');

    //rootnamespace라는 이름의 namespace가 있는지 확인
    const namespace = new NamespaceId('rootnamespace');

    namespaceHttp.getNamespace(namespace).subscribe(namespace => console.log(namespace), err => console.error(err));

    const transactionHttp = new TransactionHttp('http://localhost:3000');

    //namespace의 owner의 private 키, master 계정의 private키
    const privateKey = 'AAABC5B801F936D03D60EA1C9A6A2D9872B83D41FC80AF6B9747C33D2800ACD8';
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

    //namespace의 이름 = rootnamespace
    const namespaceName = 'rootnamespace';
    //namespace 생성
    const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
        Deadline.create(),
        namespaceName,
        UInt64.fromUint(1000),
        NetworkType.MIJIN_TEST);

    //namepsace 생성 확인용 사인
    const signedTransaction = account.sign(registerNamespaceTransaction);

    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));
}

//계정에 rootnamespace:src를 할당하는 함수(※※※※※※※※계정을 만들고 트랜잭션을 발생시키기 위해서 쓰는 함수※※※※※※※※※)
const mosaic_supply = (): void => {
    const transactionHttp = new TransactionHttp('http://localhost:3000');

    //할당 받는 계정의 private 키, 나중에는 마스터 계정의 Address가 위치해야 함
    const privateKey = 'F8198655A67278F77524880A1AB592922C12012F9ACA11D146147B231DE961DA';
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

    // Replace with namespace name and mosaic name
    const namespaceName = 'rootnamespace';
    const mosaicName = 'srcc';
    
    //모자이크 정의 트랜잭션
    /*
     *  모자이크를 만들 땐 두 가지 트랜잭션을 발행해야 함
     *  1. 모자이크 정의 트랜잭션
     *  2. 모자이크 공급 트랜잭션
     */
    //rootnamespace:src 모자이크는 supplymutable 하고 transferable 함
    const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
    Deadline.create(),
    mosaicName,
    namespaceName,
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

//돈 전송 함수
const transfer = (money: number): void => {
    //돈을 받는 계정의 address
    const recipientAddress = Address.createFromRawAddress('SDK5PUEEYEXH22TL3WAMRJ5D36TQN6OY4AXCQ74B');
    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipientAddress,
        [new Mosaic(new MosaicId('rootnamespace:src'), UInt64.fromUint(money))],
        PlainMessage.create("Welcome To NEM"),
        NetworkType.MIJIN_TEST);

    //돈을 주는 계정의 address
    const privateKey = 'AAABC5B801F936D03D60EA1C9A6A2D9872B83D41FC80AF6B9747C33D2800ACD8';
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = account.sign(transferTransaction);
    const transactionHttp = new TransactionHttp('http://localhost:3000');
    transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));
}

//init();
mosaic_supply();
//transfer(100);