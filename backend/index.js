const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// db connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log('database connected')})
.catch((err) => {console.log('database not connected',err)})

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

// User routes
app.use('/users', require('./routes/userRoutes'))

// Business routes
app.use('/businesses', require('./routes/businessRoutes'));

// Review routes
app.use('/reviews', require('./routes/reviewRoutes'));

// Review routes
const port=8000;
app.listen(port, () => console.log(`server is running on port ${port}`))