import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import firebase from '../firebase'
import logo from '../logo.svg'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleAuth = this.handleAuth.bind(this)
    this.state = {
      user : null
    }
  }

  handleAuth (){
    let email = ReactDOM.findDOMNode(this.refs.email).value
    let password = ReactDOM.findDOMNode(this.refs.password).value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Se inició sesión")
    }).catch((error) => {
      console.log(error.message)
    });
  }
  
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  render() {
     return (
      <div className="container">
        <div className="row center-align">
          <div className="col l4 m6 s12  offset-l4 offset-m3 card blue darken-2">
            <h4 className="white-text" style={{fontFamily: 'Lobster'}}><img alt="" className="circle" src={logo} style={{width:35,height:30}}/>Control-Lab<img alt="" className="circle" src={logo} style={{width:35,height:30}}/></h4>
            <input type="text" ref="email" placeholder="Usuario" name="email" className="white"/>
            <input type="password" placeholder="Contraseña" ref="password" name="password" className="white"/>
            <a className="btn red" onClick={this.handleAuth}>Iniciar</a>
            <br/><br/>
             Puedes probarlo con: <br/>sistemas@itcuautla.edu.mx<br/>
        password : sistemas
          </div>

        </div>

      </div>
      )
  }
}
