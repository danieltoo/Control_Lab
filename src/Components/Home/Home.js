import React, { Component } from 'react'
import { BrowserRouter as Router,Route , Switch, Redirect  } from 'react-router-dom'
import firebase from "../../firebase"
import toastr from 'toastr'

import Navbar from '../Navbar'
import Side from '../Side'

import Ajustes from '../Ajustes/Ajustes'
import Horarios from '../Horarios/Horarios.js'
import Dashboard from '../Dashboard/Dashboard.js'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.userOn = this.userOn.bind(this)
    this.userOff = this.userOff.bind(this)
    this.state = {
      user : null
    }
  }
  componentDidMount() {
  	let user = firebase.auth().currentUser
  	this.setState({ user })
  	
  }
  userOn () {
  	return(
  		<div>
			<Side email={this.state.user.email}/>
		</div>
  		)
  }
  userOff () {
  	return(
  		<span className="white-text email REGULAR">
			No tiene Email
		</span>
  		)
  }
  render() {
    return (
    	<Router>
	     <div>
			    <div>
			    	<Navbar user={this.state.user} />
			    	{this.state.user ? this.userOn() : this.userOff()}
			    	<main>
              
			    		<Redirect to="/dashboard"/>
		    			<div>
			    			<Switch>
			    				<Route exact path="/dashboard" component={Dashboard}/>
			    				<Route exact path="/horarios" component={Horarios}/>
			    				<Route exact path="/ajustes" component={Ajustes}/>
			    			</Switch>
		    			</div>
			    	</main>
			    </div>
          
			</div>  
        </Router>  
      )
  }
}
/*
<a className="btn" onClick={() =>{ 
                toastr.options = {
                  "positionClass": "toast-top-right",
                  "showDuration": "300",
                  "hideDuration": "1000"
                }
               toastr.success('Cambio realizado')
              }}>Hola</a>*/