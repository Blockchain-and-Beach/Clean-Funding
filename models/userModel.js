const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID: {type: String, required:true, unique: true, index: true},
    PW: {type : String, required:true},
    nickname: {type: String, required: true, unique: true},
    publicKey : {type: String, required: true, unique: true},
    balance: {type: Number,default: 0}
});

exports.userSchema = userSchema;
module.exports = new mongoose.Model('User', userSchema);