var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  //res.send('respond with a resource');
    
    var usernames = ['One ', 'Two', 'Three'];
    
    // show the users.ejs view in the browser
    res.render('users', { title: 'Menu',
                         users: usernames });
});


module.exports = router;
