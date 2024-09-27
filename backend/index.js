const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Apply express.raw() middleware only for the webhook route
const WebHookRoute = require('./Routes/WebHookRoute');
app.use('/webhook', express.raw({ type: 'application/json' }), WebHookRoute);

// Middleware to parse JSON for non-webhook routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors());

// import routes
const foodRoute = require('./Routes/FoodRoute');
const favoriteRoute = require('./Routes/FavoriteRoute');
const userRoute = require('./Routes/UserRoute');
const cartRoute = require('./Routes/CartRoute');
const orderRoute = require('./Routes/OrderRoute');
const stripeRoute = require('./Routes/StripeRoute');



// use routes
app.use('/api/food', foodRoute);
app.use('/api/favorite', favoriteRoute);
app.use('/api/user', userRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/stripe', stripeRoute);



// Load environment variables from .env file
require("dotenv").config();
const port = process.env.PORT;

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// connect to the database
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
