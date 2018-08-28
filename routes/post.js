const express = require('express');
const router = express.Router();

const Post = require('../models/postModel').postModel;

router.get('/', (req, res) => {
    const results = Post.findAll();
    if(results.length<=0) res.render('index',{posts:[]});
    else res.render('index',{posts:results});
})
    .get('/upload', (req, res) => {
        res.render('upload');
    })
    .get('/:title', (req, res) => {
        const title = req.params.title;
        const post = Post.findByTitle(title);
        res.render('post', {post: post});
    })
    .post('/upload', (req, res) => {
        if (!findByTitle(req.body.title)) {
            req.body.author = req.session.signed;
            const post = new Post(req.body);
            post.save();
            res.redirect('/'+req.body.title);
        } else
            res.send('Already exist title');
    })
    .put('/:title/like',(req,res)=>{
        Post.update({title:req.title},{$inc:{like:1}})
            .then(res.send('success'))
            .catch(err=>console.error(err));
    }).get('/:title/approvedAmount',(req,res)=>{
        const approvedAmount={};
        res.send(approvedAmount);
    }).get('/:title/sumAmount',(req,res)=>{
        const sumAmount={};
        res.send(sumAmount);
    });

module.exports = router;