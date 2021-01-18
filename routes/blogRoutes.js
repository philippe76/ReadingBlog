const express = require('express');
const router = express.Router();
const { getAllBlogs, getFormNewBlog, getSingleBlog, createNewBlog, deleteSingleBlog } = require('../controllers/blogController')



// **** GET ROUTES **** //
router.get('/', getAllBlogs)

router.get('/create', getFormNewBlog)

router.get('/:id', getSingleBlog)


// **** POST ROUTE **** //
router.post('/', createNewBlog)


// **** DELETE ROUTE **** //
router.delete('/:id', deleteSingleBlog)


module.exports = router