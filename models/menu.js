//mongoose to talk to the db
var mongoose = require('mongoose');

//define the menu schema
var menuSchema = new mongoose.Schema({
   created: {
       type: Date,
       default: Date.now
   },
    item: {
        type: String,
        required: 'Please state the Menu Item'
    },
    description: {
        type: String,
        required: 'Please state the Menu Item'
    }
});

//make it  public
module.exports = mongoose.model('Menu', menuSchema);
