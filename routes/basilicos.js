var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Menu = require('../models/menu');

/* GET the menu */
router.get('/', function(req, res, next) {
    //Menu model - get the menu items
    Menu.find(function (err, menus) {
        //if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //display
            res.render('basilicos', {
                title: 'Our Menu',
                menus: menus
            });
        }
    });
});



module.exports = router;
