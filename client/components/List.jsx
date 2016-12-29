import React from "react";
// import Api from "../API";
 import ShowList from "./ShowList.jsx";
import StoresLot from "../stores/StoresLot.js";
import ActionsLot from "../actions/ActionsLot.js";

/////////////////TO DOOOOOOOOOOOO
const numLots = 3; // Кількість лотів в сторінці


class List extends React.Component {
	constructor(props){ //,context
		super(props) //,context
		this.state = {
			isLoading: StoresLot.isLoading(),
			Lots: StoresLot.getLots()
		}
	}

	componentDidMount(){ // why?
	// StoresLot.addChangeListener(()=> {this._onChange()});
	this._onChange()
	}

	componentWillUnmount(){
			StoresLot.removeChangeListener(()=> {this._onChange()})
	}
	componentWillReceiveProps(nextProps){	
		if(this.props.params.listID !== nextProps.listID) {
			 this._onChange();
		}
	}
	
	render(){
		// console.log(this.state.Lots)
		return (
			<div>

				<div>
					<input type="text" onChange={this._onChangeSearch.bind(this)}/>
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
				<ul>
				{
					this._pages().map((i)=>{
						return <li key={i + Date.now()}  onClick={this._onChange.bind(this, i*numLots-numLots, i*numLots )}>{i}</li>
					})		
				}
				</ul>
				
			</div>
		)
	}

//NAVIGATION PAGES	
	_pages(){
			 let  param = this.props.params.listID
		var num =  Math.ceil(this._filter(StoresLot.getLots(),param).length / numLots)
		var item = []
			for(var i=1; i<num + 1; i++){
				item.push(i)
		}
		return item;
	}

	_filter(array,category){
		return array.filter((item) => {
			return item.category == category
		})
	}


//  Відфільтровується по категоріях і виводиться  по 3 лоти(numLots)
_onChange(start = 0, finish = numLots){
	let  param = this.props.params.listID
	var item = [];
	for(var i=start; i < finish; i++){
		if( typeof this._filter(StoresLot.getLots(),param)[i] === "undefined"){
			continue  																				//якщо undefined то пропустити 
		}
	item.push(this._filter(StoresLot.getLots(),param)[i])
}
console.log(item)
		
		this.setState({
				isLoading: StoresLot.isLoading(),
				Lots: item		
			})
	}


	//FOR SEARCH

	_onChangeSearch(event){
		const text = event.target.value.toLowerCase()	
		this.setState({Lots: this._filterSearch(text)})
		console.log(this.state.Lots)
		 // this.context.router.push(`/category/${this.props.params.listID}`)
		// console.log(this.context.router.push(`/category/${this.props.params.listID}/search`))

	}

	_filterSearch(el){
		return  StoresLot.getLots().filter((item)=>{  // NNNNNNNNNNNNNNNNNNNNNNNN
			const object = item.name.toLowerCase()
			return object.indexOf(el) !== -1;
		})
	}
}

// List.contextTypes = {
//     router: React.PropTypes.object
// };
export default List;