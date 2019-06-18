const mongoose = require('mongoose');

const Organization = require('./organizationModel').organizationModel;
const User = require('./userModel').userModel;

const commentSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true}
});
const paymentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    price: {type: Number, require: true},
    totalPrice: {type: Number, required: true}
});

const paymentListSchema = new mongoose.Schema({
    payments: {type: [paymentSchema]},
    totalPrice: {type: Number},
    requestDate: {type: Date, default: Date.now, required: true}
});

const postSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true, index: true},
    subTitle:{type:String,required:true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true},
    balance: {type: Number, default: 0},
    comments: [{type: commentSchema}],
    requestPaymentLists: [{type: paymentListSchema}],
    Date: {type: Date, default: Date.now},
    address: {type: String, required: true, unique: true},
    goalAmount: {type: Number, required: true},
    sponsors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

postSchema.statics.findByTitle = async title => {
    try {
        return await this.findOne({title: title});
    } catch (err) {
        console.error(err);
    }
};
postSchema.statics.findAll = async ()=>{
    return await find({}).sort({Date:-1});
};

exports.postSchema = postSchema;
exports.postModel = mongoose.model('Post', postSchema);
