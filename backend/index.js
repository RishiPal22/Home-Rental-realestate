const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./routes/Userroutes.js')
const authrouter = require('./routes/Authroute.js')
const Errorhandler = require('./middleware/Error.js')

dotenv.config() 
mongoose.connect(process.env.MONGOSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000')
});

app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/auth', authrouter)

app.use(Errorhandler);
