import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp, PublicAccount, ModifyMultisigAccountTransaction, MultisigCosignatoryModification, MultisigCosignatoryModificationType
} from 'nem2-sdk';

const aaa = Account.generateNewAccount(NetworkType.MIJIN_TEST);
const bbb = Account.generateNewAccount(NetworkType.MIJIN_TEST);
const ccc = Account.generateNewAccount(NetworkType.MIJIN_TEST);

console.log("aaa's publicKey: ", aaa.publicKey);
console.log("bbb's publicKey: ", bbb.publicKey);
console.log("ccc's publicKey: ", ccc.publicKey);

const transactionHttp = new TransactionHttp('http://localhost:3000');

const privatekey = aaa.privateKey;
const multisigaccount = Account.createFromPrivateKey(privatekey, NetworkType.MIJIN_TEST);

const signer1publicKey = bbb.publicKey;
const signer1 = PublicAccount.createFromPublicKey(signer1publicKey, NetworkType.MIJIN_TEST);
const signer2publicKey = ccc.publicKey;
const signer2 = PublicAccount.createFromPublicKey(signer2publicKey, NetworkType.MIJIN_TEST);

const convertIntoMultisigTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            signer1,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            signer2,
        )], 
    NetworkType.MIJIN_TEST);

const signedTransaction = aaa.sign(convertIntoMultisigTransaction);
console.log(aaa);

transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.log(err));
