const expressJWT = require('express-jwt');

exports.requireLogin = expressJWT({
  secret: process.env.JWT_SECRET,
  // req.user._id
});
