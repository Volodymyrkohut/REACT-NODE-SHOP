var passport = require("passport")
var FacebookStrategy = require("passport-facebook").Strategy;
// var User = require("../db/PassportSchema.js")
var request = require("request");

module.exports = function (app){

	var cookieParser = require("cookie-parser")
	var session = require("express-session")
		app.use(cookieParser())
		app.use(session({
			secret: "da illest developer",
			resave: true,
			saveUnintialized: true
		}));


	 app.use(passport.initialize())
	 app.use(passport.session())

	 passport.serializeUser(function (user,done) {
	 	done(null,user);
	 });
	 passport.deserializeUser(function(obj,done){
	 	done(null,obj)
	 })
															

	 passport.use(new FacebookStrategy({
		clientID: "116142318874381",
		clientSecret: "5425f70fc5d540d69f141e8e546e690e",
		callbackURL: "http://localhost:8080/auth/facebook/callback",
		profileFields: ['emails','displayName', 'photos','gender','name','id','cover']
	},
	function (accessTooken, refreshToken, profile, callback){
		process.nextTick(function () {
			return callback(null,{profile: profile, accessTooken: accessTooken })
		})
	}
	));

app.get("/auth/facebook",passport.authenticate('facebook',{scope: ['email'] }));  //public_profile

// app.get("/gifs",function (req,res){
// 	request("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC",function(err,data,body){
// 		res.send(body)
// 	})
// })
	

app.get('/auth/facebook/callback', 
    passport.authenticate( 'facebook', { 
        successRedirect: '/profile',
        failureRedirect: '/'
}));

	// app.get("/auth/facebook/callback",passport.authenticate('facebook',{
	// 	successRedirect: "/profile",
	// 	failureRedirect: "/"
	// }))


		app.get("/profile",ensureAuthenticated,function (req,res,next){
			res.send(req.user)
			// console.log(req.user)
			// User.find({},function(error,data){
				// res.json(req.user)
			// })
		})
		function ensureAuthenticated(req, res, next) {
 			 if (req.isAuthenticated()) { return next(); }
 			 res.redirect('/');
		}
}


/*
function authenticateFacebook (req, res, next) {
    session.returnTo = '/#' + req.query.returnTo; 
	    next () 
}

You can use passport-facebook-token passport strategy instead of passport-facebook.

In this way you would get the token on the client-side and send it to the application using:

app.post('/auth/facebook/token',
    passport.authenticate('facebook-token'),
    function(req, res) {
        // do something with req.user
        res.send(req.user ? 200 : 401);
    }
);
The code above tries to find the token in GET /auth/facebook/token?access_token=<TOKEN_HERE>, in the HTTP header access_token and in the request body.

Source (Stackoverflow)
http://stackoverflow.com/questions/37899157/can-i-use-passport-js-and-client-side-facebook-authentification



*/



















/*
http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/#.WEsLj4qg_cs
passport.authenticate('basic', { session: false });
*/


		// User.findOne({ id : profile.id },function(error, data){
		// 	if(error){ console.log("1",error)}
		// 	else{
		// 		if(data === null){
		// 			console.log("3",error)
		// 			const {displayName,photos,gender,emails,id} = profile;
		// 			var user = new User({
		// 				name:displayName,
		// 				photo:photos[0].value,
		// 				gender: gender,
		// 				id:id,
		// 				mail:emails[0].value ? emails[0].value : "у мене немає пошти",
		// 				Token: accessTooken
		// 			})
		// 			user.save(function (error){
		// 				console.log("4",error)
		// 				if(error){
		// 					console.log("err", error)
		// 				}
		// 				  callback(null,data)
		// 			})
		// 		}else{
		// 			return callback(null,data)
		// 		}
		// 	}
		// })


/*



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "platformToken, Authorization, Content-Type,Content-Length, cache-control, X-Requested-With, postman-token");
  res.header("Access-Control-Allow-Methods", "DELETE, HEAD, GET, OPTIONS, POST, PUT");

  if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }

});

*/