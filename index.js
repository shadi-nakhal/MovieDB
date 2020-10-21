const express = require('express');
const movies_router = require('./routes/movies');
const fun_stuff = require('./routes/fun_stuff');
const search = require('./routes/search');
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('ok')
});

app.use(movies_router);

app.use(fun_stuff);  // the /hello/ /time/ /test/

app.use(search);


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
