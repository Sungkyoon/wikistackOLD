const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')


const staticMiddleware = express.static(path.join(__dirname, './public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

app.use(staticMiddleware)

app.use(morgan('dev'))


app.get('/', (req, res, next) => {
  res.send('Hello World')
})


app.get('/views/layout', (req, res, next) => {
  res.send('', layout)
})







app.listen(1337, () => {
console.log('listening on 1337')
});