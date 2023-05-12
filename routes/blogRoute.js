const express = require('express');
const {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getAllBlog,
} = require('../controller/blogCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.get('/', getAllBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

module.exports = router;
