//--harmony node --harmony-async-await app.js 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.options('*', cors());
// app.use(express.methodOverride());

/*

res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

*/
app.use(cors({origin:"*"}) )
 app.get("/",function (req,res){
	res.sendFile(__dirname + "/index.html");
})

require("./controllers/loginFacebook.js")(app);
require("./controllers/sell.js")(app);

app.listen(8080,()=>{
	console.log("server listening on port 8080");
})


//enctype="multipart/form-data"
