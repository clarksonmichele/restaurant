//neccessary references
var express = require('express');
var router = express.Router();

//public menu page
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Basilico',
        message: 'Casual Italian Cuisine' 
    });
});

//make it public
module.exports = router;
