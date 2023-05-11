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
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/logout', logout);
router.put('/password', authMiddleware, updatePassword);
router.get('/all-users', getAllUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.get('/refresh', handleRefreshToken);

router.get('/:id', authMiddleware, getUser);
router.delete('/:id', authMiddleware, isAdmin, deleteUser);
router.put('/:id', authMiddleware, isAdmin, updateUserById);

module.exports = router;
