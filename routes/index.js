var express = require('express');
var router = express.Router();
var Blog = require('../schemas/message.model');
var today = new Date();

/* GET INDEX PAGE WHICH JUMPSTARTS THE APPLICATION. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// THE SERVER WILL PERFORM THE CALLBACK FUNCTION WHEN IT RECEIVES THIS URL
router.get('/changeTitle', /* CALL BACK FUNCTION --> */function(request, response) {
   return response.status(200).json({
    title: "New Title"
  });
});

// THE SERVER WILL MAKE A CALL TO MONGO USING MONGOOSE USING THE DATA PASSEDa TO IT BY THE REQUEST SENT BY THE CLIENT
router.post('/saveBlog', function(req, res) {
  var blog = new Blog({
    author    : req.body.author,
    title     : req.body.title,
    body      : req.body.body,
    uploadDate: today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear()
  });
  blog.save(function(err, result) {
      if(err) {
        return res.status(500).json({
          message: 'error saving blog',
          error: err
        });
      }
      if(!result)  {
        return res.status(401).json({
          message: 'No results'
        });
      }
      if(result)  {
        return res.status(201).json({
          message: 'object succesfully saved',
          object: result
        });
      }
  });
});

router.get('/getBlogs', function(req,res)  {
  Blog.find().exec(function(err, result)  {
    if(err) {
      return res.status(500).json({
        title: 'error retrieving data',
          error: err
      });
    }
    if(!result) {
      return res.status(404).json({
        title: 'resource not found'
      })
    }
    if(result)  {
      return res.status(200).json({
        title: 'succesfully retrieved data',
        result: result
      })
    }
  });
});

module.exports = router;
