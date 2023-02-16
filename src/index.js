const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const exphbs = require('express-handlebars');
const route = require('./routes/index.router.js');
const db = require('./config/connectDB/index.js');

// connectDB
db.connect();

// static 
app.use(express.static(path.join(__dirname, 'public')));

// route inital
route(app);

// handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})