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
    TransactionHttp
} from 'nem2-sdk';

function master_account_generator() {
    const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
    console.log('address: ', account.address.pretty(), 'key: ', account.privateKey);
}