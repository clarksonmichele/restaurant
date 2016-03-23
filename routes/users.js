//neccessary references
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    var usernames = ['A ', 'B', 'C'];
    
//show the users.ejs view in the browser
    res.render('users', { title: 'Menu',
                         users: usernames });
});

//make it public
module.exports = router;
