// Importing necessary modules
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js'; // Assuming you have a constants.js file
import connectDB from './db/index.js'; // Assuming you have a connectDB method
import app from './app.js'; // Assuming app.js contains Express app setup

// Configure dotenv to load environment variables from the `.env` file
dotenv.config({ path: './.env' }); // Load environment variables from 'env' file

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // If database connection is successful, start the server
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    // If database connection fails, log the error
    console.log('MongoDB connection failed', err);
  });

