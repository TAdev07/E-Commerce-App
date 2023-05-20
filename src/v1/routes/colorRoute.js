const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor,
} = require('../controller/colorCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createColor);
router.get('/', getAllColor);
router.put('/:id', authMiddleware, isAdmin, updateColor);
router.delete('/:id', authMiddleware, isAdmin, deleteColor);
router.get('/:id', getColor);

module.exports = router;
