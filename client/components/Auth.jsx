import React from "react";

import FacebookLogin from "../actions/ActionsAuth.js"

class Auth extends React.Component{
	constructor (props){
		super(props)	
	}

	render(){
		return (
			<button onClick={this._handleLogin.bind(this)}>Log in with Facebook</button>
			)
	}

	_handleLogin(){
		FacebookLogin.login()
	}

}


export default Auth




/*
REACT FACEBOOK LOGIN

import React from 'react';
import FacebookLogin from 'react-facebook-login';
 
class Auth extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      	session: false
      }
  };
 
  responseFacebook(response){
    console.log(response)
  }
 
  render() {
    return (
      <FacebookLogin
      	    appId="116142318874381"
        	fields="name,email,picture,gender,cover"
        	callback={this.responseFacebook}
      />
    )
  }
}
 
export default Auth; 
//autoLoad={true}
//scope="public_profile,user_friends,user_actions.books"



*/