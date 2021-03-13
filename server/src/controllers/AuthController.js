const expressJWT = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.MAIL_KEY);

// Custom error handler to get useful error from database errors
const { errorHandler } = require('../helpers/dbErrorHandling');
// User model
const User = require('../models/User');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  // validation to req.body we will create custom validation in seconds
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((errors) => errors.msg)[0];
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
      to: to,
      subject: 'Account activation link',
      html: `
          <h1>Please click to link to activate</h1>
          <p>${process.env.CLIENT_URL}/users/activate/${token}<p/>
          <hr/>
          <p>This email contain sensetive info<p/>
          <p>${process.env.CLIENT_URL}<p/>
      `,
    };
  }
};
