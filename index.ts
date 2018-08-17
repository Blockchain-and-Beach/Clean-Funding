//개발에 필요한 기능들을 nem2-sdk에서 import함
import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp, PublicAccount, ModifyMultisigAccountTransaction, MultisigCosignatoryModification, MultisigCosignatoryModificationType
} from 'nem2-sdk';

var btnCharge = document.querySelector("#btn_charge"); 

btnCharge.addEventListener("click", function() {
    alert("Hello world");
});

/*var charge = (): void => {
    //후원자들의 데이터가 있는 db에서 후원자 정보를 가지고 nem account를 만들기.
const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        //충전 버튼을 누른 후원자의 계정의 어드레스
        //나중에 후원자의 어드레스가 유동적으로 돌아갈 수 있도록 바꾸어야 함
        Address.createFromRawAddress('SBNXZTHWORF7U24M32TZYAZS7RXD4I2G54Y7VFI3'),
        [new Mosaic(new MosaicId('foo:token'), UInt64.fromUint(10))],
        PlainMessage.create('충전 됌'),
        NetworkType.MIJIN_TEST
    );
    //모자이크를 주는 사람의 프라이빗 키
    //모자이크를 주는 전용 어카운트를 만듬
const privateKey = '26E2BF9FF583155842B6BB7BE92000C61E1F7E737CE5041AF947AA1FA1328FAD';
const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const signedTransaction = account.sign(transferTransaction);

const transactionHttp = new TransactionHttp('http://localhost:3000');

    transactionHttp.announce(signedTransaction).subscribe(
        x => console.log(x),
        err => console.log(err)
    );   
}*/