const mongoose = require('mongoose');

const postSchema = require('./postModel').postSchema;

const organizationSchema = new mongoose.Schema({
    ID :{type: String, required: true, unique: true},
    PW: {type: String, required: true},
    name: {type: String, required: true, unique: true, index: true},
    publicKey: {type: String, required: true, unique: true},
    posts:[{type: postSchema}]
});

exports.organizationSchema = organizationSchema;
module.exports = new mongoose.Model('Organization',organizationSchema);
