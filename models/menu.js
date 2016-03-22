// link to mongoose
var mongoose = require('mongoose');

// define the menu schema
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

// make the menu public
module.exports = mongoose.model('Menu', menuSchema);
