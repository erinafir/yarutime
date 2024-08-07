const express = require('express')
const Controller = require('../controllers/controller')
const route = express.Router()
const {authentication, authorizationUser} = require('../middleware/index')

route.use('/task', require('./tasks'))
route.post('/user-register', Controller.register)
route.post('/user-login', Controller.userLogin)
route.post('/user-login/google', Controller.userLoginGoogle)
route.use(authentication)
route.post('/chat-openAi', Controller.getOpenAi)
route.get('/user-detail', Controller.getUserById)
route.put('/user-update/:id', authorizationUser, Controller.updateUser)

module.exports = route