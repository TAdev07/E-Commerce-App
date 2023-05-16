const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require('../controller/prodCategoryCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCategory);
router.get('/', getAllCategory);
router.put('/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);
router.get('/:id', getCategory);

module.exports = router;
