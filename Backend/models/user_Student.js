const mongoose = require('mongoose')

const user_StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const user_StudentModel = mongoose.model("user_Students", user_StudentSchema)
module.exports = user_StudentModel