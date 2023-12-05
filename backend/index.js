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
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173', 'https://places-public.vercel.app', 'http://72.231.28.64:5173']
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// General routes
app.use('/', require('./routes/accountRoutes'))

// User routes
app.use('/users', require('./routes/userRoutes'))

// Business routes
app.use('/businesses', require('./routes/businessRoutes'));

// Review routes
app.use('/reviews', require('./routes/reviewRoutes'));

// Review routes
const port = 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
