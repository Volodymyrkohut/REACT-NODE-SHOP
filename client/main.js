import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import About from "./components/About.jsx";
import Category from "./components/Category.jsx";
import List from "./components/List.jsx";
import Goods from "./components/Goods.jsx";
import Search from "./components/Search.jsx";
import Create from "./components/Create.jsx";
import { Router, Route, hashHistory } from "react-router";
import ActionsLot from "./actions/ActionsLot.js";
ActionsLot.loadLot(func)

function func(){

ReactDOM.render(
<Router  history={hashHistory}>
	<Route path="/" component={App} >
		<Route path="/about" component={ About } />
		<Route path="/create" component={ Create }/>
		<Route path="/category" component={ Category }>
			<Route path="/category/:listID" component={ List }/>
			<Route path="/category/:listID/:goodsID" component={ Goods }/>
		</Route>
	</Route>	
</Router>,

document.getElementById("content")
)
}



// в ровті записуємо onEnter={requireAuth}
// function requireAuth(nextState, replace) {
// 	if (!Session.isLoggedId()) {
// 		replace({
// 			pathname: "/login",
// 			state: {nextPathname: nextState.location.pathname}
// 		})
// 	}
// }