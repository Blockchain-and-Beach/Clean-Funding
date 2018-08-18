const router = require('express').Router;

const Post = require('../models/postModel').postModel;
const User = require('../models/userModel').userModel;

router.post('/:title',(req,res)=>{
    const post = Post.findByTitle(req.params.title);
    const user = User.findByID(req.session.ID);
    donate(post.privateKey,user.privateKey,req.body.amount);
    res.send('success');
});