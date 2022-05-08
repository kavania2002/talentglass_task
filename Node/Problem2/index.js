const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
const friendR = require('./routes/friends');
app.use('/friends',friendR);

const CONN_URL = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.f1itz.mongodb.net/sample?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8000;

mongoose.connect(CONN_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {app.listen(PORT); console.log("server working");}).catch((e) => console.log(e.message));