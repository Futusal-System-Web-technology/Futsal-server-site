const { ObjectId } = require('mongodb')
const { getDb } = require('../../../utilis/dbConfig')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../../utilis/token')

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const db = getDb()
    const users = await db.collection('Users').find().toArray()

    if (users.length == 0) {
      return res.status(400).json({ success: 'Fail', error: 'No data' })
    }

    res.status(200).json({ success: 'success', data: users })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

module.exports.getMyBooking = async (req, res, next) => {
  try {
    const db = getDb()
    const { username } = req.body
    const bookings = await db
      .collection('futsal-bookings')
      .find({ username: username })
      .sort({ _id: -1 })
      .toArray()

    res.status(200).send({
      status: 'success',
      data: bookings
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

module.exports.deleteBooking = async (req, res, next) => {
  try {
    const db = getDb()
    const { id } = req.body
    const result = await db
      .collection('futsal-bookings')
      .deleteOne({ _id: ObjectId(id) })
    if (result.deletedCount === 1) {
      res.status(200).send({
        status: 'success',
        message: 'deleted successfully'
      })
    } else {
      res.status(400).send({
        status: 'success',
        message: 'deleted not successfully'
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

module.exports.getAllBooking = async (req, res, next) => {
  try {
    const db = getDb()
    const bookings = await db.collection('futsal-bookings').find({}).toArray()
    res.status(200).send({
      status: 'success',
      data: bookings
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

module.exports.updateBooking = async (req, res, next) => {
  try {
    const db = getDb()
    const { id, status } = req.body
    console.log(id, status)
    // const bookings = await db
    //   .collection('futsal-bookings')
    //   .find({ _id: ObjectId(id) })
    //   .toArray()

    // Update the booking status
    const result = await db
      .collection('futsal-bookings')
      .updateOne({ _id: ObjectId(id) }, { $set: { 'futsal.status': status } })
    console.log(
      `Successfully updated ${result.modifiedCount} futsal object(s).`
    )
    res.status(200).send({
      status: 'success',
      data: result
    })
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      message: e.message
    })
  }
}

module.exports.postUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body
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
        email: email,
        userName: username,
        role: 'user',
        password: newPassword
      }
      const result = await db.collection('Users').insertOne(newUser)
      res.status(200).json({
        status: 'success',
        message: 'data saved successfully',
        data: result
      })
    }, 1000)
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

module.exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(401).json({
        status: 'Fail',
        message: 'Please provide credentials'
      })
    }
    const db = getDb()
    const user = await db.collection('Users').findOne({ userName: username })
    if (!user) {
      return res.status(401).json({
        status: 'Fail',
        message: 'No user with this username'
      })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return res.status(403).json({
        status: 'Fail',
        message: 'Password is not correct'
      })
    }

    if (user.status == 0) {
      return res.status(403).json({
        status: 'Fail',
        message: 'Your account is not active'
      })
    }
    const token = generateToken(user)
    const { password: pwd, ...others } = user
    res.status(200).json({
      status: 'success',
      message: 'successfully singed in',
      data: {
        others,
        token
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: error.message
    })
  }
}
