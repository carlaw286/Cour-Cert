const mongoose = require('mongoose')

const teacher_Addcourse = new mongoose.Schema({
  course_title: {
    type: String,
    
  },
  course_description: {
    type: String,
  },
  weekNumber: {
    type: String,
  },
  title: {
    type: String,
  },
  file: {
    // You might want to store the file URL or path in the database
    type: String, // or a file reference such as an S3 object key
  },
  user_id: String,
})


const teacher_AddCourseModel = mongoose.model ("teacher_Addcourse", teacher_Addcourse, 'teacher_AddCourse' )

module.exports = teacher_AddCourseModel