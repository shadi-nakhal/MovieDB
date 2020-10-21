const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('ok')
});

app.get('/test', (req, res) => {
    res.send({
        status:200,
        message:"ok"
    })
    });
  
app.get('/time', (req, res) => {
    let t = new Date();
    let time = t.getHours()+ ":" + (t.getSeconds() < 10 ? '0' : '') + t.getSeconds() ;
    res.send({
        status:200,
         message:time
    })
    });

app.get('/hello/', function (req, res) {
    res.send({
        status:200,
        message:"hello"
    })
    });    

app.get('/hello/:id', function (req, res) {
    res.send({
        status:200,
        message:"hello "+ req.params.id
    })
    });

app.get('/search', function (req, res) {
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


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
