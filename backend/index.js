const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/Userroutes.js')
const authrouter = require('./routes/Authroute.js')
const cookieParser = require('cookie-parser')
const listingRouter = require('./routes/Listingroute.js')
const Errorhandler = require('./middleware/Error.js')
const path = require('path')

// CORS HANDLING
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "PUT, GET, POST, DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


// MONGODB CONNECTION
dotenv.config() 
mongoose.connect(process.env.MONGOSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
);



app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000')
});

app.use('/api/user', userRouter)
app.use('/api/auth', authrouter)
app.use('/api/listing', listingRouter)

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // If headers are already sent, delegate to the default Express error handler
    }
    const resStatus = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(resStatus).json({ 
        success: false,
        resStatus,
        message,
    });
});