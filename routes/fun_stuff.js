const express = require('express');
const fun = express.Router();




fun.get('/test', (req, res) => {
    res.send({
        status:200,
        message:"ok"
    })
    });
  
fun.get('/time', (req, res) => {
    let t = new Date();
    let time = t.getHours()+ ":" + (t.getSeconds() < 10 ? '0' : '') + t.getSeconds() ;
    res.send({
        status:200,
         message:time
    })
    });

fun.get('/hello/', function (req, res) {
    res.send({
        status:200,
        message:"hello"
    })
    });    

fun.get('/hello/:id', function (req, res) {
    res.send({
        status:200,
        message:"hello "+ req.params.id
    })
    });


module.exports = fun;