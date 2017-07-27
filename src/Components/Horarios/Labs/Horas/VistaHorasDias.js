import React, { Component } from 'react';
import firebase from '../../../../firebase'
import toastr from 'toastr'

export default class VistaHorasDias extends Component {
	constructor(props) {
		super(props);
		this.getData = this.getData.bind(this)
		this.isMod = this.isMod.bind(this)
		this.handleClick = this.handleClick.bind(this)
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
	handleClick (){
		toastr.options = {
                  "positionClass": "toast-top-right",
                  "showDuration": "300",
                  "hideDuration": "1000"
                }
        toastr.info('<strong>' + this.state.clave +'</strong><div>'
         + this.state.materias[this.state.clave] +'</div><div  class="truncate">' +this.state.docentes[this.state.rfc]+'</div>')
	}
	isMod () {
		if (this.state.status){
			return (
				<div className="col s12 blue white-text" onClick={this.handleClick}>
					<div >{this.state.clave}</div>
					<div className="truncate" >{this.state.materias[this.state.clave]}</div>
					<div className="truncate">{this.state.docentes[this.state.rfc]}</div>
				</div>
			)
		}else {
			return (
				<div>
					<br/>
					<br/>
					<br/>
				</div>
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