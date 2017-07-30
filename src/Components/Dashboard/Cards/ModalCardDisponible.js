import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import firebase from "../../../firebase"
import {Modal, Autocomplete} from 'react-materialize'
import toastr from 'toastr'

export default class ModalCardDisponible extends Component {
	constructor(props) {
		super(props);
		this.selectDocente = this.selectDocente.bind(this)
		this.selectMateria = this.selectMateria.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			rfc: "",
			nombreDocente : "",
			clave : "",
			nombreMateria : ""
		}
		
	}
	selectDocente (e) {
		let nombre = this.props.docentes[e.target.value]
		if(nombre !== undefined){
			this.setState({rfc : e.target.value, nombreDocente : nombre})
		}else {
			this.setState({ rfc : "", nombreDocente : "" })
		}
	}
	selectMateria (e) {
		let nombre = this.props.materias[e.target.value]
		if(nombre !== undefined){
			this.setState({clave : e.target.value, nombreMateria : nombre})
		}else {
			this.setState({ clave : "", nombreMateria : "" })
		}
	}

	handleSubmit(e){
		e.preventDefault()
		let t = this
		let d=new Date();
		let hora = this.props.convertH[d.getHours()]
		let da = d.getDate()

		firebase.database().ref("semestres/"+t.props.semestre+"/clase/"+t.props.meses[d.getMonth()]+"/"+da+"/"+hora+"/"+t.props.lab)
		.set({
			rfc : t.state.rfc,
			clave : t.state.clave,
			datos : {
				software : ReactDOM.findDOMNode(t.refs.sw).value,
				tema : ReactDOM.findDOMNode(t.refs.tema).value,
				practica : ReactDOM.findDOMNode(t.refs.practica).value,
				canon : ReactDOM.findDOMNode(t.refs.canon).checked
			},
			tiempos: {
				entrada : d.getHours() +":"+ d.getMinutes()
			}
		}).then(() => {
			toastr["success"]("Entrada guardada!")
		})
		.catch((e) => {
			toastr["error"]("Ocurrió un error!")
		})

	}
	render() {
		return (
			<Modal
          		trigger={
					<a className="btn green">Disponible</a>
				}>
				<form className="row" onSubmit={this.handleSubmit}>
					<h6 className="col s12 center green-text"><strong>Registrar entrada fuera de horario </strong></h6>
					<br/>
					<h6 className="col offset-s1 s11 "><strong>Docente</strong></h6>
					<div className="col offset-s1 s3">
						<Autocomplete
							data={this.props.docentes}
							onSelect={this.selectDocente} 
						/>
					</div>
					<div className="input-field col s7">
						<input type="text" value={this.state.nombreDocente} disabled/>
					</div>
					<h6 className="col offset-s1 s11 "><strong>Materia</strong></h6>
					<div className="col offset-s1 s3">
						<Autocomplete 
							data={this.props.materias}
							onSelect={this.selectMateria} 
						/>
					</div>
					<div className="input-field col s7">
						<input type="text" value={this.state.nombreMateria} disabled/>
					</div>
					<h6 className="col offset-s1 s11 "><strong>Datos Extras</strong></h6>
					<div className="input-field offset-s1 col s5">
			          <input id="first_name" ref="sw" type="text" className="validate" />
			          <label htmlFor="first_name">Software a Utilizar</label>
			        </div>
			        <div className="input-field col s5">
			          <input id="first_name" ref="tema" type="text" className="validate" />
			          <label htmlFor="first_name">Tema</label>
			        </div>
			        <div className="input-field offset-s1 col s8">
			          <textarea id="textarea1" ref="practica" className="materialize-textarea"></textarea>
			          <label htmlFor="textarea1">Practica</label>
			        </div>
			        <p className="col s2">
				      <input type="checkbox" ref="canon" id={this.props.lab} />
				      <label htmlFor={this.props.lab}>Requiere Cañón</label>
				    </p>
					 <div className="offset-s8 col s3">
			        	<button className="btn green modal-action modal-close" >
			        		Registrar
			        	</button>
			        </div>
				</form>
			</Modal>
		)
	}
}