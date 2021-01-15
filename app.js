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


// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// })

app.use(express.static('public'))
app.use(morgan('dev'))


app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'second new blog',
        snippet: 'about this new blog',
        body: 'more infos about this blog'
    });
    blog.save()
        .then( result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})


app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then( result => res.send(result))
        .catch( err => console.log(err)) 
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6001d5a1bce67e3100e3d711')
        .then( result => res.send(result))
        .catch( err => console.log(err))
})

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then( result => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch( err => console.log(err))
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})


