import React, { Component } from 'react';
import firebase from '../../../../../firebase'
import ModalAjusteDisponible from './ModalAjusteDisponible.js'
import ModalAjusteActualizar from './ModalAjusteActualizar.js'

export default class VistaHorasDias extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.getData = this.getData.bind(this)
		this.isMod = this.isMod.bind(this)
		this.state = {
			status : false,
			rfc : "",
			clave : "",
			docentes : {},
			materias : {},
		}
	}

	getData(){
		let t = this
		firebase.database().ref("/docentes/" ).on('value', function(snapshot) {
			let temp = {}
			for(let docente in snapshot.val()){
				temp[docente] =snapshot.val()[docente].titulo+" "+ snapshot.val()[docente].nombre
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

	componentDidMount(){
		let t = this
		this.getData()

		firebase.database().ref("/semestre/" ).on('value', function(snapshot) {
		  t.setState({semestre : snapshot.val()})
		  firebase.database().ref("semestres/"+snapshot.val()+"/horario/"+t.props.lab+"/"+t.props.dia+"/"+t.props.hora)
			.on('value', function(snap) {
				if (snap.val() === null) {
					t.setState({status :false})
				}else {
					t.setState({
						status :true,
						clave : snap.val().materia,
						rfc: snap.val().docente
					})
				}
			})
		})
			
	}
	handleDelete(){
		firebase.database().ref("semestres/"+this.state.semestre+"/horario/"+this.props.lab+"/"+this.props.dia+"/"+this.props.hora)
		.remove()
	}
	handleSubmit (rfc, clave){
		firebase.database().ref("semestres/"+this.state.semestre+"/horario/"+this.props.lab+"/"+this.props.dia+"/"+this.props.hora)
		.set({
			docente : rfc,
			materia : clave
		})
	}
	isMod () {
		if (this.state.status){
			return (
				<ModalAjusteActualizar 
					rfc={this.state.rfc}
		      		clave={this.state.clave}
					docentes={this.state.docentes}
		            materias={this.state.materias}
		            handleSubmit={this.handleSubmit.bind(this)}
		            handleDelete={this.handleDelete.bind(this)}
				/>
			)
		}else {
			return (
				<ModalAjusteDisponible
		            docentes={this.state.docentes}
		            materias={this.state.materias}
		            handleSubmit={this.handleSubmit.bind(this)}
				/>
			)
		}
		
	}
	
	render() {
		return (
			<td className="col s2 truncate">
	          {this.isMod()}
	        </td>
			)
	}
}