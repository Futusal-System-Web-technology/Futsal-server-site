const { ObjectId } = require('mongodb')
const { getDb } = require('../../../utilis/dbConfig')
const bcrypt = require('bcrypt')

module.exports.postUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body
    let newPassword
    const db = getDb()

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (!err) {
          newPassword = hash
          console.log(hash)
        }
        if (err) password.message = err
      })
    })

    setTimeout(async () => {
      const newUser = {
        userName: username,
        role: role,
        password: newPassword
      }
      const result = await db.collection('Users').insertOne(newUser)
      res.status(200).json({
        status: true,
        message: 'data saved successfully',
        data: result
      })
    }, 1000)
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    })
  }
}
