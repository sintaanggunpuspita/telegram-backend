const connection = require('../configs/db')

const chatmessage = {
  insertchatmessage: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chatmessage SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getchatmessageById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM chatmessage where id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatechatmessage: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE chatmessage SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deletechatmessage: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM chatmessage WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = chatmessage
