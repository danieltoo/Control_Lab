import React, { Component } from 'react';
import VistaHoras from './Horas/VistaHoras.js'

export default class CambiosLabF5 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			horario : false,
			horas :  [
				"7:00 am",
				"8:00 am",
				"9:00 am",
				"10:00 am",
				"11:00 am",
				"12:00 am",
				"1:00 pm",
				"2:00 pm",
				"3:00 pm",
				"4:00 pm",
				"5:00 pm",
				"6:00 pm"
			],
			lab : "F5"
		}
	}
	render() {
		return(
			<div className="row">
				<div className="center"><strong >Captura Laboratorio {this.state.lab}</strong></div>
				<div className="col s12">
					<table className="centered bordered"> 
						<thead>
				          	<tr className="white">
				          		<th className="col s2" >Hora</th>
				              	<th className="col s2">Lunes</th>
				              	<th className="col s2">Martes</th>
				              	<th className="col s2">Miercoles</th>
				              	<th className="col s2">Jueves</th>
				              	<th className="col s2">Viernes</th>
				          	</tr>
				        </thead>
				        <tbody>
				        	{
								this.state.horas.map( hora => (
									<VistaHoras key={hora} lab={this.state.lab} hora={hora} />
								))
							}
				        </tbody>
					</table>
			      
				 </div>
				
			</div>
			)
	}
}