const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/sell");

const Facebook = mongoose.Schema({
	name: 	{type:String},
	photo: 	{type:String},
	mail: 	{type:String},
	gender: {type: String},
	id: 	{type:String},
	Token:  {type:String}
});

var Passport = mongoose.model("Passport",Facebook);

module.exports = Passport;