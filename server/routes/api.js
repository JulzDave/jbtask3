var express = require('express');
var router = express.Router();

const Subject = require('../model/subject')
const Todo = require('../model/todos')

//  2) - א
router.get('/subject', async (req, res) => {
  try {
    const data = await Subject.find()
    await res.json(data);
  }
  catch (err) {
    console.log('Get subject error: ', err)
  }
});


//  2) - ב
router.get('/todo', async (req, res) => {
try {
  const data = await Todo.find();
  await res.json(data)
  }
  catch (err) {
    console.log('Get todo error: ', err)
  }
});

router.post('/subject', (req, res) => {
  const member = new Subject({
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
router.post('/todo', (req, res) => {
  const todo = new Todo({
    Description: req.body.Description,
    Date: new Date(),
    subject: req.body.subject
  })

  todo.save((err, result) => {
    if (err) throw err;
    else res.json(result)
  });
});


router.delete('/todo/:id', async (req, res) => {
  try {
  const data = await Todo.deleteOne({ _id: req.params.id })
  await res.json(data)
  }
  catch (err) {
    console.log('Delete todo error: ', err)
  }
});

module.exports = router;
