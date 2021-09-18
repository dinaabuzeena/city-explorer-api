
"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require("axios");
app.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json');
const { request } = require('express');
const PORT = process.env.PORT;
const handelWeather=require("./controller/weather.controller");
const handelMovie=require("./controller/moive.contrlloer");


// app.get('/name', (req, res) => {
//     let lat = Number(req.query.lat);
//     let lon = Number(req.query.lon);
//     let searchQuery = req.query.searchQuery;

//     if (lat && lon || searchQuery) {
//         let result = weatherData.find(item => item.city_name === searchQuery)
//         if (result) {
//             let foreCast = result.data.map(item => {
//                 return {
//                     date: item.datetime,
//                     description: item.weather.description
//                 }
//             })
//             res.status(200).json(foreCast);
//         } else {
//             res.status(404).send("Not Found")
//         }

//     } else {
//         res.status(500).send("please enter correct qurey parameter");
//     }

// })

app.get('/weather',handelWeather);

app.get('/moive',handelMovie)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});






