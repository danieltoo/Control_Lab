import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router,Route , Switch, Redirect  } from 'react-router-dom'

import HorarioF1 from './Labs/HorarioF1.js'
import HorarioF2 from './Labs/HorarioF2.js'
import HorarioF3 from './Labs/HorarioF3.js'
import HorarioF4 from './Labs/HorarioF4.js'
import HorarioF5 from './Labs/HorarioF5.js'

export default class Horarios extends Component{
	render() {
		return(
			<Router>
				<div className="row">
					<ul className="pagination center">
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/horario/F1">F1</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/horario/F2">F2</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/horario/F3">F3</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/horario/F4">F4</NavLink></li>
					    <li className="waves-effect"><NavLink activeClassName="active red white-text" to="/horario/F5">F5</NavLink></li>
					</ul>
				      <Redirect to="/horario/F1"/>
					<Switch>
						<Route exact path="/horario/F1" component={HorarioF1}/>
						<Route exact path="/horario/F2" component={HorarioF2}/>
						<Route exact path="/horario/F3" component={HorarioF3}/>
						<Route exact path="/horario/F4" component={HorarioF4}/>
						<Route exact path="/horario/F5" component={HorarioF5}/>
					</Switch>
				</div>
			</Router>
			)
	}
}