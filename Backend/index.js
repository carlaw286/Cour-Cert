const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require("cors")
const user_StudentModel = require('./models/user_Student')
const user_TeacherModel = require('./models/user_Teacher')
//
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
//
const teacher_AddCourseModel = require('./models/teacher_Addcourse')

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
                        res.json("Success")
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
    console.log("asdadassadsadsddasasfasf")
    teacher_AddCourseModel.find()
        .then(courses => res.json(courses))
        .catch(err => res.json(err))
})

// app.get('/getTeachercourses', (req, res) => {
//     const { user_id } = req.query;

//     console.log(user_id);
//     teacher_AddCourseModel.findOne({user_id: user_id})
//         .then(userCourses =>{
//             if(userCourses){

//                 res.json({
//                     status: "Found one",
//                     userCourses
//                 })
//             }
//             else{
//                 res.json("No Courses Found")
//             }
//         })
// })

// app.post('/teacher_AddCourse', async (req, res) => {
//     const { course_title } = req.body; 
//     console.log(req.body);

//     try {
//         // Check if the course already exists in the database
//         const existingCourse_Title = await teacher_AddCourseModel.findOne({ course_title: course_title });

//         if (existingCourse_Title) {
//             res.json("Course already exists");
//         } else {
//             // If the course does not exist, proceeds to create course
//             const newCourse = await teacher_AddCourseModel.create(req.body);
//             res.json(newCourse);
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Add new teacher course with file upload
app.post('/teacher_AddCourse', upload.single('pdfFile'), async (req, res) => {
    const { course_title, course_description, week_numbers } = req.body;
    const pdfFile = req.file; // Assuming you have a single file upload input named 'pdfFile'

    try {
        const existingCourseTitle = await teacher_AddCourseModel.findOne({ course_title: course_title });

        if (existingCourseTitle) {
            res.json("Course already exists");
        } else {
            const newCourse = await teacher_AddCourseModel.create({
                course_title,
                course_description,
                week_numbers: JSON.parse(week_numbers),
                uploaded_files: [
                    {
                        filename: pdfFile.originalname,
                        path: pdfFile.path,
                    }
                ]
            });
            res.json(newCourse);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update teacher course with file upload
app.put('/updateCourse', upload.single('pdfFile'), async (req, res) => {
    console.log("AFJSFJSFJSDJF")

    const data = req.body

    const { id } = data

    console.log('id: ' + id);
    console.log(data)

    const { title, description, weekNumbers } = req.body;
    const pdfFile = req.file; // Assuming you have a single file upload input named 'pdfFile'

    try {
        console.log(id)
        const existingCourse = await teacher_AddCourseModel.findById(id);

        console.log('111')

        if (!existingCourse) {
            return res.status(404).json("Course not found");
        }

        console.log('A')

        const updatedCourse = {
            course_title: title,
            course_description: description,
            week_numbers: weekNumbers,
        };
        console.log("week:" + weekNumbers)

        console.log('b')

        if (pdfFile) {
            updatedCourse.uploaded_files = [
                {
                    filename: pdfFile.originalname,
                    path: pdfFile.path,
                }
            ];
        }

        console.log('C')

        console.log("updatedCourse.course_title: " + updatedCourse.course_title);
        console.log("updatedCourse.course_description: " + updatedCourse.course_description);
        console.log("updatedCourse.week_numbers: " + updatedCourse.week_numbers);


        const updatedCourseResult = await teacher_AddCourseModel.findByIdAndUpdate(
            id,
            updatedCourse,
            { new: true }
        );

        console.log('D')

        if (updatedCourseResult) {
            res.json(updatedCourseResult);
        } else {
            res.status(404).json("Course not found");
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
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