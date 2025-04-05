require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const routes = require('./routes/routes');
const aicb = require('./routes/aicbRoutes');
const budgetRoutes = require('./routes/budgetRoutes');


const app = express();
/*
const corsOptions = {
    origin: "https://sd2smartwallet.netlify.app",
    methods: "GET,POST,PATCH,DELETE",
    credentials: true
  };
*/

app.use(express.json());
app.use(cors());
//app.use(cors(corsOptions));
app.use(bodyparser.json());

const APP_PORT = process.env.APP_PORT || 8000;

app.listen(APP_PORT, () => {
    console.log(`Server started @ http://localhost:${APP_PORT}`);
});

const database = mongoose.connection;
mongoose.connect(process.env.DB_URL);

database.on('error', (error) => {
    console.log(`Issue: ${error}`)
});

database.once('connected', () => {
    console.log('Database on!')
});


app.use('/api', routes);
app.use('/api/chatbot', aicb);
app.use('/api', budgetRoutes);

