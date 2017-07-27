import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router,Route , Switch, Redirect  } from 'react-router-dom'

import CambiosLabF1 from './Labs/CambiosLabF1.js'
import CambiosLabF2 from './Labs/CambiosLabF2.js'
import CambiosLabF3 from './Labs/CambiosLabF3.js'
import CambiosLabF4 from './Labs/CambiosLabF4.js'
import CambiosLabF5 from './Labs/CambiosLabF5.js'

export default class CambiosHorarios extends Component{
	render() {
		return(
			<Router>
				<div className="row">
					<ul className="pagination center">
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/update_horario/F1">F1</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/update_horario/F2">F2</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/update_horario/F3">F3</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/update_horario/F4">F4</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/update_horario/F5">F5</NavLink></li>
					</ul>
				      <Redirect to="/update_horario/F1"/>
					<Switch>
						<Route exact path="/update_horario/F1" component={CambiosLabF1}/>
						<Route exact path="/update_horario/F2" component={CambiosLabF2}/>
						<Route exact path="/update_horario/F3" component={CambiosLabF3}/>
						<Route exact path="/update_horario/F4" component={CambiosLabF4}/>
						<Route exact path="/update_horario/F5" component={CambiosLabF5}/>
					</Switch>
				</div>
			</Router>
			)
	}
}