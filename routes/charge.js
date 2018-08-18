const router = require('express').Router;

const charge = require('../dist/charge');
const User = require('../models/userModel').userModel;

router.get('/',(req,res)=>{
    res.render('charge');
})
    .post('/',(req,res)=>{
        const amount = req.body.amount;
        const user = User.findByID(req.session.ID);
        charge(user.address,amount);
        user.update()
            .then(()=>res.send('Success Charge'))
            .catch(err=>console.error(err));
    });

module.exports = router;