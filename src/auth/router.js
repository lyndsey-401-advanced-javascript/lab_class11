'use strict';

const express = require('express');
const authRouter = express.Router(); //express API 

const User = require('./users-model.js'); 
const auth = require('./middleware.js');


//callback for post at this past 
//generating a user object to sign up and applying properties to it 
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save() //.save method returns promise 
  .then( (user) => {
    req.token = user.generateToken(); 
    //putting properties onto our req/response object 
    req.user = user;
    res.set('token', req.token); //token header
    res.cookie('auth', req.token); //cookie
    res.send(req.token); //old token string 
  }).catch(next);
});

//Basic Auth 
//Signup -> create user 

//this post creates new signup
authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});


module.exports = authRouter;
