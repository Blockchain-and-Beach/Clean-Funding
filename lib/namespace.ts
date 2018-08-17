import { NamespaceHttp,NamespaceId } from "nem2-sdk"

//같은 이름을 가진 Namespace가 존재하는가?
//namespace: 네임스페이스 이름
function checkNamespace(nsName : String) : boolean {
    const namespaceHttp = new NamespaceHttp('http://localhost:3000');
    const namespace = new NamespaceId('foo');

    namespaceHttp
        .getNamespace(namespace)
        .subscribe(namespace => )
}