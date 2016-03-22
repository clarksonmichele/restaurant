var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Menu = require('../models/menu');

// set up the GET handler for the main menus page
router.get('/', function(req, res, next) {
    // use the Menu model to retrieve all menus
    Menu.find(function (err, menus) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('menus/index', {

                title: 'Menus',
                menus: menus
            });
        }
    });
});

// GET handler for add to display a blank form
router.get('/add', function(req, res, next) {
    res.render('menus/add', {
        title: 'Add a New Menu Item'
    });
});

// POST handler for add to process the form
router.post('/add', function(req, res, next) {

    // save a new menu using our Menu model and mongoose
    Menu.create( {
            title: req.body.title,
            content: req.body.content
        }
    );

    // redirect to main menus page
    res.redirect('/menus');
});

// GET handler for edit to show the populated form
router.get('/:id', function(req, res, next) {
   // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected article
    Menu.findById(id,  function(err, menu) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // show the edit view
           res.render('menus/edit', {
               title: 'Menu Details',
               menu: menu
           });
       }
    });
});

// POST handler for edit to update the menu
router.post('/:id', function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the menu object
    var menu = new Menu( {
        _id: id,
        title: req.body.title,
        content: req.body.content
    });

    // use mongoose and our Menu model to update
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

//GET handler for delete using the menu id parameter
router.get('/delete/:id', function(req, res, next) {
    //grab the id parameter from the url
   var id = req.params.id;
    
    console.log('trying to delete');
    
    Menu.remove({ _id: id}, function(err) {
       if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the updated menus list
           res.redirect('/menus');
        }
    });
});


// make public
module.exports = router;
