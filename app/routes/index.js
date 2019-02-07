const express = require('express');
// const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../helpers/errorHandlers');

const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.render('index');
});

// router.get('/stores', catchErrors(storeController.getStores));
// router.get('/stores/page/:page', catchErrors(storeController.getStores));
// router.get('/stores/:slug', catchErrors(storeController.getStoreBySlug));

// router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// router.post('/stores/:id/edit',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.updateStore));
// router.get('/stores/:id/delete', catchErrors(storeController.deleteStore));

// router.get('/add', authController.isLoggedIn, storeController.addStore);
// router.post('/add',
//   authController.isLoggedIn,
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.createStore));

router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login);

router.get('/login', userController.loginForm);
router.post('/login', userController.validateLogin, authController.login);
router.get('/loggedIn', authController.isLoggedIn, authController.loggedIn);
router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', authController.isLoggedIn, catchErrors(userController.updateAccount));
router.post('/account/forgot', userController.validateEmail, catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));

router.get('/notifications', authController.isLoggedIn, userController.notifications)

// router.get('/api/search', catchErrors(storeController.searchStores));
// router.get('/api/stores/near', catchErrors(storeController.mapStores));
// router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;
