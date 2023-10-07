const mongoose = require('mongoose')


//User_Student
const user_StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

//User_Teacher
const user_TeacherSchema = new mongoose.Schema({
    
})

const user_StudentModel = mongoose.model("user_Students", user_StudentSchema,'user_students')


module.exports = user_StudentModel