const router = require('express').Router;

const Post = require('../models/postModel').postModel;

router.get('/',(req,res)=>{
    Post.find({})
        .sort({Date:-1})
        .exec(results=>{
            if(err) console.error(err);
            else res.render('posts',{posts:results});
        })
        .catch(err => console.error(err));
})
    .get('/upload',(req,res)=>{
        res.render('upload')
    })
    .get('/:title',(req,res)=>{
        const title = req.params.title;
        const post = Post.findByTitle(title);
        res.render('post',{post:post});
    })
    .post('/upload',(req,res)=>{
        
    });