'use strict';

const ForeCast = require("../models/User.models");
const axios =require("axios");
const Cache = require("../helpers/cache");
let cache = new Cache();

let usersControleer = async (req,res)=>{
    let currentDate=new Date()
    let lat=req.query.lat;
    let lon=req.query.lon;
    if (cache.data.length>0 && cache.date.getDate()===currentDate.getDate()) {
        res.json(cache)
    }else{
        let url =`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let axiosRes = await axios.get(url).catch((e)=>{
        console.log(e)
    });
    let weatherData=axiosRes.data;
    let myData =weatherData.data.map(item=>{

        return  new ForeCast (item.datetime ,item.weather.description)
    })
    cache.data = myData;

     res.status(200).json(cache.data);
    }
    
}




module.exports=usersControleer;