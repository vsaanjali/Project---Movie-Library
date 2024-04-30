//importing required modules
const express = require('express')
const mongoose = require("mongoose")

//importing data schemas for required data from folder models
const User = require("./models/user")
const Review = require("./models/review")

//creating an express application
const app = express()

//defining port to run application
const port = 3005

//middleware to parse JSON data
app.use(express.json({ extended: true }))
//middleware to parse URL-encoded data
app.use(express.urlencoded())

//connecting to mongodb database
mongoose.connect("mongodb+srv://saanjaliverma:<password>@cluster0.vhjyock.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("mongodb connected") })
    .catch(() => { console.log("failed to connect") })


//routes
//serving signup page by default
app.get("/", (req, res) => { res.sendFile("pages/signup.html", { root: __dirname }) })
//serving login page
app.get("/login", (req, res) => { res.sendFile("pages/login.html", { root: __dirname }) })
//serving signup page
app.get("/signup", (req, res) => { res.sendFile("pages/signup.html", { root: __dirname }) })
//serving index/home page
app.get("/index", (req, res) => { res.sendFile("pages/index.html", { root: __dirname }) })
//serving reviews page
app.get("/reviews", (req, res) => { res.sendFile("pages/reviews.html", { root: __dirname }) })

//managing user login
app.post('/login', async (req, res) => {
//checking data entered with entries in the database
    let user = await User.findOne(req.body)
    console.log(user)
    if (!user) {
        res.status(200).json({ success: false, message: "No user found" })
    }
    else {
        res.status(200).json({ success: true, user: { email: user.email }, message: "User found" })
        res.sendFile("pages/index.html", { root: __dirname })
    }


})

//managing user signup
app.post('/signup', async (req, res) => {
    try {
        //creating new user entry in database
        const { userToken } = req.body
        console.log(req.body)
        let user = await User.create(req.body)
        res.status(200).json({ success: true, user: user })
    }
    //error handling
    catch (err) {
        if (err.code === 11000) {
            console.error("Duplicate key error. Document already exists!")
            res.status(200).json({ success: false, message: "Username already exists!" })
            
        } else {
            console.error('An error occurred:')
            res.status(200).json({ success: false, message: "Both username and password are required!" })
        }

    }

})



// fetching reviews by movieID
app.post('/getreview', async (req, res) => {
    let reviews = await Review.find({ movieID: req.body.movieID })
    res.status(200).json({ success: true, reviews })

})

//posting reviews entered by user
app.post('/addreview', async (req, res) => {
    try {
        //creating new review entry in database
        const { userToken } = req.body
        let review = await Review.create(req.body)
        res.status(200).json({ success: true, review: review })
    }
    //error handling
    catch (err) {
        console.error('Validation Error')
        res.status(200).json({ success: false })
    }

})

//starting server
app.listen(port, () => (console.log("port connected")))

