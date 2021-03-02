const express = require('express')
const chatmessageController = require('../controllers/chatmessage')
const router = express.Router()

router
  .post('/', chatmessageController.insertchatmessage)
  .get('/', chatmessageController.getAllchatmessage)
  .get('/:id', chatmessageController.getchatmessageById)
  .patch('/:id', chatmessageController.updatechatmessage)
  .delete('/:id', chatmessageController.deletechatmessage)

module.exports = router
