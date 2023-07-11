const express = require('express');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout');

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  )
  .get(authController.protect, userController.getUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
  );

module.exports = router;
