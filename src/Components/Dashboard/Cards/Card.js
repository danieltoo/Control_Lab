import React, { Component } from 'react'
import firebase from "../../../firebase"
import ModalCardDisponible from './ModalCardDisponible.js'
import ModalCardProximo from './ModalCardProximo.js'
import toastr from 'toastr'
export default class Card extends Component {
	constructor(props) {
		super(props);
		this.check = this.check.bind(this)
		this.getData = this.getData.bind(this)
		this.handleSalida = this.handleSalida.bind(this)
		let d=new Date();
		this.state = {
			estado : 1,
			rfc : "",
			clave : "",
			docentes : {},
			materias : {},
			dias : ["Domingo", "Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
			convertH : {
				7 : "7:00 am", 8 : "8:00 am", 9 : "9:00 am",
				10 : "10:00 am", 11 : "11:00 am", 12 : "12:00 am",
				13 : "1:00 pm", 14 : "2:00 pm", 15 : "3:00 pm",
				16 : "4:00 pm",17 : "5:00 pm",18 : "6:00 pm"
			},
			meses : [
				"Enero","Febrero","Marzo",
				"Abril","Mayo","Junio",
				"Julio","Agosto","Septiembre",
				"Octubre","Noviembre","Diciembre"
			],
			hora :d.getHours()
		}
	}
	componentDidMount() {
		let t = this
		setInterval(function(){
			let da=new Date();
			if (t.state.hora !== da.getHours()){
				t.setState({hora : da.getHours()})
				console.log("Se actualizó" + da.getHours())
			}
		}, 1000);
		this.getData()
		let d=new Date();
		let dia = this.state.dias[d.getDay()]
		let hora = this.state.convertH[this.state.hora]
		firebase.database().ref("/semestre/" ).on('value', function(semestre) {
			t.setState({semestre : semestre.val()})
			firebase.database().ref("semestres/"+semestre.val()+"/horario/"+t.props.clase.lab+"/"+dia+"/"+hora)
			.on('value', function(horario) {
				
				if (horario.val()){
					firebase.database().ref("semestres/"+semestre.val()+"/clase/"+t.state.meses[d.getMonth()]+"/"+d.getDate()+"/"+hora+"/"+t.props.clase.lab)
					.on('value', function (clase){
						if(clase.val()){
							if (!clase.val().tiempos.salida){
								console.log("Ocupado Normal" + t.props.clase.lab)
								console.log(clase.val().rfc)
								t.setState({rfc : clase.val().rfc , clave : clase.val().clave ,estado : 3})
							}else{
								console.log("Ocupado No Normal" + t.props.clase.lab)
								console.log(clase.val().rfc)
								t.setState({rfc : clase.val().rfc , clave : clase.val().clave ,estado : 4})
							}
						}else{
							console.log("Proximo" + t.props.clase.lab)
							t.setState({rfc : horario.val().docente , clave : horario.val().materia ,estado : 2})
							
						}
					})
				}else {
					firebase.database().ref("semestres/"+semestre.val()+"/clase/"+t.state.meses[d.getMonth()]+"/"+d.getDate()+"/"+hora+"/"+t.props.clase.lab)
					.on('value', function (clase){
						if(clase.val() ){
							if (!clase.val().tiempos.salida){
								t.setState({rfc : clase.val().rfc , clave : clase.val().clave ,estado : 3})
							}else{
								t.setState({rfc : clase.val().rfc , clave : clase.val().clave ,estado : 4})
							}
						}else{
							t.setState({estado : 1 })
						}
					})
				}	
			})
		})
		
	}
	getData(){
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
	handleSalida(){
		let t = this
		let d=new Date();
		let hora = this.state.convertH[d.getHours()]
		let referencia = firebase.database().ref("semestres/"+this.state.semestre+"/clase/"+t.state.meses[d.getMonth()]+"/"+d.getDate()+"/"+hora+"/"+t.props.clase.lab+"/tiempos")
		referencia.on('value', function (snap) {
			referencia.update({
				entrada : snap.val().entrada,
				salida :d.getHours() +":"+ d.getMinutes()
			}).then(() => {
				toastr["success"]("Salida guardada!")
			})
			.catch((e) => {
				toastr["error"]("Ocurrió un error!")
			})
		})

	}
	check (){
		if (this.state.estado === 1){
			return (
		          <div className="card">
		            <div className="card-content">
		              	<span className="card-title center">Laboratorio {this.props.clase.lab} <i className="material-icons green-text">fiber_manual_record</i></span>
		              	<p className="grey-text text-darken-2">Disponible {this.state.hora1}</p>
		              	<ModalCardDisponible
		              	 	docentes={this.state.docentes}
		              	 	materias={this.state.materias}
		              	 	dias={this.state.dias}
		              	 	convertH={this.state.convertH}
		              	 	semestre={this.state.semestre}
		              	 	lab={this.props.clase.lab}
		              	 	hora={this.state.hora}
		              	 	meses={this.state.meses}
		              	/>
		            </div>
		            <div className="card-action truncate">
		              <i className="material-icons green-text left">watch_later</i> En este momento es hora libre
		            </div>
		          </div>
				)
		}else if(this.state.estado === 2) {
			return (
				<div className="card">
		            <div className="card-content">
		              	<span className="card-title center">Laboratorio {this.props.clase.lab} <i className="material-icons blue-text">fiber_manual_record</i></span>
		              	<p className="grey-text text-darken-2">Proximo a ser ocupado</p>
		              	<ModalCardProximo
		              		rfc={this.state.rfc}
		      				clave={this.state.clave}
		              		docentes={this.state.docentes}
		              	 	materias={this.state.materias}
		              	 	dias={this.state.dias}
		              	 	convertH={this.state.convertH}
		              	 	semestre={this.state.semestre}
		              	 	lab={this.props.clase.lab}
		              	 	hora={this.state.hora}
		              	 	meses={this.state.meses}
		              	/>
		            </div>
		            <div className="card-action truncate">
		              <i className="material-icons blue-text left">watch_later</i> Es hora de {this.state.docentes[this.state.rfc]}
		            </div>
		        </div>
				)
		}else if(this.state.estado === 3){
			return (
				<div className="card">
		            <div className="card-content">
		              <span className="card-title center">Laboratorio {this.props.clase.lab}<i className="material-icons red-text">fiber_manual_record</i></span>
		              <p className="grey-text text-darken-2">Ocupado</p>
		              <p>
		              	<a className="btn red" onClick={this.handleSalida}>Salida</a>
		              </p>
		            </div>
		            <div className="card-action truncate">
		              <i className="material-icons red-text left">watch_later</i> Ocupado por {this.state.docentes[this.state.rfc]}
		            </div>
		        </div>
			)
		}else {
			return (
				<div className="card">
		            <div className="card-content">
		              <span className="card-title center">Laboratorio {this.props.clase.lab}<i className="material-icons red-text">fiber_manual_record</i></span>
		              <div className="grey-text text-darken-2">Salida registrada </div>
		             	<div className="btn transparent z-depth-0 " >Salida registrada </div>
		            </div>
		            <div className="card-action truncate">
		              <i className="material-icons red-text left">watch_later</i> Ocupado por {this.state.docentes[this.state.rfc]}
		            </div>
		        </div>
			)
		}
	}
	render() {
		return (
			<div className="col s12 m4">
				{this.check()}
			</div>
		)
	}
}