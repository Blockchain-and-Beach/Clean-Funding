// last modifier : CafeM0ca
// version 0.0.1
// changed : implement User class
import {
    Account,
    NetworkType
} from 'nem2-sdk';

module.exports = (): object => {
    return Account.generateNewAccount(NetworkType.MIJIN_TEST);
};