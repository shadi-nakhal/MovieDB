const express = require('express');
const router = express.Router();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];



router.get('/movies/create', function (req, res){
    res.send("create")
    });
        
router.get('/movies/read', function (req, res){
    res.send({
        status:200,
        message: movies})
    });
        
router.get('/movies/update', function (req, res){
    res.send("update")
    });
        
router.get('/movies/delete', function (req, res){
    res.send("delete")
    });


module.exports = router;