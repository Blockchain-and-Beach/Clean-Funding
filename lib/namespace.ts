import { Account,UInt64,TransactionHttp, RegisterNamespaceTransaction, Deadline, NetworkType } from "nem2-sdk";


function defaultErrorHandle(err: any) : void{
    console.log("Error!!: " + err);
}

//nsName을 이름으로 하는 네임스페이스를 등록하는 트랜잭션을 요청하는 함수.
//nsName: 루트 네임스페이스 이름, successHandle: 성공시 핸들링할 함수, failHandle: 실패시 핸들링할 함수.
function RegisterRootNamespace(nsName,successHandle, failHandle=defaultErrorHandle) {
    const transactionHttp = new TransactionHttp(process.env.HOST);
    const privateKey = process.env.ADMIN_KEY as string;
    const account = Account.createFromPrivateKey(privateKey,NetworkType.MIJIN_TEST);
    const namespaceName = nsName;

    const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
        Deadline.create(),
        namespaceName,
        UInt64.fromUint(1000),
        NetworkType.MIJIN_TEST
    );

    const signedTransaction = account.sign(registerNamespaceTransaction);

    transactionHttp
        .announce(signedTransaction)
        .subscribe(suc => successHandle("success: " + suc), err => failHandle(err));    
}

//루트 네임스페이스에 서브도메인생성.
//rootNsName: 루트네임스페이스, nsName: 네임스페이스  
function RegisterSubNamespace(rootNsName: string, nsName: string,successHandle,failHandle=defaultErrorHandle) {
    const transactionHttp = new TransactionHttp(process.env.HOST);

    const privateKey = process.env.ADMIN_KEY;
    const account = Account.createFromPrivateKey(privateKey,NetworkType.MIJIN_TEST);

    const registerNamespaceTransaction = RegisterNamespaceTransaction.createSubNamespace(
        Deadline.create(),
        nsName,
        rootNsName,
        NetworkType.MIJIN_TEST
    );

    const signedTransaction = account.sign(registerNamespaceTransaction);

    transactionHttp
        .announce(signedTransaction)
        .subscribe(suc => successHandle(suc), err => failHandle(err));    
}

RegisterRootNamespace("ggg", console.log);

export {RegisterRootNamespace,RegisterSubNamespace};