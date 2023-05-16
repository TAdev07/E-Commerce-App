const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  updateUserById,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/login', loginUserCtrl);
router.post('/admin-login', loginAdmin);
router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.post('/reset-password/:token', resetPassword);
router.post('/cart', authMiddleware, userCart);
router.post('/cart/applycoupon', authMiddleware, applyCoupon);
router.post('/cart/cash-order', authMiddleware, createOrder);

router.get('/logout', logout);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/wishlist', authMiddleware, getWishlist);
router.get('/cart', authMiddleware, getUserCart);
router.get('/order', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getUser);

router.put('/password', authMiddleware, updatePassword);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);
router.put('/:id', authMiddleware, isAdmin, updateUserById);

router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete('/:id', authMiddleware, isAdmin, deleteUser);

module.exports = router;
