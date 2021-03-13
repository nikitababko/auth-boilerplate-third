const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./core/db');
// Load all routes
const createRoutes = require('./core/routes');

// Config .env to ./config/config.env
require('dotenv').config({
  path: 'src/config/config.env',
});

// App init
const app = express();

// Connect to Database
connectDB();

// Use json
app.use(express.json());

// Config for only development
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(morgan('dev'));
  /**
   * Morgan give information about each request
   * Cors it's allow to deal with react for localhost at port 3000 without any problem
   */
}

// Register routes
createRoutes(app);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Page not founded',
  });
});

// Setup server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) throw Error(err);
  console.log(`Server has started on port: ${PORT}`);
});
