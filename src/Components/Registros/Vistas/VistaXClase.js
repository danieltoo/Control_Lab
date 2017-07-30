import React, { Component } from 'react'

export default class VistaXClase extends Component {
	render() {
		return(
			<tr>
				<td>{this.props.clase.dia}</td>
				<td>{this.props.clase.hora}</td>
				<td>{this.props.clase.lab}</td>
				<td>{this.props.clase.clave} {this.props.materias[this.props.clase.clave]}</td>
				<td>{this.props.docentes[this.props.clase.rfc]}</td>
				<td>{this.props.clase.tiempos.entrada}</td>
				<td>{this.props.clase.tiempos.salida}</td>
			</tr>
		)
	}
}