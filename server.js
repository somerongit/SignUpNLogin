
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb+srv://admin:root@cluster0.kxotw.mongodb.net/DB?retryWrites=true&w=majority')
const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body
  console.log(username, await bcrypt.hash(password, 12));
  try {
    await User.create({
      username,
      password
    })
  } catch (err) {
    console.log(err);
    return res.json({status:'Error'})
  }
  res.json({
    status: 'ok'
  })
})


app.listen(3000, () => {
  console.log('Server up at 3000');
})


