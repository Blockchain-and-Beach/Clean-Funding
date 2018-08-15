const mongoose = require('mongoose');

const organizationSchema = require('./organizationModel').organizationSchema;
const userSchema = require('userModel').userSchema;

const commentSchema = new mongoose.Schema({
    author: {type: userSchema, required: true},
    content: {type: String, required: true}
});

const postSchema = new mongoose.Schema({
    title:{ type: String, unique: true, required: true, index:true},
    content : {type: String, required: true},
    author : {type: organizationSchema, required: true},
    balance : {type: Number,default: 0},
    comments: [{type: commentSchema}],
    like : {type: Number, default: 0},
    Date : {type: Date, default: Date.now}
});

postSchema.statics.findByTitle = async title=>{
    try{
        return await this.findOne({title:title});
    } catch(err){
        console.error(err);
    }
};

exports.postSchema = postSchema;
exports.postModel = mongoose.Model('Post', postSchema);