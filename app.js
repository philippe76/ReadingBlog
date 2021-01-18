const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


const app = express();

const dbURI = 'mongodb+srv://blog-admin:030215@cluster0.1fftp.mongodb.net/reading-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(3000))   // listen to request only when connected to DB
    .catch(err => console.log(err))

app.set('view engine', 'ejs');


// ** Middlewares ** //
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
//app.use(morgan('dev'));

// ** Routes ** //
app.get('/', (req, res) => {
    res.redirect('/blogs')
})
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})
// ** blog Routes ** //
app.use('/blogs', blogRoutes)


app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})


