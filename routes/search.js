const express = require('express');
const search = express.Router();




search.get('/search', function (req, res) {
    if (Object.keys(req.query).length == 0){
        res.send({
            status:500,
            error:true,
            message:"you have to provide a search"
        });
    }else {
        res.send({
        status:200,
        message:"ok",
        data: req.query
        });
    }
    });


module.exports = search;