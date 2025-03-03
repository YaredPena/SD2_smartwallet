require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

const APP_PORT = process.env.APP_PORT || 8000;

app.listen(APP_PORT, () => {
    console.log(`Server started @ http://localhost:${APP_PORT}`);
});

// const MONGO_URI = process.env.DB_URL;
// if (!MONGO_URI) {
//     console.error("Error: Missing MONGO_URI in environment variables.");
//     process.exit(1); // Exit process if no MongoDB URI
// }

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.error("MongoDB Connection Error:", err));

const database = mongoose.connection;
mongoose.connect(process.env.DB_URL);

database.on('error', (error) => {
    console.log(`Issue: ${error}`)
});

database.once('connected', () => {
    console.log('Database on!')
});

app.use('/api', routes);