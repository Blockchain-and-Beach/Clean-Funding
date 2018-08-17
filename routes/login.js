const router = require('express').Router;

const User = require('../models/userModel').userModel;
const Organization = require('../models/organizationModel').organizationModel;

router.get('/', res => {
    res.render('login');
})
    .post('/user', (req, res) => {
        const ID = req.body.ID;
        const PW = req.body.PW;
        const account = User.statics.findByID(ID);
        account.methods.comparePW(PW, (err, result) => {
            if (err) {
                console.error(err);
            }
            else if (result) {
                req.session.signed = result.nickname;
                res.redirect('/');
            }
            else {
                res.send('login failed');
            }
        });
    })
    .post('/organization', (req, res) => {
        const ID = req.body.ID;
        const PW = req.body.PW;
        const account = Organization.statics.findByID(ID);
        account.methods.comparePW(PW, (err, result) => {
            if (err) console.error(err);
            else if (result) {
                req.session.signed = result.name;
                res.redirect('/');
            }
            else res.send('login failed');
        })
    });

module.exports = router;
