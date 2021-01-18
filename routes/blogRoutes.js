const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');



// **** GET ROUTES **** //
router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then( result => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch( err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'})
})

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then( result => res.render('details', { title: 'Blog details', blog: result }) )
        .catch( err => console.log(err))
})


// **** POST ROUTE **** //
router.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then( result => res.redirect('/blogs'))
        .catch( err => console.log(err))
})


// **** DELETE ROUTE **** //
router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then( result => res.json({ redirect: '/blogs' }))
        .catch( err => console.log(err))
})


module.exports = router