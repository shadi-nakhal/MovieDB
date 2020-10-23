const mongoose = require('mongoose');


const moviesSchema = new mongoose.Schema(

    {
     title: String,
     year: { type: Number, min: 19, max:20},
     rating: Number
     }

);


module.exports = mongoose.model('movie', moviesSchema);