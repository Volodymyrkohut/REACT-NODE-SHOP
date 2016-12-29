var Sell = require("../db/schemaSell.js");
var Jimp = require("jimp");
var multer = require("multer");
var upload = multer({dest:"../public/images/uploads/origine"});
var fs = require("fs");

module.exports = function (app){

app.get("/api/list",(req,res,next)=>{
	Sell.find().then((data) => {
		// res.json(data);
		res.send(data)
	})
});

//image/jpeg// parese
function check (mimetype){
	if(mimetype.split("/")[1] == "png"){
		return ".png";
	}
	else if (mimetype.split("/")[1] == "jpeg" || mimetype.split("/")[1] == "jpg"){
		return ".jpg";
	}
	else {
		return "";
	}
}


app.post("/api/list", upload.array("img",10), (req,res,next) => {
	
	console.log("LOG FILE  ", req.files)
	const {price, category,name,description,text,imageURL } = req.body;
	
	console.log("REQ BODY  ", req.body)
	const sell = new Sell ({
		category:category,
		name:name,
		description:description,
		mainText:text,
		imageURL: req.files,
		price:price,
		userInfo:{
			tel:"+380502868023",
			nameUser:"Вова",
			mail:"vasa@gmail.com"
		}
	})
	
		sell.save((err,data)=>{
			console.log(data);
			res.send(data)                        // не забувати відправляти  на клієнт!!!
		})
//Переіменовуємо  картинки
		req.files.map((item)=>{
		var _check = check(item.mimetype);
			fs.rename(item.path, item.path + _check,function (err,data){
				console.log("done");
//використати asinc			
			//клонуємо і міняємо розширення картинок	
			Jimp.read("../public/images/uploads/origine/" + item.filename +  _check, function (error, mini){
				if(error) throw error;
				let { height,width } = mini.bitmap
				
				function algo (h){
					var	result = Math.round( height / h )
					return Math.round(width / result);
				}


				mini.resize(algo(100),100)
				.quality(60)                                      //якість
				.write("../public/images/uploads/mini/" + item.filename +  _check); // save
			})

		})/////////


		})

	
});

}


/*


var Sell = require("../db/schemaSell.js");
var Jimp = require("jimp");
var multer = require("multer");
var upload = multer({dest:"public/images/uploads/origine"});
var fs = require("fs");

module.exports = function (app){

app.get("/api/list",(req,res,next)=>{
	Sell.find().then((data) => {
		res.json(data);
	})
});


function check (mimetype){
	if(mimetype.split("/")[1] == "png"){
		return ".png";
	}
	else if (mimetype.split("/")[1] == "jpeg" || mimetype.split("/")[1] == "jpg"){
		return ".jpg";
	}
	else {
		return "";
	}
}


app.post("/api/list", upload.array("img",10), (req,res,next) => {
	
	console.log("LOG FILE  ", req.files)
	const { category,name,description,mainText,imageURL } = req.body;
	

	const sell = new Sell ({
		category:"ssa",
		name:"sss",
		description:"sadas",
		mainText:"asdasd",
		imageURL: req.files,
		userInfo:{
			tel:"sadsa",
			nameUser:"asdas",
			mail:"asa dsa dasdas"
		}
	})
	
		sell.save((err,data)=>{
			console.log(data);
		})
//Переіменовуємо  картинки
		req.files.map((item)=>{
		var _check = check(item.mimetype);
			fs.rename(item.path,  item.path + _check,function (err,data){
				console.log("done");
//використати asinc			
	//клонуємо і міняємо розширення картинок	
			Jimp.read("public/images/uploads/origine/" + item.filename +  _check, function (error, mini){
				if(error) throw error;
				let { height,width } = mini.bitmap
				
				function algo (h){
					var	result = Math.round( height / h )
					return Math.round(width / result);
				}


				mini.resize(algo(100),100)
				.quality(60)                                      //якість
				.write("public/images/uploads/mini/" + item.filename +  _check); // save
			})

		})/////////


		})

	res.end()
});

}






*/