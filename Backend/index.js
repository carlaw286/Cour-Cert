const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const user_StudentModel = require('./models/user_Student')
require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors())


//Goes into the database 
app.post("/loginsignup", (req, res) => {
    const {email, password} = req.body;
    
    // if( email == user_StudentModel.findOne({email:email})){
    // user_StudentModel.findOne({email: email})
    // .then(userStudent => {
    //     if(userStudent) {
    //         if(userStudent.password === password) {
    //             res.json("Success")
    //         } else {
    //             res.json("Password is incorrect")
    //         }
    //     } else {
    //         res.json("No record existed")
    //     }
    // })}
    // Add code for else statement that go find email in teacher database

    user_StudentModel.findOne({email: email})
    .then(userStudent => {
        if(userStudent) {
            if(userStudent.password === password) {
                res.json("Success")
            } else {
                res.json("Password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/studentsignup', async (req, res) => {
    const { email } = req.body;try {
        // Check if the email already exists in the database
        const existingUser = await user_StudentModel.findOne({ email: email });

        if (existingUser) {
            res.json("Email already in use.");
        } else {
            // If the email is not in use, proceed with user registration
            const newUser = await user_StudentModel.create(req.body);
            res.json(newUser);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
});

mongoose.connect(process.env.DB_URI, {useNewURLParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB Connected!');
})
.catch ( (err) => {
    console.log(err);
})

app.listen(3002, () => {
    console.log("server is running")
})