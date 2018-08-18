const router = require('express').Router;

const crypto = require('crypto');

const User = require('../models/userModel').userModel;
const Organization = require('../models/organizationModel').organizationModel;
const makeAccount = require('../dist/accountInfo').makeAccount;

router.post('/user',(req,res)=>{
        if(User.statics.validate(req.body)){
            const account = makeAccount();
            req.body.privateKey = account.privateKey;
            req.body.PW = crypto.createHash('sha512').update(req.body.PW).digest('base64');
            const user = new User(req.body);
            user.save();
            res.render('success',{message: 'sign up success'});
        }
        else res.send('Already exist ID');
    })
    .post('/organization',(req,res)=>{
        if(Organization.validate(req.body)){
            const account = makeAccount();
            req.body.privateKey = account.privateKey;
            req.body.PW = crypto.createHash('sha512').update(req.body.PW).digest('base64');
            const organization = new Organization(req.body);
            organization.save();
            res.render('success',{message: 'sign up success'});
        }
       else res.send('Already exist ID');
    });
module.exports = router;