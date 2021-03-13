// Load controllers
const AuthController = require('../controllers/AuthController');

const createRoutes = (app) => {
  app.post('/api/register', AuthController.register);
};

module.exports = createRoutes;
