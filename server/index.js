const express = require('express');
const dotenv = require('dotenv');
const PORT = 8080 || process.env.PORT;
dotenv.config({});

const app = express();

app.get("/", (req, res) => {
    res.send("THIS IS ARYA STRIPE TEST MODE")
})

app.listen(PORT, () => {
    console.log('SERVER LISTENED AT PORT 8080')
});