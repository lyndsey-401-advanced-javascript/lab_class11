'use strict';
//equivalent to server.js file, is what contains majority shown routes

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );
const authRouter = require( './auth/router.js' );

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use('/docs', express.static('./docs'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(authRouter); //gives us access to our router.js page

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
