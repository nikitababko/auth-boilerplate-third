// Load controllers
const AuthController = require('../controllers/AuthController');

// Import validations helpers
const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../helpers/valid');

const createRoutes = (app) => {
  app.post('/api/register', validSign, AuthController.register);
  app.post('/api/login', validSign, AuthController.login);
  app.post('/api/activation', AuthController.activation);
};

module.exports = createRoutes;
