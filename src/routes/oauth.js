const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const UsersController = require('../controllers/users')
router.route('/oauth/google')
    .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/oauth/facebook')
    .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

module.exports = router;