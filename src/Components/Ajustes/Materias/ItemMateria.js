import React, { Component } from 'react';

export default class ItemMateria extends Component{
	constructor(props) {
		super(props);
		this.seleccionar = this.seleccionar.bind(this)
	}
	seleccionar (){
		this.props.seleccion(
			this.props.mate.clave,
			this.props.mate.nombre,
			this.props.mate.semestre,
			this.props.mate.carrera 
		)
	}

	render() {
		return(
			<tr onClick={this.seleccionar}>
				<td className="col l1">
					{this.props.mate.clave}
				</td>
				<td className="col l4">
					{this.props.mate.nombre}
				</td> 
				<td className="col l4">
					{this.props.mate.carrera}
				</td>
				<td className="col l1">
					{this.props.mate.semestre}
				</td>
			</tr>
			)
	}
}