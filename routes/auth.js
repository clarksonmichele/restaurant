//neccessary references
var express = require('express');
var router = express.Router();

//add auth packages
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
//var configDb = require('../config/db.js');

//GET register - display the form
router.get('/register', function(req, res, next) {
	res.render('auth/register', {
		title: 'Register'
	});
});

//POST register - display the form
router.post('/register', function(req, res, next) {
	Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
           res.render('auth/register', { title: 'Register' });
        }
        else {
            req.login(account, function(err) {
                res.redirect('/menus');
            });
        }
    });
});

//GET welcome splash page for those who are authenticated
router.get('/welcome', isLoggedIn, function(req, res, next) {
    res.render('auth/welcome', {
        title: 'Welcome to Basilico',
        user: req.user
    });
});

//GET login - display the form
router.get('/login', function(req, res, next) {

    //local variable - store session messages
    var messages = req.session.messages || [];
    //clear out the session messages so they don't build up 
    req.session.messages = [];
    
    if (req.isAuthenticated()) {
        res.redirect('/auth/welcome');
    }
    else {
    //show the login page again and give a warning
        res.render('auth/login', {
            title: 'Login',
            user: req.user,
            messages: messages
        });
    }
});


//POST login - validate the user and send them to Menu to edit or back to login
router.post('/login', passport.authenticate('local', {
   successRedirect: '/auth/welcome',
   failureRedirect: '/auth/login',
   failureMessage: 'Invalid Login Please Try Again'
}));

//GET logout - allow user to logout
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/auth/login');
});

//is the user authenticated - if not login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

//make it public
module.exports = router, passport;