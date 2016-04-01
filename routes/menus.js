//
var express = require('express');
var router = express.Router();
//link to mongoose, the menu model and passport
var mongoose = require('mongoose');
var Menu = require('../models/menu');
var passport = require('passport');

//GET handler - main menus page - private
router.get('/', isLoggedIn, function(req, res, next) {
    //Menu model - get the menu items
    Menu.find(function (err, menus) {
        //if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //display
            res.render('menus/index', {
                title: 'Menus',
                menus: menus
            });
        }
    });
});

//GET handler for add - form
router.get('/add', isLoggedIn, function(req, res, next) {
    res.render('menus/add', {
        title: 'Add a New Menu Item'
    });
});

//POST handler for add - add new item
router.post('/add', isLoggedIn, function(req, res, next) {

    //save a new menu item -Menu model and mongoose
    Menu.create( {
            item: req.body.item,
            description: req.body.description
        }
    );

    //redirect to menu
    res.redirect('/menus');
});

//GET handler for edit - show the menu items to edit
router.get('/:id', isLoggedIn, function(req, res, next) {
   //create an id variable - store the id from the url
    var id = req.params.id;

    //look up the a menu item
    Menu.findById(id, function(err, menu) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           //or else show the edit view
           res.render('menus/edit', {
               title: 'Menu Details',
               menu: menu
           });
       }
    });
});

//POST handler for edit - change menu items
router.post('/:id', isLoggedIn, function(req, res, next) {
    //id variable to store
    var id = req.params.id;

    //fill the menu info
    var menu = new Menu( {
        _id: id,
        item: req.body.item,
        description: req.body.description
    });

    //update with mongoose and Menu model or redirect 
    Menu.update( { _id: id }, menu,  function(err) {
        if (err) {
            console.log(err)
            res.end(err);
        }
        else {
            res.redirect('/menus');
        }
    });
});

//GET handler for delete - using menu ids 
router.get('/delete/:id', isLoggedIn, function(req, res, next) {
    
//id from the url
   var id = req.params.id;
        console.log('deleting a menu item');
    
    Menu.remove({ _id: id}, function(err) {
       if (err) {
            console.log(err);
            res.end(err);
        }
        else {
           res.redirect('/menus');
        // and display the updated menu items
        }
    });
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
module.exports = router;
