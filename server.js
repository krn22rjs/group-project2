//Call Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var app = express();
// require('dotenv').config();

// set up preserver work 
var app = express();
//allows access to complete public domain
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
// sets express engine to handlebars and sets the default handlebar page to main
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/about', function(req, res) {
    res.render('about');
});
app.get('/cart', function(req, res) {
    res.render('cart');
});
app.get('/contact', function(req, res) {
    res.render('contact');
});
app.get('/signin', function(req, res) {
    res.render('signin');
});
app.get('/products', function(req, res) {
    res.render('products');
});
app.get('/search', function(req, res) {
    res.render('search');
});


//set the port connection. Either heroku or local host 
var port = process.env.PORT || 3000;


// Launch server  
app.listen(port, function() {
    console.log("Connected to " + port);
})