const router = require('express').Router;

const crypto = require('crypto');

const User = require('../models/userModel').userModel;
const Organization = require('../models/organizationModel').organizationModel;
const makeAccount = require('../lib/accountInfo');

router.post('/user',(req,res)=>{
        if(User.statics.validate(req.body)){
            const account = makeAccount();
            req.body.address = account.address;
            req.body.PW = crypto.createHash('sha512').update(req.body.PW).digest('base64');
            const user = new User(req.body);
            user.save();
            res.render('private',{privateKey:account.privateKey});
        }
        else res.send('Already exist ID');
    })
    .post('/organization',(req,res)=>{
        if(Organization.validate(req.body)){
            const account = makeAccount();
            req.body.address = account.address;
            req.body.PW = crypto.createHash('sha512').update(req.body.PW).digest('base64');
            const organization = new Organization(req.body);
            organization.save();
            res.render('private',{privateKey:account.privateKey});
        }
       else res.send('Already exist ID');
    });
module.exports = router;