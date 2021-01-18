const Blog = require('../models/blog');

exports.getAllBlogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then( result => {
            res.render('blogs/index', {title: 'All Blogs', blogs: result})
        })
        .catch( err => console.log(err))
};

exports.getFormNewBlog = (req, res) => {
    res.render('blogs/create', {title: 'Create a new Blog'})
};

exports.getSingleBlog = (req, res) => {
    Blog.findById(req.params.id)
        .then( result => res.render('blogs/details', { title: 'Blog details', blog: result }) )
        .catch( err => console.log(err))
};

exports.createNewBlog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then( result => res.redirect('/blogs'))
        .catch( err => console.log(err))
};

exports.deleteSingleBlog = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then( result => res.json({ redirect: '/blogs' }))
        .catch( err => console.log(err))
};