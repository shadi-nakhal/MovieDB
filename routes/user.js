const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');
var users = require('./users')

// global.users;

auth.use(express.json())


console.log(users)
/*
* shows all users
*/
auth.get('/users', (req, res) => {
    res.json(users)
  })
  
/*
* creates a user by sending {username:blabla password:123} in json in body
*/
  auth.post('/users', async (req, res) => {
      console.log(users)
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { id: users.length + 1, username: req.body.username, password: hashedPassword }
      users.push(user)
      res.status(201).send("added")
    } catch {
      res.status(500).send("error")
    }
  })

/*
* update a user by sending the updates on a user {username:blabla password:123} in json in body
* and specifying the id in url /users/update/1
*/
  auth.put('/users/update/:id', async (req, res) => {
      let user = users.filter((user) => user.id = req.params.id)
      console.log(user);
      console.log(req.params);
      if(user == undefined){
          res.status(404).send("user not found")
      }else {
        try {
        let user = users.filter((user) => user.id = req.params.id)
        users.splice(users.indexOf(user),1)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newuser = { username: req.body.username, password: hashedPassword }
        users.push(newuser)
        res.status(201).send("user modified")
        } catch {
        res.status(500).send("error")
        }
      }
  })

/*
* deletes a user with a specific id in the url /users/update/1
*/
  auth.delete('/users/delete/:id', async (req, res) => {
    let user = users.filter((user) => user.id = req.params.id)
    console.log(user);
    console.log(req.params);
    if(user == undefined){
        res.status(404).send("user not found")
    }else {
      try {
      let user = users.filter((user) => user.id = req.params.id)
      users.splice(users.indexOf(user),1)
      res.status(201).send("user deleted")
      } catch {
      res.status(500).send("error")
      }
    }
})
  
/*
* login a user by sending {username:blabla password:123} in json in body
*/
  auth.post('/users/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('logged in')
      } else {
        res.send('access denied')
      }
    } catch {
      res.status(500).send()
    }
  })


  module.exports = auth;