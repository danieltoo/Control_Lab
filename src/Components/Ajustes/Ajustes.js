import React, { Component } from 'react';

import { NavLink, BrowserRouter as Router,Route , Switch, Redirect  } from 'react-router-dom'



import CambiosDocentes from './Docentes/CambiosDocentes.js'
import CambiosMateria from './Materias/CambiosMateria.js'
import CambiosHorarios from './Horarios/CambiosHorarios.js'


export default class Ajustes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null
    }
  }
  render() {
    return (
    	<Router>
	    	<div className="row"> 
    			
			    <div className="fixed-action-btn">
				    <a className="btn-floating btn-large red">
				      <i className="large material-icons">settings</i>
				    </a>

				    <ul>
					    <li className="btn-floating red">
					      	<NavLink to='/update_docente' >
					      		<i className="material-icons">people</i>
					      	</NavLink>
					    </li>
					    <li className="btn-floating yellow">
					      	<NavLink to='/update_materia'>
					      		<i className="material-icons">import_contacts</i>
					      	</NavLink>
					    </li>
					    <li className="btn-floating blue">
					    	<NavLink to='/update_horario'>
					    		<i className="material-icons">access_time</i>
					    	</NavLink>
					    </li>
				    </ul>
				</div>



				<div className="col l12 m12">
					<Redirect to="/update_horario"/>
					<Switch>
				    	<Route exact path="/update_docente" component={CambiosDocentes}/>
				    	<Route exact path="/update_materia" component={CambiosMateria}/>
				    	<Route exact path="/update_horario/" component={CambiosHorarios}/>
					</Switch>

				</div>
				
			</div>
		</Router>
      )
  }
}