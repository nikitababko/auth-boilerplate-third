// Load controllers
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

// const { requireLogin } = require('../middlewares/requireLogin');
const { adminMiddleware } = require('../middlewares/admin');
const { requireLogin } = require('../middlewares/requireLogin');

// Import validations helpers
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../helpers/valid');

const createRoutes = (app) => {
  app.post('/api/register', registerValidator, AuthController.register);
  app.post('/api/login', loginValidator, AuthController.login);
  app.post('/api/activation', AuthController.activation);
  app.put('/api/password/forgot', forgotPasswordValidator, AuthController.forgotPassword);
  app.put('/api/password/reset', resetPasswordValidator, AuthController.resetPassword);

  app.post('/api/googlelogin', AuthController.googleLogin);
  app.post('/api/facebooklogin', AuthController.facebookLogin);

  app.get('/api/user/:id', requireLogin, UserController.read);
  app.put('/api/user/update', requireLogin, UserController.update);
  app.put('/api/admin/update', requireLogin, adminMiddleware, UserController.update);
};

module.exports = createRoutes;
