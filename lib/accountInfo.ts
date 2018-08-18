// last modifier : CafeM0ca
// version 0.0.1
// changed : implement User class
import {
    Account, 
    Address, 
    Deadline, 
    UInt64, 
    NetworkType, 
    PlainMessage, 
    TransferTransaction, 
    Mosaic, 
    MosaicId,
    TransactionHttp,
    Password,
    SimpleWallet,
    Listener,
    PublicAccount,
    XEM,
    EmptyMessage,
    AggregateTransaction,
    LockFundsTransaction,
} from 'nem2-sdk';

/*
class User{
    setPW(changePW:string) {
        this.PW = changePW;
    }
    setNickName(changeNickname:string){
        this.nickname = changeNickname;
    }
    // DB가 사용할 메서드
    getID() : string {
        return this.ID;
    }
    getPW() : string {
        return this.PW;
    }
    getNickName() : string {
        return this.nickname;
    }

    private address : string;
    private publicKey : string;
    private ID : string;
    private PW : string;
    private nickname : string;
    private wallet;
}
*/

function makeAccount() : object{
        const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
        // 클라이언트에게 쏴주면 된다. 
        console.log('Your new account address is:', account.address.pretty(), 
                  'and its private key', account.privateKey);

        const returnobj={
            address:account.address.pretty(),
            privateKey: account.privateKey
        };
        return returnobj;
}

export {makeAccount};
