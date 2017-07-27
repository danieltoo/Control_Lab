import React, { Component } from 'react';
import {Modal,Autocomplete} from 'react-materialize'

export default class ModalAjusteActualizar extends Component {
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
	componentWillMount() {
		this.setState({rfc : this.props.rfc, clave: this.props.clave})
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
	handleSubmit (){
		this.props.handleSubmit(
			this.state.rfc,
			this.state.clave
		)
	}
	render() {
		return(
			<Modal
	      		trigger={
					<div className="col s12 blue white-text">
							<div >{this.state.clave}</div>
							<div className="truncate" >{this.props.materias[this.state.clave]}</div>
							<div className="truncate">{this.props.docentes[this.state.rfc]}</div>
					</div>
				}>
				<form className="row" >
					<h6 className="col s12 center blue-text"><strong>Actualizar</strong></h6>
					<br/>
					<h6 className="col offset-s1 s11 "><strong>Docente</strong></h6>
					<div className="col offset-s1 s3">
						<Autocomplete
							title={this.state.rfc}
							data={this.props.docentes}
							onSelect={this.selectDocente} 
						/>
					</div>
					<div className="input-field col s7">
						<input type="text" value={this.props.docentes[this.state.rfc]} disabled/>
					</div>
					<h6 className="col offset-s1 s11 "><strong>Materia</strong></h6>
					<div className="col offset-s1 s3">
						<Autocomplete 
							title={this.state.clave}
							data={this.props.materias}
							onSelect={this.selectMateria} 
						/>
					</div>
					<div className="input-field col s7">
						<input type="text" value={this.props.materias[this.state.clave]} disabled/>
					</div>
					<div className="offset-s1 col s4">
			        	<a className="btn blue modal-action modal-close" onClick={this.handleSubmit}>
			        		Actualizar
			        	</a>
			        </div>
			        <div className="offset-s3 col s3" onClick={this.props.handleDelete}>
			        	<a className="btn red modal-action modal-close">
			        		Eliminar
			        	</a>
			        </div>
				</form>
			</Modal>
		)
	}
}