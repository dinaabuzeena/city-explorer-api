"use strict";

const axios=require("axios");
const ForeCast = require("../model/weather.model")


async function handelWeather(req, res) {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`;
    console.log(url);
    let respons = await axios.get(url);
    let weatherData = respons.data;
    let cleanedData = weatherData.data.map((item) => {
        return new ForeCast(item.datetime, item.weather.description);
    });
    res.status(200).json(cleanedData)
}



module.exports = handelWeather;