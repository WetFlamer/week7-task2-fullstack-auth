const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    login: String,
    password: String,
})

const User = mongoose.model('User', usersSchema)

module.exports = User