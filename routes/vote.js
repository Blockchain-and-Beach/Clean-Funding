const router = require('express');

const User = require('../models/userModel').userModel;
const Post = require('../models/postModel').postModel;

router.post('/:title',(req,res)=>{
    const post = Post.findByTitle(req.params.title);
    const user = User.findByID(req.session.ID);
    vote(post.privateKey,user.privateKey,req.body.amount);
    res.send('success');
});