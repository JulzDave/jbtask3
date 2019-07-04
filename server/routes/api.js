var express = require('express');
var router = express.Router();

const Subject = require('../model/subject')
const Todo = require('../model/todos')

//  2) - א
router.get('/subject', function(req, res, next) {
  Subject.find().then(data => {
    res.json(data)
});
});


//  2) - ב
router.get('/todo', function(req, res, next) {
  Todo.find().then(data => {
    res.json(data)
});
});

router.post('/subject', function(req, res, next) {
  const member = new Subject ({
    name: req.body.name,
    nickname: req.body.nickname,
    role: req.body.role
  })

  member.save((err, result) => {
if (err) throw err;
else res.json(result)
  });
});

//2) - ג
router.post('/todo', function(req, res, next) {
  const todo = new Todo ({
    Description: req.body.Description,
    Date: new Date(),
    subject: req.body.subject
  })

  todo.save((err, result) => {
if (err) throw err;
else res.json(result)
  });
});


router.delete('/todo/:id', (req, res) =>{
Todo.deleteOne({_id:req.params.id}).then(data => res.json(data))
});

module.exports = router;
