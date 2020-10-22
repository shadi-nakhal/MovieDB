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
/*
* read sorted example localhost:3001/movies/read/by-date or by-title or by-rating
*/
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
    }else {
        res.send({
            status:404,
            error:true,
            message:"Invalid sorting request"
        })
    }

    });

/*
* read example localhost:3001/movies/read/id/1
*/
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

/*
* adding example localhost:3001/movies/add/?title=batata&year=2100&rating=9
*/
router.post('/movies/add', function (req, res){
  
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
/*
* delete error handling example localhost:3001/movies/delete/
*/
router.delete('/movies/delete', function (req, res){
    res.send({
        status:404,
        error:true,
        message:"Cannot Delete without a movie ID"
    })
    });
/*
* delete example localhost:3001/movies/delete/1
*/
router.delete('/movies/delete/:id', function (req, res){
    let mov = movies.filter(item => Object.values(item).indexOf(Number(req.params.id)) == 0);
    
    if(mov.length != 0){
        movies.splice((movies.indexOf(...mov)), 1)
        res.send({
            status:200,
            message: movies
        });
        
    }else{
        res.send({
            status:404,
            error:true,
            message:"the movie with id " + req.params.id + " does not exist"
        })
    }

    });
/*
* update error handling example localhost:3001/movies/update/
*/
router.put('/movies/update', function (req, res){
    res.send({
        status:404,
        error:true,
        message:"Cannot Update without a movie ID",
    })
    });
/*
* update example localhost:3001/movies/update/1/?title=blabla&year=2000
*/
router.put('/movies/update/:id', function (req, res){
    let mov = movies.filter(item => Object.values(item).indexOf(Number(req.params.id)) == 0);
    //console.log(movies[movies.indexOf(...mov)]);
    let querry = req.query
    console.log(querry)
        if(mov.length == 0 || querry.length == 0){
            res.send({
                status:404,
                error:true,
                message:'hal seesan "cluck" "cluck" sho 7elween "cluck" "cluck"'
            })
        }
        else if((querry).hasOwnProperty('title') && querry.title != undefined && querry.title != ""){
            movies[movies.indexOf(...mov)]["title"] = querry.title;
            res.send({
                status:200,
                data: movies
            });
        }else if((querry).hasOwnProperty('year') && querry.year != undefined && Number.isInteger(Number(querry.year)) && (querry.year).length == 4 ){
            movies[movies.indexOf(...mov)]["year"] = Number(querry.year);
            res.send({
                status:200,
                data: movies
            });
        }else if((querry).hasOwnProperty('rating') && querry.rating != undefined && querry.rating < 9.99 && querry.rating > 0 ){
            movies[movies.indexOf(...mov)]["rating"] = Number(Number((querry.rating)).toFixed(1));
            res.send({
                status:200,
                data: movies
            });
        }else {
            res.send({
                status:404,
                error:true,
                message:"Cannot Update without without proper values",
            })
        }
    

    });


module.exports = router;
