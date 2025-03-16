// Imports
const express= require('express');
const { connectToDatabase } = require('./database');
const app= express();
const DB= require('./database').connectToDatabase;
const userRouter=require("./routes/userRouter"); 
const mealRouter=require("./routes/mealRouter"); 
const cors = require('cors');
const cookieParser = require("cookie-parser");



// Set up the database
const dotenv=require("dotenv"); 


dotenv.config();

// Run the database connection
connectToDatabase();

// Global Middleware to handle extra characters and trailing slashes
app.use((req, res, next) => {
    // Allow root "/" and valid routes, but prevent trailing slashes (except for "/")
    if (req.url.length > 1 && req.url.endsWith('/')) {
        return res.status(400).json({ message: 'Invalid request URL. Trailing slashes are not allowed.' });
    }
    next();
});

  

//Add necessary middleware
app.use(express.json());
app.use(cookieParser()); 

// CORS Configuration
app.use(cors({
    origin: "http://localhost:3000", // Allow your frontend domain
    credentials: true, // Allow credentials like cookies
}));
app.options('*', cors());

// Routes
app.use("/api/users", userRouter)




app.get("/", (req,res)=>{res.send("hello from the backend")})



// Start Server on Port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
