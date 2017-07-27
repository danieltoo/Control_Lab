import React, { Component } from 'react';
import firebase from '../firebase'
import { NavLink } from 'react-router-dom'
import logo from '../logo.svg'


export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user : false
		}
	}
	handleLogout(){
	    firebase.auth().signOut()
	      .then(() =>{
	       console.log('te has deslogeado')
	      })
	      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))
  	}
  	componentDidMount() {

  		let user = firebase.auth().currentUser
  		console.log(user.uid)
  		let t = this
  		firebase.database().ref('/admin')
  			.once('value').then(function(snapshot) {
		  		if (snapshot.val() === user.uid) {
		  			t.setState({user : true})
		  		}
			});
		  		 
  	}	
  	isAdmin(){
  		return(
		  	<li><NavLink to="/ajustes"><i className="material-icons left">settings</i>Ajustes</NavLink></li>
  			) 		
  	}
	render() {
		return (
			<header id="header" className="page-topbar">
				<div className="navbar-fixed" >
					<nav>
					    <div className="nav-wrapper blue darken-2">
					      <NavLink to="/dashboard" className="brand-logo" style={{fontFamily: 'Lobster'}}><img alt="" className="circle" src={logo} style={{width:35,height:30}}/>Control-Lab<img alt="" className="circle" src={logo} style={{width:35,height:30}}/></NavLink>
					      <ul className="right hide-on-med-and-down">
					        <li><NavLink to="/horarios" ><i className="material-icons left">query_builder</i>Horarios</NavLink></li>
					        {
					        	this.state.user===true ? 
					        	this.isAdmin() :
					        	() => (<li></li>)
					        }
					        <li><a href="" onClick={this.handleLogout.bind(this)}><i className="material-icons left">exit_to_app</i>Salir</a></li>
					      </ul>
					    </div>
					</nav>
				</div>
			</header>
		)
	}	
}