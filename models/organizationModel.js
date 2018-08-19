const mongoose = require('mongoose');

const Post = require('./postModel').postModel;

const organizationSchema = new mongoose.Schema({
    ID: {type: String, required: true, unique: true},
    PW: {type: String, required: true},
    name: {type: String, required: true, unique: true, index: true},
    address: {type: String, required: true, unique: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref:'Post'}]
});

organizationSchema.statics.findByID = async ID => {
    return await this.findOne({ID: ID});
};
organizationSchema.statics.findByName = async name => {
    return await this.findOne({name: name});
};
organizationSchema.statics.findByPublicKey = async publicKey => {
    return await this.findOne({publicKey: publicKey});
};
organizationSchema.statics.validate = organization => {
    return !findByID(organization.ID) && !findByName(organization.name) && !findByPublicKey(organization.publicKey);
};

organizationSchema.methods.comparePW = (PW, callback) => {
    if (this.PW === PW) callback(null, true);
    else callback('wrong PW', false);
};

exports.organizationSchema = organizationSchema;
exports.organizationModel = mongoose.model('Organization', organizationSchema);
