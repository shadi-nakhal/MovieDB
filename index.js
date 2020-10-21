const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/test', (req, res) => {
    res.status(200).send('ok')
    })
  
app.get('/time', (req, res) => {
    let t = new Date();
    res.status(200).send("<time>"+ t.getHours()+ ":" + (t.getSeconds() < 10 ? '0' : '') + t.getSeconds() + "</time>")
    })

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
