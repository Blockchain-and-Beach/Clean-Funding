//개발에 필요한 기능들을 nem2-sdk에서 import함
import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp, PublicAccount, ModifyMultisigAccountTransaction, MultisigCosignatoryModification, MultisigCosignatoryModificationType
} from 'nem2-sdk';

/*var event_listener = document.getElementById('btn_charge');
 
//if 충전 버튼이 눌리면
event_listener.onclick = function() {
    //충전 버튼을 누르면 모자이크 충전하는 함수
    alert("Hello NEM");
}

var charge = (): void => {
    //후원자들의 데이터가 있는 db에서 후원자 정보를 가지고 nem account를 만들기.

}*/

const aaa = Account.generateNewAccount(NetworkType.MIJIN_TEST);
console.log('Your new account address is: ', aaa.address.pretty(), 'andits private key', aaa.privateKey);
const transactionHttp = new TransactionHttp('http://localhost:3000');

const privatekey = '36EC654B441D8E6DD6EC5B2EE4A45B3C06E49BEAEE552517C57D0D24EF66AD1C';
const account = Account.createFromPrivateKey(privatekey, NetworkType.MIJIN_TEST);

const cosignatory1PublicKey = '1247526150A4026B7ED0B9AEA5F8BB49E7804977A40715DAB4E36DBE792B5922';
const cosignatory1 = PublicAccount.createFromPublicKey(cosignatory1PublicKey, NetworkType.MIJIN_TEST);
const cosignatory2PublicKey = '36EC654B441D8E6DD6EC5B2EE4A45B3C06E49BEAEE552517C57D0D24EF66AD1C';
const cosignatory2 = PublicAccount.createFromPublicKey(cosignatory2PublicKey, NetworkType.MIJIN_TEST);

const convertIntoMultisigTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory1,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            cosignatory2,
        )], 
    NetworkType.MIJIN_TEST);

const signedTransaction = account.sign(convertIntoMultisigTransaction);

transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.log(err));
