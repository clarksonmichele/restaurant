/* Michele Clarkson COMP2106 - Basilico model */
//mongoose to talk to the db
var mongoose = require('mongoose');
//create a schema variable
var schema = mongoose.Schema;
//local variable to store usernames and passwords
var passportLocalMongoose = require('passport-local-mongoose');

//create the account schema capital "A" for convention
var Account = new schema({
	username: String,
	password: String
});

//call the function - connect schema with PLM model
Account.plugin(passportLocalMongoose);

//make it public
module.exports = mongoose.model('Account', Account);