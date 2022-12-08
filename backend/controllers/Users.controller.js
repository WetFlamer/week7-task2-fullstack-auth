const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.json(users);
    } catch (error) {
      console.log(error);
    }
  },
  registerUser: async (req, res) => {
    try {
      const {login, password} = req.body
      
      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

      const user = await User.create({login: login, password: hash})

      res.json(user)

    } catch (error) {
      res.json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
    const {login, password} = req.body

    const candidate = await User.findOne({login})

    if(!candidate) {
      return res.status(401).json('Неверный логин или пароль')
    }

    const valid = await bcrypt.compare(password, candidate.password)
    if(!valid) {
      return res.json('Неверный логин или пароль')
    }

    const payload = {
      id: candidate._id,
    }

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: '24h'
    })

    res.json(token)
  } catch (error){return res.json(error)}
  }
};
