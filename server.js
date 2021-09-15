
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

app.get('/weather', handelWeather)


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

app.get('/', (req, res) => {
    res.send('test');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

class ForeCast {
    constructor(date, description) {
        this.date = date;
        this.description = description
    }
}




app.get('/moive', handelMovie)

async function handelMovie(req, res) {
    let county = req.query.county;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=e338bfa50b9f5e55c7b9fba4b6173e6d&query=${county}&language=en-US`;
    let respons = await axios.get(url);
    let moiveData = respons.data.results;
    console.log(moiveData);
    let cleanedData = moiveData.map(item => {
        return new ListMoive(item.original_title, item.overview,item.poster_path)
    })
    res.status(200).json(cleanedData)
}


class ListMoive {
    constructor(original_title, overview,img) {
        this.original_title = original_title;
        this.overview = overview
        this.poster_path=`https://image.tmdb.org/t/p/w500/${img}`
    }
}
