import React from "react";
import { Link } from "react-router";
import Auth from "./Auth.jsx";

class App extends React.Component{
	constructor(props){
		super(props)
	}	
render(){
	return (
			<div>
				<Link to="/about" >Про нас</Link>
				<Link to="/category">Категорії товарів</Link>
				<Link to="/create">Добавити свій лот</Link>
				<Auth />
				<div>
					{this.props.children}
				</div>

			</div>
		)
	}
}
export default App