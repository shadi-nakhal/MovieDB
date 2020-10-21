const express = require('express');
const router = express.Router();

const movies = [
    { id: 1, title: 'Jaws', year: 1975, rating: 8 },
    { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
    { id: 3, title: 'Brazil', year: 1985, rating: 8 },
    { id: 4, title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];


        
router.get('/movies/read', function (req, res){
        res.send({
        status:200,
        message: movies
        })
    });

router.get('/movies/read/:sort', function (req, res){
    
    if(req.params.sort == "by-date"){
            res.send({
            status:200,
            data: movies.sort((a, b)=>{var dateA = new Date(a.year), dateB = new Date(b.year); return dateA - dateB;})
        })
    }else if(req.params.sort == "by-rating"){
            res.send({
            status:200,
            data: movies.sort((a, b) => a.rating - b.rating)
        })
    }else if(req.params.sort == "by-title"){
            res.send({
            status:200,
            data: movies.sort((a, b)=>{
                var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
            })
        })
    }

    });

router.get('/movies/read/id/:id', function (req, res){
    let mov = movies.filter(item => Object.values(item).indexOf(Number(req.params.id)) == 0)
    if(mov.length != 0){
        res.send({
            status:200,
            data:mov
        })
    }else{
        res.send({
            status:404,
            error:true,
            message:"the movie with id " + req.params.id + " does not exist"
        })
    }
})

router.get('/movies/create', function (req, res){

        console.log((req.query.year));
      
      if (!(req.query).hasOwnProperty('title') || !(req.query).hasOwnProperty('year')
      || !Number.isInteger(Number(req.query.year)) || (req.query.year).length != 4 ) {
            res.send({
                status:500,
                error:true,
                message:"you cannot create a movie without providing a title and a year'"
                });
      }else if (req.query.rating == undefined || req.query.rating > 9.9 ){
          movies.push({id:movies.length+1, title: req.query.title, year: req.query.year, rating: 4})
          res.send({
              status:200,
              message: movies
          })
      }else {
        movies.push({id:movies.length+1, title: req.query.title, year: req.query.year, rating: Number(Number((req.query.rating)).toFixed(1))})
        res.send({
            status:200,
            message: movies
        })
      }

     });

router.get('/movies/update', function (req, res){
    res.send("update")
    });
        
router.get('/movies/delete', function (req, res){
    res.send("delete")
    });


module.exports = router;