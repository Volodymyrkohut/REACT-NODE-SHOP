import React from "react";

class Image extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		console.log(this.props.handleClick)
		return(
			<img src={this.props.imgPath} onClick={this.props.handleClick}/>
			)
	}
}

export default Image;