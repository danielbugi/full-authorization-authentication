const express = require('express');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout');

// app.use(authController.protect);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .delete(userController.deleteUser)
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;