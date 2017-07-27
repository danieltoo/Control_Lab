import React, { Component } from 'react';
import firebase from './firebase'


/*Importa los componentes hijos*/

import Login from './Components/Login'
import Home from './Components/Home/Home'




class App extends Component {
  constructor(props) {
    super(props);
    this.userOn = this.userOn.bind(this)
    this.userOff = this.userOff.bind(this)
    this.state  = {
      user : null
    }

  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }
  userOff(){
    return (<Login/>)
  }
  userOn(){
    return (<Home/>)
  }
  render() {
    return (
      <div>
        {this.state.user ?  this.userOn() : this.userOff()}
      </div>
      )
  }

}










export default App;
