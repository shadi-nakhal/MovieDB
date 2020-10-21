const express = require('express');
const movies_router = require('./routes/movies');
const fun_stuff = require('./routes/fun_stuff');
const search = require('./routes/search');
const app = express()
const port = 3001

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];

app.get('/', (req, res) => {
  res.send('ok')
});

app.use(movies_router);
app.use(fun_stuff);
app.use(search);


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
