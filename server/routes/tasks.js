const express = require('express')
const Controller = require('../controllers/controller')
const task = express.Router()
const {authentication, authorizationTask} = require('../middleware/index')

task.use(authentication)
task.post('/', Controller.postTask)
task.get('/', Controller.getTasks)
task.get('/:id', Controller.getTaskById)
task.put('/:id', authorizationTask, Controller.updateTask)
task.delete('/:id', authorizationTask, Controller.deleteTask)

module.exports = task