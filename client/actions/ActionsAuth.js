import AuthDispatcher from "../dispatcher/AuthDispatcher.js";
import Constants from "../constants/Constants.js"
import Api from "../api";

const Facebook = {
		login(){
			AuthDispatcher.dispatch({
				type: Constants.LOAD_AUTH_REQUEST
		}),
			
			Api.OAuth().then((data)=>{
				console.log("dataaaaaaaaaaa ",data)
				AuthDispatcher.dispatch({
					type: Constants.LOAD_AUTH_SUCCESS,
					userInfo: data
				})
				

			}).catch((err)=>{
				AuthDispatcher.dispatch({
					type: Constants.LOAD_AUTH_FAIL,
					error:err
				})
			})
	}
}

export default Facebook
