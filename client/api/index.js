import axios from "axios";
const link = "http://localhost:8080/api/list";


	 window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '116142318874381',
	      xfbml      : true,
	      version    : 'v2.8'
	    });
	    FB.AppEvents.logPageView();
	  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));






export default {
	listGoods (){
		return axios.get("http://localhost:8080/api/list");
	},
	createGoods(data){
		return axios.post("http://localhost:8080/api/list",data);
	},
	OAuth(){
		// return axios.get("http://localhost:8080/auth/facebook");
	    return new Promise((resolve, reject) =>{
	  		 FB.login((response)=>{
	   			 	if(response.status === 'connected'){
	   			 		resolve(response)
	   			 	}else{
	   			 		reject(response.status)
	   			 		console.log("fatal")
	   			 	}
	   		})
	  	})

	    FB.api("/",'GET', {fields: 'first_name'},function (data){
	    	console.log("DATA",data)
	    })


	}

}

//https://www.youtube.com/watch?v=x_gLILTRD_k