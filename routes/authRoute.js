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
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/login', loginUserCtrl);
router.post('/admin-login', loginAdmin);
router.post('/register', createUser);
router.put('/password', authMiddleware, updatePassword);
router.post('/forgot-password-token', forgotPasswordToken);
router.post('/reset-password/:token', resetPassword);

router.get('/logout', logout);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/wishlist', authMiddleware, getWishlist);
router.get('/:id', authMiddleware, getUser);

router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/:id', authMiddleware, isAdmin, updateUserById);

router.delete('/:id', authMiddleware, isAdmin, deleteUser);

module.exports = router;
