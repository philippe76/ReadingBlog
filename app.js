const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = 'mongodb+srv://blog-admin:030215@cluster0.1fftp.mongodb.net/reading-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(3000))   // listen to request only when connected to DB
    .catch(err => console.log(err))

app.set('view engine', 'ejs');


// ** middlewares ** //
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
//app.use(morgan('dev'));


// **** GET ROUTES **** //
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'})
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then( result => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch( err => console.log(err))
})

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then( result => res.render('details', { title: 'Blog details', blog: result }) )
        .catch( err => console.log(err))
})


// **** POST ROUTES **** //
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then( result => res.redirect('/blogs'))
        .catch( err => console.log(err))
})



app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})


