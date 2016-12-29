import React from "react";

import StoresLot from "../stores/StoresLot.js";
import ShowList from "./ShowList.jsx";

function getStateFromFlux(){
	return {
			isLoading: StoresLot.isLoading(),
			Lots: StoresLot.getLots(),
			imgName: null
	}
}



class Search extends React.Component {
	constructor(props){
		super(props)
		this.state = getStateFromFlux()
	}
	componentDidMount(){

		 StoresLot.addChangeListener(()=> {this._onChange()}); 
	}
	componentWillUnmount(){
		StoresLot.removeChangeListener(()=> {this._onChange()})
	}

	// handleTextChange(event){
	// 	this.setState({text:event.target.value});
	// }

	render(){
		return(
			<div>

			<div>
				<input type="text" onChange={this._onChange.bind(this)}/>
			</div>
				{
				
					this.state.Lots.map((item) => {
						let [first = " потрібно дабавити path {filename and mimetype}"] = item.imgPath       //imgPath[0].filename
						
						return (
							<ShowList 
									  key        	=	{item.id}
									  id         	=  {item.id}
									  name       	=	{item.name}
									  description	=  {item.description}
									  text       	=	{item.text}
									  img        	=	{item.imgPath}
									  userInfo   	=	{item.userInfo}
									  price      	=	{item.price}
									  category   	=  {item.category}
									  mainPhoto  	=  {first.filename}      
									  mainPhotoType =  {first.mimetype}
									  date          =  {item.date}
									  isLoading     =  {this.state.isLoading}
							/>
							)
						
					})
				
				}
			</div>
		)
	}

	_onChange(event){
		const text = event.target.value.toLowerCase()	
		this.setState({Lots: this._filter(text)})
		console.log(this.state.Lots)
	}

	_filter(el){
		return  StoresLot.getLots().filter((item)=>{  // NNNNNNNNNNNNNNNNNNNNNNNN
			const object = item.name.toLowerCase()
			return object.indexOf(el) !== -1;
		})
	}
}

export default Search;