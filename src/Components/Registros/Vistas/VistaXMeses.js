import React, { Component } from 'react'
import firebase from "../../../firebase"
import VistaXClase from './VistaXClase.js'
export default class VistaXMeses extends Component{
	constructor(props) {
		super(props);
		this.state = {
			docentes : {},
			materias : {}
		}
	}
	
	componentDidMount() {
		let t = this
		firebase.database().ref("/docentes/" ).on('value', function(snapshot) {
			let temp = {}
			for(let docente in snapshot.val()){
				temp[docente] =snapshot.val()[docente].titulo+" "+snapshot.val()[docente].nombre
			}
			t.setState({docentes : temp})
		})
		firebase.database().ref("/materias/" ).on('value', function(snapshot) {
			let temp = {}
			for(let materia in snapshot.val()){
				temp[materia] = snapshot.val()[materia].nombre
			}
			t.setState({materias : temp})
		})
	}

	render() {
		return (
			<div id={this.props.mes} className="section scrollspy">
				<strong>{this.props.mes}</strong>
				<table  className="white">
					<thead>
						<tr>
							<th>Dia</th>
							<th>Hora</th>
							<th>Laboratorio</th>
							<th>Materia</th>
							<th>Docente</th>
							<th>Entrada</th>
							<th>Salida</th>
						</tr>
					</thead>
					<tbody>
					{
						this.props.clases.map((clase, index) =>(
							<VistaXClase
							 	key={index}
							 	clase={clase}
							 	docentes={this.state.docentes}
							 	materias={this.state.materias}
							 />
						))
					}
					</tbody>
				</table>
			</div>


		)
	}
}