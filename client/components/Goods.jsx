import React from "react";
import Image from "./Image.jsx";
import StoresLot from "../stores/StoresLot.js";

function getStateFromFlux(props){

	return {
			isLoading: StoresLot.isLoading(),
			Lots: StoresLot.getLots().find((item) => { return item.id === props}),
			imgName: null
	}
}

class Goods extends React.Component {
	constructor(props){
		super(props)
		this.state = getStateFromFlux(this.props.params.goodsID)
	}
	componentDidMount(){

		 StoresLot.addChangeListener(()=> {this._onChange()}); 
	}
	componentWillUnmount(){
		StoresLot.removeChangeListener(()=> {this._onChange()})
	}
	
	render(){
		
		console.log(this.state.Lots)
		 const { id,name,description,text,imgPath,userInfo,price,category,date } = this.state.Lots  
		 const [first] = imgPath
		
		return (
			<div>
				<p>{category}</p>
				<p>{name}</p>
				<img src={"images/uploads/origine/" + ( this.state.imgName || ( first.filename + this._checkType(first.mimetype) ) ) }/>
				{
					imgPath.map((item)=>{
						const {filename, mimetype} = item;
						return (
							<Image 
								key={filename} 
								handleClick={this.handleClick.bind(this,filename + this._checkType(mimetype))} 
								imgPath={"images/uploads/mini/"+filename + this._checkType(mimetype)}/>
							)
					})
				}
				<p>{price}</p>	
				<p>{text}</p>
				<p>{date}</p>
				
			</div>
			)
	}
	
	handleClick(id){
		this.setState({imgName: id})
	}

	_onChange(){
		this.setState(getStateFromFlux(this.props.params.goodsID))
	}

	_checkType(check){
		// const jimp = check.split("/")[1];
		if(check ==  "image/jpeg" ){
			return ".jpg"
		}else if (check == "image/png")
			return ".png";
		else{
			return null;
		}
	}
}



export default Goods
