var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Menu = require('../models/menu');

/* GET the menu */
router.get('/', function(req, res) {
  Menu.find(function(err, basilico) {
    if (err) res.end(err);
    res.render('basilico', {
      title: 'basilico',
      basilico: basilico
    });
  });
});

module.exports = router;