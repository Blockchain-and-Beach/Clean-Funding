import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp, 
    PublicAccount, ModifyMultisigAccountTransaction, MultisigCosignatoryModification, MultisigCosignatoryModificationType, Transaction, 
    MosaicSupplyChangeTransaction, MosaicDefinitionTransaction, AggregateTransaction, MosaicProperties, MosaicSupplyType, NamespaceId, NamespaceHttp,
    RegisterNamespaceTransaction
} from 'nem2-sdk';


//우리 프로젝트의 자체적인 모자이크를 위한 네임스페이스를 만드는 함수
function namespace_generator(): void {
    const namespaceHttp = new NamespaceHttp('http://localhost:3000');

    //rootnamespace라는 이름의 namespace가 있는지 확인
    const namespace = new NamespaceId('rootnamespace');

    namespaceHttp.getNamespace(namespace).subscribe(namespace => console.log(namespace), err => console.error(err));

    const transactionHttp = new TransactionHttp('http://localhost:3000');

    //namespace의 owner의 private 키
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

export {namespace_generator};