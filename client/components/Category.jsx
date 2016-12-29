import React from "react";
 import { Link } from "react-router";
import StoresLot from "../stores/StoresLot.js";
import ShowList from "./ShowList.jsx";

class Category extends React.Component{
	
//Закинути катигоріх в базу даних щоб можна було б додавати категорії
	render(){
		return(
			<div>

				<Link to="/category/kids">Дитячий світ</Link>
				<Link to="/category/bild">Нерухомість</Link>
				<Link to="/category/house">Дім і сад</Link>
				<Link to="/category/car">Транспорт</Link>
				<Link to="/category/job">Робота</Link>
				<Link to="/category/style">Мода стиль</Link>
				<Link to="/category/hobbi">хоббі</Link>
				<Link to="/category/electronic">Електроніка</Link>
				<Link to="/category/animal">Тварини</Link>
				<Link to="/category/bisenes">Бізнес</Link>
				
				
				
				<div>
					{this.props.children}
				</div>

			</div>
		)
	}
}

export default Category;
