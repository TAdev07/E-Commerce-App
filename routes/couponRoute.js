const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require('../controller/couponCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupon);
router.get('/', getAllCoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon);
router.get('/:id', getCoupon);

module.exports = router;
