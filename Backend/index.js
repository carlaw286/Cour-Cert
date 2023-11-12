const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require("cors")
const user_StudentModel = require('./models/user_Student')
const user_TeacherModel = require('./models/user_Teacher')
const teacher_AddCourseModel = require ('./models/teacher_Addcourse')
const user_AdminModel = require('./models/user_admin')
//jwt
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
var nodemailer = require('nodemailer');

require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true

}))
app.use(cookieParser())




//jwt
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("The token was not available")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json("Token is wrong")
            next();
        })
    }
}

app.get('/studenthomepage', verifyUser, (req, res) => {
    return res.json("Success")
})

app.get('/teacherhomepage', verifyUser, (req, res) => {
    return res.json("Success")
})
//jwt



//Student Login 
app.post("/loginsignupstudent", (req, res) => {
    const { email, password } = req.body;

    user_StudentModel.findOne({ email: email })
        .then(userStudent => {

            if (userStudent) {
                bcrypt.compare(password, userStudent.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: userStudent.email }, "jwt-secret-key", { expiresIn: "1d" })
                        res.cookie("token", token);
                        // res.json("Success")
                        
                        res.json({
                            status: "Success",
                            userStudent
                        })
                    }
                    else {
                        res.json("Password is incorrect")
                    }//
                })
            } else {
                res.json("No record existed")
            }
        })
})

//Teacher login 
app.get("/loginsignupteacher", (req, res) => {
    const { email, password } = req.query;

    user_TeacherModel.findOne({ email: email })
        .then(userTeacher => {

            if (userTeacher) {
                bcrypt.compare(password, userTeacher.password, (err, response) => {
                    if (response) {
                        console.log * ("response: " + response);
                        const token = jwt.sign({ email: userTeacher.email }, "jwt-secret-key", { expiresIn: "1d" })
                        res.cookie("token", token);


                        res.json({
                            status: "Success",
                            userTeacher
                        })
                    }
                    else {//optional getuyo ra para d ka proceed if i input ang hash password
                        res.json("Password is incorrect")
                    }//
                })
            } else {

                res.json("No record existed")
            }
        })
})


//student signup credentials into database
app.post('/studentsignup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate, gender } = req.body;

        // Check if the email already exists in the database
        const existingUser = await user_StudentModel.findOne({ email: email });

        if (existingUser) {
            res.json("Email already in use.");
        } else {
            // Hash the password
            bcrypt.hash(password, 10)
                .then(async (hash) => {
                    // Create a new user with the hashed password
                    const newUser = await user_StudentModel.create({
                        firstName,
                        lastName,
                        email,
                        password: hash,
                        birthDate,
                        gender
                    });

                    res.json(newUser);
                })
                .catch(err => console.log(err.message));
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//teacher signup credentials are added into the database
app.post('/teachersignup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate, gender, credentialsLink } = req.body;

        // Check if the email already exists in the database
        const existingUser = await user_TeacherModel.findOne({ email: email });

        if (existingUser) {
            res.json("Email already in use.");
        } else {
            // Hash the password
            bcrypt.hash(password, 10)
                .then(async (hash) => {
                    // Create a new user with the hashed password
                    const newUser = await user_TeacherModel.create({
                        firstName,
                        lastName,
                        email,
                        password: hash,
                        birthDate,
                        gender,
                        credentialsLink
                    });

                    res.json(newUser);
                })
                .catch(err => console.log(err.message));
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get('/getTeachercourses', (req, res) => {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Missing user_id in the request body' });
    }
    
    teacher_AddCourseModel
      .find({ user_id: id })
      .then(courses => res.json(courses))
      .catch(err => res.json(err));
});

// Add new teacher course 
app.post('/teacher_AddCourse', async (req, res) => {
    const { course_title, course_description, user_id } = req.body;
    
    try {
        const existingCourseTitle = await teacher_AddCourseModel.findOne({ course_title: course_title });
        
        if (existingCourseTitle) {
            res.json("Course already exists");
        } else {
            const newCourse = await teacher_AddCourseModel.create({
                course_title,
                course_description,
                user_id,
            });
            

            res.json(newCourse);
            
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploaded-files'); // Define the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });



// Update teacher course with topics and file upload
app.put('/updateCourse', upload.single("file"), async (req, res) => {
    const data = req.body;
    const {id} = data
    console.log(data);
    console.log(req.file)


    const { course_title, course_description, weekNumber, title} = data;
    const fileName = req.file.filename; // Assuming you have a single file upload input named 'pdfFile'
    console.log("coursetitle: " + course_title)
    console.log("coursedescription: " + course_description)
    console.log("week: " + weekNumber)
    console.log("PDFtitle: " + title)

    console.log("name:" + fileName)
    try {
        console.log(id);
        const existingCourse = await teacher_AddCourseModel.findById(id);

        console.log('111');

        if (!existingCourse) {
            return res.status(404).json("Course not found");
        }

        console.log('A');

        const updatedCourse = {
            course_title : course_title,
            course_description : course_description,
            weekNumber : weekNumber,
            title : title,
            file : fileName,
        }

        console.log('updatedCourse:', updatedCourse);

        const updatedCourseResult = await teacher_AddCourseModel.findByIdAndUpdate(
            id,
            updatedCourse,
            { new: true }
        );

        console.log('D');

        if (updatedCourseResult) {
            res.json(updatedCourseResult);
        } else {
            res.status(404).json("Course not found");
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//For student profile
app.get('/studentprofile', (req, res) => {
    const { userId } = req.query; // Use req.query to get query parameters
    user_StudentModel.findById(userId) // Use findOne instead of find to get a single user
      .then(studentUser => res.json(studentUser))
      .catch(err => res.json(err));
  });
//for teaacher profile
  app.get('/teacherprofile', (req, res) => {
    const { userId } = req.query; // Use req.query to get query parameters
    user_TeacherModel.findById(userId) // Use findOne instead of find to get a single user
      .then(teacherUser => res.json(teacherUser))
      .catch(err => res.json(err));
  });
  
  //for student update profile details
  app.put('/updatestudentprofile', verifyUser, async (req, res) => {
    const data = req.body;
    
    // Extract relevant fields from the formData object
    const { firstName, lastName, email } = data;
    const { userId } = req.query;
  
    try {
      // Find the user by userId
      const user = await user_StudentModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user fields if provided in the request
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //for teacher update profile details
  app.put('/updateteacherprofile', verifyUser, async (req, res) => {
    const data = req.body;
    
    // Extract relevant fields from the formData object
    const { firstName, lastName, email } = data;
    const { userId } = req.query;
  
    try {
      // Find the user by userId
      const user = await user_TeacherModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user fields if provided in the request
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//nodemailer
app.post('/forgotpassword', (req, res) => {
    const { email } = req.body;

    // Check both student and teacher models
    Promise.all([
        user_StudentModel.findOne({ email }),
        user_TeacherModel.findOne({ email }),
    ])
    .then(([user_Student, user_Teacher]) => {
        // Check if either a student or a teacher with the given email exists
        if (user_Student || user_Teacher) {
            const user = user_Student || user_Teacher; // Use the first non-null user

            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'courcertdeveloper@gmail.com',
                    pass: 'lstu ntsg pqzb lwwt'
                }
            });

            var mailOptions = {
                from: 'youremail@gmail.com',
                to: email,
                subject: 'Reset Your Cour-Cert Account Password',
                text: `Dear Cour-Cert User,
                
                Here are your Cour-Cert Account Reset Password Link.
                The Reset Password link will expire in 24 hours.

                http://localhost:3000/resetpassword/${user._id}/${token}

                
                The Cour-Cert Developer Team`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.send({ Status: "Error sending email" });
                } else {
                    return res.send({ Status: "Success" });
                }
            });
        } else {
            return res.send({ Status: "User doesn't exist." });
        }
    })
    .catch(error => {
        console.log(error);
        return res.send({ Status: "Error" });
    });
});


app.post('/resetpassword/:id/:token', (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" });
        } else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    // Check both student and teacher models
                    Promise.all([
                        user_StudentModel.findByIdAndUpdate({ _id: id }, { password: hash }),
                        user_TeacherModel.findByIdAndUpdate({ _id: id }, { password: hash }),
                    ])
                        .then(([studentUpdate, teacherUpdate]) => {
                            // Check if either a student or a teacher with the given ID exists
                            if (studentUpdate || teacherUpdate) {
                                return res.send({ Status: "Success" });
                            } else {
                                return res.send({ Status: "User doesn't exist." });
                            }
                        })
                        .catch(err => res.send({ Status: err }));
                })
                .catch(err => res.send({ Status: err }));
        }
    });
});

app.get("/Admin", cors(),(req,res)=>{

})


app.post("/Admin",async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await user_AdminModel.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("not exist")
        }
    }
    catch(e){
        res.json("fail")
    }
});

mongoose.connect(process.env.DB_URI, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Connected!');
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(3002, () => {
    console.log("server is running")
})