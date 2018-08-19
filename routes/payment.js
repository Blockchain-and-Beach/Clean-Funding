const express = require('express');
const router = express.Router();

const Post  = require('../models/postModel').postModel;

router.get('/:title/request',(req,res)=> {
    res.send(Post.findByTitle(req.params.title).requestPaymentLists);
}).post('/:title/request',(req,res)=>{

});
module.exports = router;