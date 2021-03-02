const express = require('express')
const routers = express.Router()
const routerUsers = require('./users')

routers.use('/users', routerUsers)

module.exports = routers