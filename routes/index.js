var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// THE SERVER WILL PERFORM THE CALLBACK FUNCTION WHEN IT RECEIVES THIS URL
router.get('/changeTitle', function(req, res, next) {
   return res.status(200).json({
    title: "New Title"
  });
});






module.exports = router;
