const express = require('express');
const movies_router = require('./routes/movies');
const fun_stuff = require('./routes/fun_stuff');
const search = require('./routes/search');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const database = require("./.env");

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('ok')
});
mongoose.connect(URL, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected to database'))

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(movies_router);

app.use(fun_stuff);  // the /hello/ /time/ /test/

app.use(search);


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
