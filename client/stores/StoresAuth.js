import { EventEmitter } from "events";
import AuthDispatcher from "../dispatcher/AuthDispatcher.js";
import Constants from "../constants/Constants.js";

const CHANGE_EVENT = "change";

let _user = {};
let _loadingError = null;
let _isLogIn = true;


const Store = Object.assign({},EventEmitter.prototype,{
	isLoading(){
		return _isLogIn;
	},
	login(){
		return _user;
	},
	emitChange(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener(callback){
		
		this.on(CHANGE_EVENT,callback);
	},
	removeChangeListener(callback){
		console.log("cash is clear")
		this.removeListener(CHANGE_EVENT,callback);
	}

});

AuthDispatcher.register((action) => {
	switch(action.type){
		case Constants.LOAD_AUTH_REQUEST:{
			_isLogIn = true
			Store.emitChange();
			break;
		}
		case Constants.LOAD_AUTH_SUCCESS:{
				_isLogIn = false
				_user = action.userInfo
				_loadingError = null
				
			break;
		}
		case Constants.LOAD_AUTH_FAIL:{
			_loadingError = action.error;
			Store.emitChange();
			break;
		}
		default:{
			console.log("logout")
		}
	}
});

export default Store;
