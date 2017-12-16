

var express = require('express');
var router = express.Router();
const Note = require('../schemas/message.model');

router.post('/saveNote', function(req, res) {
  var note = new Note({
    title     : req.body.title,
    body      : req.body.body,
    date      : req.body.date
  });
  note.save(function(err, result) {
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

router.get('/getNotes', function(req,res)  {

  Note.find().exec(function(err, result)  {
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


router.get('/deleteNote', function(req, res)  {
  console.log("helloworld");
  Note.findByIdAndRemove(req.query.id, function(err, note)  {
    console.log("helloworld1");
    if(err){
      console.log("helloworld2");
      res.status(500).json({
        title: 'nah fam',
        error: err
      })
      console.log("helloworld3");
    }
    if(!err) {
      res.status(200).json({
        title: 'success',
        result: note
      })
    }
  });
});




/* GET INDEX PAGE WHICH JUMPSTARTS THE APPLICATION. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// THE SERVER WILL MAKE A CALL TO MONGO USING MONGOOSE USING THE DATA PASSEDa TO IT BY THE REQUEST SENT BY THE CLIENT


module.exports = router;
