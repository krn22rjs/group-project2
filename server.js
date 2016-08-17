//Call Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var app = express();
/*var Images = require('./models')['Images'];
Images.sync();
require('dotenv').config();*/


// require('dotenv').config();

//Route config 
var htmlRoutes = require('./controllers/routes/htmlRoutes');
var apiRoutes = require('./controllers/routes/apiRoutes');

// db
global.db = require('./models');

///--- sync everything---
var models  = require('./models');
var sequelizeConnection = models.sequelize;

sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

// make our tables
// note: force:true drops the table if it already exists---{force: true}
.then(function(){
  return sequelizeConnection.sync()
});
//---sync everything---


var Images = require('./models')['Images'];
var Users = require('./models')['user'];
var Items = require('./models')['ITEMS'];
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
app.get('/productInfo', function(req, res) {
    res.render('productinfo');
});

//sets express engin for each product handlebars
app.get('/products/:product', function(req, res) {
     var product = req.params.product;
     Items.findOne({
           where: {
              product: product
           },
           include: [{model: Images, required:true}]
     }).then(function(product) {
          console.log('product', product);
          res.render('product', {
            product: product
          });
     });

});

//set the port connection. Either heroku or local host 
var port = process.env.PORT || 3000;


// Launch server  
app.listen(port, function() {
    console.log("Connected to " + port);
})

