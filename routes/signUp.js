const router = require('express').Router;

const User = require('../models/userModel').userModel;
const Organization = require('../models/organizationModel').organizationModel;

router.post('/user',(req,res)=>{
        if(User.statics.validate(req.body)){
            const user = new User(req.body);
            user.save();
            res.redirect('/login/user');
        }
        else res.send('Already exist ID');
    })
    .post('/organization',(req,res)=>{
        if(Organization.validate(req.body)){
            const organization = new Organization(req.body);
            organization.save();
            res.redirect('/login/organization');
        }
       else res.send('Already exist ID');
    });
