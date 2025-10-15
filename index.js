// Dependencies and Modules
const express = require("express");
const mongoose = require 
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user");

// Environment Setup
require('dotenv').config();

// Server Setup
const app = express();
const port = 4002;

const corsOptions = {
  origin: [
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas."));

// Backend Routes
app.use("user", userRoutes);

if(require.main === module){
  app.listen( process.env.PORT || 3000, () => {
    console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
  });
}

module.exports = { app, mongoose };