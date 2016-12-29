import Dispatcher from "../dispatcher/Dispatcher.js";
import Constants from "../constants/Constants.js"
import Api from "../api";

const LotActions = {
	loadLot(callback){
		Dispatcher.dispatch({
			type: Constants.LOAD_LOT_REQUEST
		}),
		Api.listGoods().then(({data})=>{
			Dispatcher.dispatch({
				type: Constants.LOAD_LOT_SUCCESS,
				lots: data
			})
			callback()
				
		}).catch((err)=>{
			Dispatcher.dispatch({
				type: Constants.LOAD_LOT_FAIL,
				error:err
			})
		})

	}
	,
	createLot(lot){

		Api.createGoods(lot).then(({data}) => {
			console.log("data",data)
			Dispatcher.dispatch({
				type:Constants.CREATE_LOT_SUCCESS,
				oneLot: data
			})
		}).catch((err)=>{
			Dispatcher.dispatch({
				type:Constants.CREATE_LOT_FAIL,
				error:err
			})
		})
		
	}
	//createLOT

}

export default LotActions
