import { Account,UInt64,TransactionHttp, RegisterNamespaceTransaction, Deadline, NetworkType } from "nem2-sdk";

//nsName을 이름으로 하는 네임스페이스를 등록하는 트랜잭션을 요청하는 함수.
function RegisterRootNamespace(nsName) {
    const transactionHttp = new TransactionHttp(process.env.HOST);
    const privateKey = process.env.ADMIN_KEY as string;
    const account = Account.createFromPrivateKey(privateKey,NetworkType.TEST_NET);
    const namespaceName = "foo";

    const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
        Deadline.create(),
        namespaceName,
        UInt64.fromUint(1000),
        NetworkType.TEST_NET
    );

    const signedTransaction = account.sign(registerNamespaceTransaction);

    transactionHttp
        .announce(signedTransaction)
        .subscribe(suc => console.log("success: " + suc), err => console.log("Error!!: " + err));    
}

//루트 네임스페이스에 서브도메인생성.
//rootNsName: 루트네임스페이스, nsName: 네임스페이스  
function RegisterSubNamespace(rootNsName: string, nsName: string) {
    const transactionHttp = new TransactionHttp(process.env.HOST);

    const privateKey = process.env.ADMIN_KEY;
    const account = Account.createFromPrivateKey(privateKey,NetworkType.TEST_NET);

    const registerNamespaceTransaction = RegisterNamespaceTransaction.createSubNamespace(
        Deadline.create(),
        nsName,
        rootNsName,
        NetworkType.TEST_NET
    );

    const signedTransaction = account.sign(registerNamespaceTransaction);

    transactionHttp
        .announce(signedTransaction)
        .subscribe(suc => console.log("success: " + suc), err => console.log("Error!!: " + err));    
}

export {RegisterRootNamespace,RegisterSubNamespace};