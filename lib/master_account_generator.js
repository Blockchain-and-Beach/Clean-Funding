"use strict";
exports.__esModule = true;
var nem2_sdk_1 = require("nem2-sdk");
function master_account_generator() {
    var account = nem2_sdk_1.Account.generateNewAccount(nem2_sdk_1.NetworkType.MIJIN_TEST);
    console.log('address: ', account.address.pretty(), 'key: ', account.privateKey);
}
