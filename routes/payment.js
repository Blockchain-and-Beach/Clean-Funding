const router = require('express').Router;

const Post = require('../models/postModel').postModel;

router.get('/:title', (req, res) => {
    res.send(Post.findByTitle(req.params.title).paymentLists);
});
