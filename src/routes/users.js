const express = require('express')
const router = express.Router()
const userController = require('../controller/users')

router
  .post('/login', userController.login)
  .post('/register', userController.register)
  .get('/', userController.getAllUsers)
  .get('/:id', userController.getFriendsById)

module.exports = router
