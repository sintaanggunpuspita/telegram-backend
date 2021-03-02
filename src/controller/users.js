const usersModels = require('../models/users')
const helpers = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = {
    register: (req, res) => {
        const { name, email, password } = req.body
        const data = {
            username:'',
            name,
            email,
            password,
            bio: '',
            phoneNumber: '',
            image:'',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        bcrypt.genSalt(10, function (_err, salt) {
        bcrypt.hash(data.password, salt, function (_err, hash) {
            data.password = hash
            usersModels.register(data)
            .then((result) => {
                if (result == 'Email is already') {
                helpers.response(res, null, result, 403, 'Forbidden')
                } else {
                return helpers.response(res, { message: 'register berhasil' }, 201, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        })
        })
    },
    login: (req, res) => {
        const { email, password } = req.body
        usersModels.login(email)
        .then((result) => {
            if (result.length < 1) return helpers.response(res, null, 'Email not found!', 401, null)
            const user = result[0]
            const hash = user.password
            bcrypt.compare(password, hash).then((resCompare) => {
            if (!resCompare) return helpers.response(res, null, 'Password wrong!', 401, null)
            const payload = {
                id: user.id,
                email: user.email
            }

            jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3h' }, (_err, token) => {
                user.token = token
                delete user.password
                helpers.response(res, user, 200)
            })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getAllUsers: (req, res) => {
        const id = req.params
        usersModels.getAllUsers()
          .then((result) => {
            const resultUsers = result
            // eror handling
            if (resultUsers.length === 0) {
              return helpers.response(res, { message: 'id not found' }, 404, null)
            } 
              return helpers.response(res, resultUsers, 200, null)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getFriendsById: (req, res) => {
        const id = req.params.id
        usersModels.getFriendsById(id)
          .then((result) => {
            const resultUsers = result
            // eror handling
            if (resultUsers.length === 0) {
              return helpers.response(res, { message: 'id not found' }, 404, null)
            } 
              return helpers.response(res, resultUsers, 200, null)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      updateUser: (req, res) => {
        console.log(req.file)
        const id = req.params.id
        const { name, username, phoneNumber } = req.body
    
        const data = {
          name,
          username,
          phoneNumber
        }
    
        if (req.files) {
            data.image = process.env.BASE_URL + 'uploads/' + req.file.filename
        }
    
        modelUser.updateUser(id, data)
        .then((result) => {
            const resultUsers = result
            console.log(result)
            helpers.response(res, null, resultUsers, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
}

module.exports = users;
