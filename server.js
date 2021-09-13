
"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

app.get('/name', (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);

    if (lat && lon) {
        let result = [];
        weatherData.find(item => {
            if (item.lat === lat && item.lon === lon) {
                result.push(item)
            }

        })
        let city = result[0];
        let foreCast = city.data.map(item => {
            return {
                date: item.datetime,
                description: item.weather.description
            }
        })

        res.status(200).json(foreCast)
    } else {
        res.status(500).send("please enter correct qurey parameter");
    }

})




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});