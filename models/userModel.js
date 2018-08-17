const mongoose = require('mongoose');

const Post = require('./postModel').postModel;

const userSchema = new mongoose.Schema({
    ID: {type: String, required:true, unique: true},
    PW: {type : String, required:true},
    nickname: {type: String, required: true, unique: true, index: true},
    address : {type: String, required: true, unique: true},
    sponsoredPost: {type:[mongoose.Schema.Types.ObjectId], ref: 'Post', default: []},
    balance: {type: Number,default: 0}
});
userSchema.statics.findByID = async ID=>{
    return await this.findOne({ID:ID});
};
userSchema.statics.findByNickname = async nickname =>{
    return await this.findOne({nickname:nickname});
};
userSchema.statics.findByPublicKey = async publicKey=>{
    return await this.findOne({publicKey:publicKey});
};

userSchema.statics.validate = user =>{
    return !findByID(user.ID) && !findByNickname(user.nickname) && !findByPublicKey(user.publicKey);
};

userSchema.methods.comparePW = (PW, callback)=>{
  if(this.PW === PW) callback(null, true);
  else callback('wrong PW',false);
};


exports.userSchema = userSchema;
exports.userModel =  mongoose.Model('User', userSchema);