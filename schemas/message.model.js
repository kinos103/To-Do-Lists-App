var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var BlogPost = new Schema({
  author    : String,
  title     : String,
  body      : String,
  date      : String
});



module.exports = Mongoose.model('Blog', BlogPost);
