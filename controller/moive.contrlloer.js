"use strict";

const axios = require("axios");
const ListMovie = require("../model/movie.model");


async function handelMovie(req, res) {
        let county = req.query.county;
        let url = `https://api.themoviedb.org/3/search/movie?api_key=e338bfa50b9f5e55c7b9fba4b6173e6d&query=${county}&language=en-US`;
        let respons = await axios.get(url);
        let moiveData = respons.data.results;
        let cleanedData = moiveData.map(item => {
            return new ListMovie(item.original_title, item.overview, item.poster_path)
        })
        res.status(200).json(cleanedData)
    }




module.exports = handelMovie;
  