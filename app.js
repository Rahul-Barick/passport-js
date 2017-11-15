var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var coffeeController = require('./controllers/coffee');
var userController = require('./controllers/user');
var authController = require('./controllers/auth')
mongoose.connect('mongodb://localhost:27017/coffeedb')

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended : true}));

app.use(passport.initialize());
 
router.route('/')
	.get(authController.isAuthenticated,coffeeController.emptyCoffee);
	
router.route('/coffee')
    .post(authController.isAuthenticated,coffeeController.postCoffees)
    .get(authController.isAuthenticated,coffeeController.getCoffees);

router.route("/coffee/:coffee_id")
    .get(authController.isAuthenticated,coffeeController.getCoffee)
    .put(authController.isAuthenticated,coffeeController.putCoffee)
    .delete(authController.isAuthenticated,coffeeController.deleteCoffee);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated,userController.getUsers)

app.use('/api',router);

app.listen(3000,function(){
    console.log("Hi i am up! ");    
});

