const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sell");

const schemaSell = mongoose.Schema({
	category:{
		type:String,
		require: true
	},
	name:{
		type: String,
		require: true
	},	
	description:{
		type:String,
		require: true 
	},
	mainText:{
		type:String,
		require: true
	},
	imageURL:{
		type:Array,
		require: true
	},
	price:{
		type:String,
		require:true
	},
	date:{
		type: Date,
		default: Date.now
	},
	userInfo:{
		tel:String,
		nameUser:String,
		mail:String
	}
});


var Sell = mongoose.model("Sell",schemaSell);


module.exports = Sell;