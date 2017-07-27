import React, { Component } from 'react';
import VistaHorasDias from './VistaHorasDias.js'

export default class VistaHoras extends Component{
	constructor(props) {
		super(props);
		this.state = {
			dias :[ 
				"Lunes",
				"Martes",
				"Miercoles",
				"Jueves",
				"Viernes"
			]
		}

	}
	

	render() {
		return (
			<tr className="white">
				    <td className="col s2">
				    	<br/>
				        <div><strong>{this.props.hora}</strong></div>
				        <br/>
			        </td>
			        {
			        	this.state.dias.map(dia => (
			        		<VistaHorasDias key={dia} dia={dia} lab={this.props.lab} hora={this.props.hora}/>
			        	))
			    	}
			</tr>

			)
	}
}