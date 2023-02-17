const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const exphbs = require('express-handlebars');
const route = require('./routes/index.router.js');
const db = require('./config/connectDB/index.js');
var methodOverride = require('method-override')

// middleware
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// method-overide
app.use(methodOverride('_method'));

// connectDB
db.connect();

// static 
app.use(express.static(path.join(__dirname, 'public')));

// route inital
route(app);

// handlebars
app.engine('handlebars', exphbs({
  helpers: {
    sum: (a, b) => a + b
  }
})
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})