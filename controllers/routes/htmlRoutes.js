//COMMONG VARIABLES ON THE ROUTES PAGE
var homeController = require('../home');
var products = db.ITEMS;
var users = db.user;
<<<<<<< HEAD
=======
var Images = db.Images;
var Cart = require('../../cart_model/cart');

var cartHelper = {
  add: function(cart, item, id) {
     var storedItem = cart.items[id];
     if (!storedItem) {
         storedItem = cart.items[id] = {item: item, qty: 0, price: 0};
     }
     storedItem.qty++;
     storedItem.price = storedItem.item.price * storedItem.qty;
     cart.totalQty++;
     cart.totalPrice += storedItem.item.price;
     //plus shipping
     cart.plusShipping = cart.totalPrice + 5;
      
     //
  },
  generateArray : function(cart) {
     var arr = [];
     for (var id in cart.items) {
         arr.push(cart.items[id]);
     }
     return arr;
  }
};

>>>>>>> c944a0a8513b0939e3106fe71ea1eea486ff5e99


module.exports = function(app) {
  app.get('/', homeController.renderHome);
 

// render the index page 
	app.get('/', function(req, res) {
	    res.render('index');
	});
	// render the about page 
	app.get('/about', function(req, res) {
	    res.render('about');
	});
	//render the cart page 
	app.get('/cart', function(req, res) {
<<<<<<< HEAD
	    res.render('cart');
	});
=======
    console.log('session', req.session);
    //render req.session
    var CartTotals = req.session;
    //
    var cart = req.session.cart || new Cart();
    req.session.cart = cart;    
    var cartItems = cartHelper.generateArray(cart);
    cartItems.forEach(function(item) {
      console.log('item', item);
    });
    res.render('cart', {
      cartItems: cartItems,
      //render req.session
       CartTotals: CartTotals
       //

    });
  });
>>>>>>> c944a0a8513b0939e3106fe71ea1eea486ff5e99
	// render the contact page 
	app.get('/contact', function(req, res) {
	    res.render('contact');
	});
	// render the signin page. 
	app.get('/signin', function(req, res) {
	    res.render('signin');
	});

	//create a login route to ensure that customers are able to sign in. 
	app.post('/signin/existing',function (req,res){
		var cred = req.body;
		console.log(cred.username);

		users.findOne({
			where:{
				user_name: cred.username
			}
		}).then(function(data){
			// store user information in local storage
			console.log(data);
			req.session.user = data;
			res.redirect('/products');

		})
	});
	// register information 
	app.post("/signin/new",function(req,res){
		console.log('post');
		console.log(req.body);

		users.create({
			user_name: req.body.username,
			email: req.body.email,
			password: req.body.password,
			street_name: req.body.address,

			// zip:req.body.zipCode
		}).then(function(data){
			req.session.user = data;
			console.log('session user', req.session.user);
			res.redirect('/products');
		})

	})
	// Display the products page using the find all function to read oru sequelize DB
	app.get('/products', function(req, res) {
			console.log('session', req.user);
			products.findAll({
<<<<<<< HEAD
				 
=======
				 include: [{model: Images, required:true}]
>>>>>>> c944a0a8513b0939e3106fe71ea1eea486ff5e99
			}).then(function(data){
				// the query we are looking for in each div
				console.log(req.session.user);
				res.render("products",{
					products: data
				});
			});
	});
	 app.get('/testimonials', function(req, res) {
      res.render('testimonials');
    });

<<<<<<< HEAD
	app.get('/products/:product', function(req, res) {
     var item = req.params.product;
     console.log(item);
     products.findOne({
           where: {
              product: item
           }
     }).then(function(data) {
         console.log('product Data' + data);
=======
	 // routes to the cart
  app.get('/add-to-cart/:id', function(req, res) {
  var productId = req.params.id;
  var cart = req.session.cart || new Cart();
  req.session.cart = cart;
  console.log('first cart', req.session.cart);

  products.findOne({
           where: {
              id: productId
           },
           include: [{model: Images, required:true}]
     }).then(function(product) {
         console.log('cart', cart);
         cartHelper.add(cart, product, product.id);
         console.log("HERE IS WHAT IN THE session CART", req.session.cart);
         res.redirect('/cart');
     });
  })

	//sets express engin for each product handlebars
  app.get('/products/:product', function(req, res) {
     var item = req.params.product;
     products.findOne({
           where: {
              product: item
           },
           include: [{model: Images, required:true}]
     }).then(function(data) {
          console.log('product', data);
>>>>>>> c944a0a8513b0939e3106fe71ea1eea486ff5e99
          res.render('product', {
            product: data
          });
     });
<<<<<<< HEAD
	});
=======

  });




>>>>>>> c944a0a8513b0939e3106fe71ea1eea486ff5e99

	
};

