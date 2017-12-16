var Mongoose = require('mongoose');

var Note = new Mongoose.Schema({
  title: {type:String},
  body: {type:String},
  date: {type: Number}

});

module.exports = Mongoose.model('Note', Note);
