const router = require('express').Router;

const Post = require('../models/postModel').postModel;

router.get('/', (req, res) => {
    Post.find({})
        .sort({Date: -1})
        .exec(results => {
            res.render('posts', {posts: results});
        })
        .catch(err => console.error(err));
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
            const post = new Post(req.body);
            post.save();
            res.redirect('/post');
        } else
            res.send('Already exist title');
    });

module.exports = router;