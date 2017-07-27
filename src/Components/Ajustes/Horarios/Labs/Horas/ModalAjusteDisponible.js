import React, { Component } from 'react';
import {Modal,Autocomplete} from 'react-materialize'

export default class ModalAjusteDisponible extends Component {
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
	handleSubmit (e){
		e.preventDefault()
		this.props.handleSubmit(
			this.state.rfc,
			this.state.clave
		)
	}
	render() {
		return (
			<Modal
          		trigger={
					<div className="green white-text">
						<br/>
						<div>Disponible</div>
						<br/>
					</div>
				}>
				<form className="row" onSubmit={this.handleSubmit}>
					<h6 className="col s12 center green-text"><strong>Registrar</strong></h6>
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
					 <div className="offset-s9 col s3">
			        	<button className="btn green modal-action modal-close" >
			        		Registrar
			        	</button>
			        </div>
				</form>
			</Modal>
		)
	}
}