const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')

router.route('/signup')
  .post(authController.signUp)
router.route('/login')
  .post(authController.login)

router.route('/mail')
  .post(authController.generateOtp)
router.route('/otp')
  .post(authController.verifyOtp);

router.route('/')
  .get(userController.getAllUser)
  .post(userController.createUser)


router.route('/:id')
  .get(userController.getOneUser)



module.exports = router;
