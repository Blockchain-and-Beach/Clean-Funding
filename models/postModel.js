const mongoose = require('mongoose');

const Organization = require('./organizationModel').organizationModel;
const userSchema = require('userModel').userSchema;

const commentSchema = new mongoose.Schema({
    author: {type: userSchema, required: true},
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
    totalPrice: {type: Number, default: calcTotalPrice},
    requestDate: {type: Date, default: Date.now, required: true},
    approvedDate: {type: Date}
});

const postSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true, index: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true},
    balance: {type: Number, default: 0},
    comments: [{type: commentSchema}],
    paymentLists: [{type: paymentListSchema}],
    like: {type: Number, default: 0},
    Date: {type: Date, default: Date.now},
    address: {type: String, required: true, unique: true},
    goalAmount: {type: Number, required: true}
});

postSchema.statics.findByTitle = async title => {
    try {
        return await this.findOne({title: title});
    } catch (err) {
        console.error(err);
    }
};
paymentListSchema.methods.calcTotalPrice = () => {
    let totalPrice = 0;
    this.payments.forEach(element => {
        totalPrice += element.price;
    });
    return totalPrice;
};

exports.postSchema = postSchema;
exports.postModel = mongoose.Model('Post', postSchema);
