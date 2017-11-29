var Mongoose = require('mongoose');

var BlogPost = new Mongoose.Schema({
  author    : String,
  title     : String,
  body      : String,
  date      : String
});

module.exports = Mongoose.model('Blog', BlogPost);
