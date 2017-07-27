import React, { Component } from 'react';

export default class ItemDocente extends Component{
	constructor(props) {
		super(props);
		this.seleccionar = this.seleccionar.bind(this)
	}
	seleccionar (){
		this.props.seleccion(this.props.doce.rfc,this.props.doce.nombre,  this.props.doce.titulo, )
	}

	render() {
		return(
			<tr onClick={this.seleccionar}>
				<td className="col l2">
					{this.props.doce.rfc}
				</td>
				<td className="col l2">
					{this.props.doce.titulo}
				</td> 
				<td className="col l6">
					{this.props.doce.nombre}
				</td>
			</tr>
			)
	}
}