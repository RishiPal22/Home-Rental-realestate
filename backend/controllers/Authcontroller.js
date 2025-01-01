const Errorhandler = require("../middleware/Error.js");
const User = require("../models/Usermodel.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const signup = async (req, res, next) => {

    try {

        const { username, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username: username, email: email, password: hashedpassword })
        // const salt = bcrypt.gensalt(10)
        await newUser.save();
        console.log(hashedpassword)
        res.send(newUser)
    }
    catch (err) {
        next(err)
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {

        if (!email && !password) {
            return next(Errorhandler(400, "Please Enter email and password"))
        }
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(Errorhandler(404, "Invalid Email"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(Errorhandler(404, "Wrong credentials."))
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        console.log("User ID for generated token:", validUser._id);

        // console.log("Decoded user ID", id)
        const { password: pass, ...rest } = validUser._doc
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest)

    }
    catch (error) {
        next(Errorhandler(500, "Internal Server Error"))
    }
};

const google = async (req, res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(201).json(rest)
            console.log("user is logged in .")
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashpassword = bcrypt.hashSync(generatedPassword, 10)

            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email, password: hashpassword, avatar: req.body.photo
            })

            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc
            res.cookie("accesstoken", token, { httpOnly: true }).status(201).json(rest)
            console.log("User registered.")

        }
    }
    catch (error) {
        next(error);
    }
};

const usersignOut = (req, res) => {
    res.clearCookie("access_token")
    res.send("User Logged out.")
};

module.exports = { signup, signin, google, usersignOut };