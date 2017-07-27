import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Side extends Component {

	render() {
		return (
		<ul id="slide-out" className="side-nav fixed" style={{marginTop:64}}>
			<li><a className="subheader center">{this.props.email}</a></li>
			<li><div className="divider"></div></li>
		    <li><NavLink to="/horarios"><i className="material-icons">assignment</i>Registrados</NavLink></li>
		    <li><a href="#!"><i className="material-icons">date_range</i>Relación por semana</a></li>
		    <li><a href="#!"><i className="material-icons">account_circle</i>Asistencia docentes</a></li>
		    <li><a href="#!"><i className="material-icons">query_builder</i>Horas por semana</a></li>
		</ul>
			)
	}
}