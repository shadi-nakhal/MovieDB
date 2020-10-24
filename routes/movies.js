
const express = require('express');
const router = express.Router();
const movie = require('../movies_database');
const bcrypt = require('bcrypt');
const user_router = require('./user');
var users = require('./users')



router.use(user_router);
router.use(express.json());

/*
* middleware function for authentication
*/
   const authorize = async (req, res, next )=> {
    const user = users.find(user => user.username === req.body.username)
    if (user == null) {
    return res.status(400).send('Cannot find user')
    }
    try {
    if(await bcrypt.compare(req.body.password, user.password)) {
        next()
    } else {
        res.send('access denied')
    }
    } catch (error){
    res.status(500).send(error)
    }
}


router.get('/movies/read', function (req, res){
    movie.find({}).sort({title: 1}).exec(function(err, mov) {
        res.send({
        status:200,
        message: mov
        })
    })
    });
/*
* read sorted example localhost:3001/movies/read/by-date or by-title or by-rating
*/
router.get('/movies/read/:sort', function (req, res){
    
    if(req.params.sort == "by-date"){
        movie.find({}).sort({year: 'desc'}).exec(function(err, mov) {
            res.send({
                status:200,
                data: mov
            })
         })
        
    }else if(req.params.sort == "by-rating"){
        movie.find({}).sort({rating: 'desc'}).exec(function(err, mov) {
            res.send({
                status:200,
                data: mov
            })
         })
    }else if(req.params.sort == "by-title"){
        movie.find({}).sort({title: 1}).exec(function(err, mov) {
            res.send({
                status:200,
                data: mov
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
    movie.findById({_id: req.params.id}).then(function(mov){
        res.send({
            status:200,
            data:mov
        })
    }).catch((err) => res.send({
        status:404,
        error:true,
        error2:err,
        message: "no movie with such ID"
    }));
})

/*
* adding example localhost:3001/movies/add/?title=batata&year=2100&rating=9
*/
router.post('/movies/add', authorize ,  function (req, res){
    let querry = req.query; 
    let check = {};

    function check_data(data){
        if((data).hasOwnProperty('title') || (data).hasOwnProperty('year') || (data).hasOwnProperty('rating')){
            if((data).hasOwnProperty('title') && data.title != ""){
                check.title = true
            }else if(data.title == ""){
                check.title = false
            }else {
                delete check.title
            }
            if ((data).hasOwnProperty('year') && Number.isInteger(Number(data.year)) && (data.year).length == 4){
                check.year = true
            }else if((data).hasOwnProperty('year') && (data.year).length != 4){
                check.year = false
            }
            if((data).hasOwnProperty('rating') && data.rating < 9.99 && data.rating > 0){
                check.rating = true
            }else if(data.rating > 9.99 || data.rating < 0){
                check.rating = false
            }
        }
    }

    check_data(querry)

    if (Object.values(check).indexOf(false) > -1) {
        let error = Object.keys(check).find(key => check[key] === false)
        res.send({
            status:404,
            error:true,
            message:"invalid " + error + " Input",
        })
    }
      if (req.query.rating == undefined || req.query.rating > 9.9 ){
          let newmovie = { title: req.query.title, year: req.query.year, rating: 4}
          movie.create(newmovie).then(function(){
            movie.find({}).then(function(allmovies){
                res.send({
                    status:200,
                    movies_list : allmovies
                })
            })
          }).catch((err) => res.send({
            status:404,
            error:true,
            message: err
        }))

      }else {
        let newmovie = {title: req.query.title, year: req.query.year, rating: Number(Number((req.query.rating)).toFixed(1))}
          movie.create(newmovie).then(function(){
            movie.find({}).then(function(allmovies){
                res.send({
                    status:200,
                    movies_list : allmovies
                })
            }).catch((err) => res.send({
                status:404,
                error:true,
                message: err
            }))
          }).catch((err) => res.send({
            status:404,
            error:true,
            message: err
        }))
      }
      
     });
/*
* delete error handling example localhost:3001/movies/delete/
*/
router.delete('/movies/delete', authorize , function (req, res){
    res.send({
        status:404,
        error:true,
        message:"Cannot Delete without a movie ID"
    })
    });
/*
* delete example localhost:3001/movies/delete/1
*/
router.delete('/movies/delete/:id', authorize ,  function (req, res){
       movie.findByIdAndRemove({_id: req.params.id}).then(function(){
           movie.find({}).then(function(allmovies){
               res.send({
                   status:200,
                   movies_list : allmovies
               })
           }).catch((err) => res.send({
                    status:404,
                    error:true,
                    message:err
                }))
       }).catch((err) => res.send({
        status:404,
        error:true,
        error2: err,
        message:"the movie with id "+ req.params.id + " does not exist"
    }))


    });
/*
* update error handling example localhost:3001/movies/update/
*/
router.put('/movies/update', authorize , function (req, res){
    res.send({
        status:404,
        error:true,
        message:"Cannot Update without a movie ID",
    })
    });
/*
* update example localhost:3001/movies/update/1/?title=blabla&year=2000
*/
router.put('/movies/update/:id', authorize , function (req, res){
    let check = {};
    let querry = req.query;

    function check_data(data){
        if((data).hasOwnProperty('title') || (data).hasOwnProperty('year') || (data).hasOwnProperty('rating')){
            if((data).hasOwnProperty('title') && data.title != ""){
                check.title = true
            }else if(data.title == ""){
                check.title = false
            }else {
                delete check.title
            }
            if ((data).hasOwnProperty('year') && Number.isInteger(Number(data.year)) && (data.year).length == 4){
                check.year = true
            }else if((data).hasOwnProperty('year') && (data.year).length != 4){
                check.year = false
            }
            if((data).hasOwnProperty('rating') && data.rating < 9.99 && data.rating > 0){
                check.rating = true
            }else if(data.rating > 9.99 || data.rating < 0){
                check.rating = false
            }
        }
    }
        check_data(querry);

        if (Object.values(check).indexOf(false) > -1) {
            let error = Object.keys(check).find(key => check[key] === false)
            res.send({
                status:404,
                error:true,
                message:"invalid " + error + " Input",
            })
        }else {
           movie.findOneAndUpdate({_id: req.params.id}, querry).then(function(){
            movie.find({}).then(function(allmovies){
                res.send({
                    status:200,
                    movies_list : allmovies
                })
            });
           }).catch((err) => {res.send({
            status:404,
            error:true,
            message:'hal seesan "cluck" "cluck" wrong id "cluck" "cluck1"'
     })});
        
    }

    });

    



module.exports = router;
