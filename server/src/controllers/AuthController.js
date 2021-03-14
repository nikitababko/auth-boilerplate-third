const expressJWT = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

// Config .env to ./config/config.env
require('dotenv').config({
  path: 'src/config/config.env',
});

sgMail.setApiKey(process.env.MAIL_KEY);

// Custom error handler to get useful error from database errors
const { errorHandler } = require('../helpers/dbErrorHandling');
// User model
const User = require('../models/User');

// Register
exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  // validation to req.body we will create custom validation in seconds
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((req, user) => {
      // If user exist
      if (user) {
        return res.status(400).json({
          errors: 'Email is taken',
        });
      }
    });

    // Generate token
    const token = jwt.sign(
      {
        name,
        email,
        password,
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: process.env.JWT_MAX_AGE,
      }
    );

    // Email data sending
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Account activation link',
      html: `
          <h1>Please click to link to activate</h1>
          <p>${process.env.CLIENT_URL}/users/activate/${token}<p/>
          <hr/>
          <p>This email contain sensetive info<p/>
          <p>${process.env.CLIENT_URL}<p/>
      `,
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        return res.json({
          message: `Email has been sent to ${email}`,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          errors: errorHandler(err),
        });
      });
  }
};

// Activation and save to database
exports.activation = (req, res) => {
  const { token } = req.body;

  if (token) {
    // Verify the token is valid or not or expired
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log('Activation error');
        return res.status(401).json({
          errors: 'Expired link. Signup again',
        });
      } else {
        /**
         * If valid save to database
         * Get name, email, password from token
         */
        const { name, email, password } = jwt.decode(token);

        console.log(email);
        const user = new User({
          name,
          email,
          password,
        });

        user.save((err, user) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              message: 'Signup success',
              user,
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: 'error happening please try again',
    });
  }
};
