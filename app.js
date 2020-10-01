const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const path = require('path');
const app = express();
const { db, Page, User } = require('./models');
const bodyParser = require('body-parser');

const staticMiddleware = express.static(path.join(__dirname, './public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(staticMiddleware);
app.use(morgan('dev'));

//Check if database is connected
db.authenticate().then(() => {
  console.log('connected to the database');
});

//Main route
app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.get('/views/layout', (req, res, next) => {
  res.send('', layout);
});

//Sync dbs and start server on port 1337
const initializeServer = async () => {
  const page = Page.build()
  await db.sync();

  app.listen(1337, () => {
    console.log('listening on 1337');
  });
};

//Sync database and start server:
initializeServer();
