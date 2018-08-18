const router = require('express').Router;

const Post  = require('../models/postModel').postModel;

router.get('/:title/request',(req,res)=> {
    res.send(Post.findByTitle(req.params.title).requestPaymentLists);
});
module.exports = router;