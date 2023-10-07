const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const user_StudentModel = require('./models/user_Student')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Cour-Cert_Users");

app.post("/loginsignup", (req, res) => {
    const {email, password} = req.body;
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

app.listen(3002, () => {
    console.log("server is running")
})