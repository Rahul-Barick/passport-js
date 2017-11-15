var mongoose = require('mongoose');

var Coffeeschema = new mongoose.Schema({
	name : String,
	type : String,
	quantity: Number
});

module.exports = mongoose.model('Coffee',Coffeeschema)