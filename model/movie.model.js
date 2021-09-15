"use strict";

class ListMoive {
    constructor(original_title, overview,img) {
        this.original_title = original_title;
        this.overview = overview
        this.poster_path=`https://image.tmdb.org/t/p/w500/${img}`
    }
}

 module.exports=ListMoive;