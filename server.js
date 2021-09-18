
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

// app.get('/weather', (req, res) => {
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



// https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=b7ad9641461c4333a29e6d706eeabbb6
async function handelWeather(req, res) {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=b7ad9641461c4333a29e6d706eeabbb6`;
    console.log(url);
    let respons = await axios.get(url);
    let weatherData = respons.data;
    let cleanedData = weatherData.data.map((item) => {
        return new ForeCast(item.datetime, item.weather.description);
    });
    res.status(200).json(cleanedData)
}
app.get('/weather', handelWeather)


class ForeCast {
    constructor(date, description) {
        this.date = date;
        this.description = description
    }
}






async function handelMovie(req, res) {
    let county = req.query.county;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=e338bfa50b9f5e55c7b9fba4b6173e6d&query=${county}&language=en-US`;
    let respons = await axios.get(url);
    let moiveData = respons.data.results;
    console.log(moiveData);
    let cleanedData = moiveData.map(item => {
        return new ListMoive(item.original_title, item.overview,item.poster_path,item.vote_average,item.popularity,item.release_date)
    })
    res.status(200).json(cleanedData)
}
app.get('/moive', handelMovie)


class ListMoive {
    constructor(original_title, overview,img,vote_average,popularity,release_date) {
        this.original_title = original_title;
        this.overview = overview;
        this.poster_path=`https://image.tmdb.org/t/p/w500/${img}`;
        this.vote_average=vote_average;
        this.popularity=popularity;
        this.release_date=release_date

    }
}



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});