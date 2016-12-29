import { EventEmitter } from "events";
import Dispatcher from "../dispatcher/Dispatcher.js";
import Constants from "../constants/Constants.js";

const CHANGE_EVENT = "change";

let _lots = [];
let _loadingError = null;
let _isLoading = true;


function formLot(note){
	return {
		id: note._id,
		
		name:note.name,
		description: note.description,
		category:note.category,
		price:note.price,
		text:note.mainText,
		userInfo:note.userInfo,
		imgPath:note.imageURL,
		date:note.date
	};
}

const TasksStore = Object.assign({},EventEmitter.prototype,{
	isLoading(){
		return _isLoading;
	},
	getLots(){
		return _lots;
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

Dispatcher.register((action) => {
	switch(action.type){
		case Constants.LOAD_LOT_REQUEST:{
			_isLoading = true
			TasksStore.emitChange();
			break;
		}
		case Constants.LOAD_LOT_SUCCESS:{
			_lots = action.lots.map(formLot)
			_loadingError = null
				_isLoading = false
				console.log(_isLoading)
			break;
		}
		case Constants.LOAD_LOT_FAIL:{
			_loadingError = action.error;
			TasksStore.emitChange();
			break;
		}
		case Constants.CREATE_LOT_SUCCESS:{
			const newLot = formLot(action.oneLot)
			_lots.push(newLot)
			break;
		}

		default:{
			console.log("No such handler")
		}
	}
});

export default TasksStore;
