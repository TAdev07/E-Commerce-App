const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
} = require('../controller/brandCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBrand);
router.get('/', getAllBrand);
router.put('/:id', authMiddleware, isAdmin, updateBrand);
router.delete('/:id', authMiddleware, isAdmin, deleteBrand);
router.get('/:id', getBrand);

module.exports = router;
