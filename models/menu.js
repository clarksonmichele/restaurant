//mongoose to talk to the db
var mongoose = require('mongoose');

//define the menu schema
var menuSchema = new mongoose.Schema({
   created: {
       type: Date,
       default: Date.now
   },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: ''
    }
});

//make it  public
module.exports = mongoose.model('Menu', menuSchema);
