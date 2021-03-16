// Load controllers
const AuthController = require('../controllers/AuthController');

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
};

module.exports = createRoutes;
