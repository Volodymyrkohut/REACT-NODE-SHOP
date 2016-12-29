import React from "react";
import {Link} from "react-router";

class ShowList extends React.Component {
	constructor(props){
		super(props)
	} 
	_checkType(check){
		// const jimp = check.split("/")[1];
		if(check ==  "image/jpeg" ){
			return ".jpg"
		}else if (check == "image/png" || check == "")
			return ".png";
		else{
			return null;
		}
	}



	render(){
		const { id,name,description,text,img,userInfo,price,category,mainPhoto,mainPhotoType,date, isLoading} = this.props
		return (
				<div>
					 	<p> Категрія: {category} </p>
					 	<Link to={"/category/"+ category + "/"+ id}> {name}</Link>
						{
							this.props.isLoading  //якщо дані ще не прийшли на сервер то ( загрузка) 
							?
							<img src="images/loading/loading.gif"/>
							:
							<img src={"images/uploads/mini/" + (mainPhoto  + this._checkType(mainPhotoType || "")) || "img.png" }/>
						} 
				
					
						<p> Короткий опис: {description}</p>
				 		<p> {category}</p>
						<p> ціна: {price}</p>
						<p> Дата добавлення {date}</p>
	
				</div>
				
			)
	}
}


export default ShowList;
