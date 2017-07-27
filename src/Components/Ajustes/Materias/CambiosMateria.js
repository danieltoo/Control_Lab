import React, { Component } from 'react';
import firebase from '../../../firebase'
import ReactDOM from 'react-dom'

import ItemMateria from './ItemMateria'

export default class CambiosMateria extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this)
		this.updateMat = this.updateMat.bind(this)
		this.addMat = this.addMat.bind(this)
		this.deleteMat = this.deleteMat.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.clearForm = this.clearForm.bind(this)
		this.validar = this.validar.bind(this)
		this.state = {
			materias : []
		}
		
	}
	handleSearch(e){
		e.preventDefault()

		let search = ReactDOM.findDOMNode(this.refs.search).value

		let clave = ReactDOM.findDOMNode(this.refs.clave)
		let nombre=ReactDOM.findDOMNode(this.refs.nombre)
		let carrera= ReactDOM.findDOMNode(this.refs.carrera)
		let semestre= ReactDOM.findDOMNode(this.refs.semestre)

		firebase.database().ref('materias/')
		.on('value', function(snap) {
		  for (let a in snap.val()){
		  	if(a === search ){
		  		clave.value = a
		  		nombre.value = snap.val()[a].nombre
		  		carrera.value = snap.val()[a].carrera
		  		semestre.value = snap.val()[a].semestre
		  		break
		  	}else {
		  		clave.value = ""
		  		nombre.value = ""
		  		carrera.value = 0
		  		semestre.value = 0
		  	}
		  }
		});

	}
	validar () {
		if (ReactDOM.findDOMNode(this.refs.clave).value === "" ||
		ReactDOM.findDOMNode(this.refs.nombre).value === "" ||
		ReactDOM.findDOMNode(this.refs.carrera).value === "0" ||
		ReactDOM.findDOMNode(this.refs.semestre).value === "0") {
			return true 
		}else {
			return false
		}
	}
	deleteMat(){
		if (this.validar()){
			console.log("se encuentran vacios")
			return 
		}
		let clave = ReactDOM.findDOMNode(this.refs.clave).value
		firebase.database().ref('materias/'+ clave).remove()
		this.clearForm()
	}
	updateMat() {
		if (this.validar()){
			console.log("se encuentran vacios")
			return 
		}
		let search = ReactDOM.findDOMNode(this.refs.search).value
		let clave = ReactDOM.findDOMNode(this.refs.clave).value
		let nombre=ReactDOM.findDOMNode(this.refs.nombre).value
		let semestre= ReactDOM.findDOMNode(this.refs.semestre).value
		let carrera= ReactDOM.findDOMNode(this.refs.carrera).value
		if (search === "") {
			console.log("Necesita un valor en busqueda")
			return 
		}
		firebase.database().ref('materias/'+ search).remove()
		firebase.database().ref('materias/' + clave).set({
		    nombre: nombre,
		    semestre : semestre,
		    carrera : carrera
		});
		this.clearForm()
	}
	addMat() {
		if (this.validar()){
			console.log("se encuentran vacios")
			return 
		}
		let clave = ReactDOM.findDOMNode(this.refs.clave).value
		let nombre = ReactDOM.findDOMNode(this.refs.nombre).value
		let semestre = ReactDOM.findDOMNode(this.refs.semestre).value
		let carrera = ReactDOM.findDOMNode(this.refs.carrera).value

		firebase.database().ref('materias/' + clave).set({
		    nombre: nombre,
		    semestre : semestre,
		    carrera : carrera
		});
		this.clearForm()
	}
	clearForm(){
		ReactDOM.findDOMNode(this.refs.clave).value = ""
		ReactDOM.findDOMNode(this.refs.nombre).value = ""
		ReactDOM.findDOMNode(this.refs.semestre).value = 0
		ReactDOM.findDOMNode(this.refs.carrera).value = 0
		//this.setState({materias : []})
	}
	handleChange (e) {
		let search = ReactDOM.findDOMNode(this.refs.search).value
		let t = this
		firebase.database().ref('materias/').on('value', function(snap) {
		 
		  let temp = []

		  for (let a in snap.val()){
		  	if (a.toLowerCase().includes(search.toLowerCase())) {
		  		temp.push({
		  			clave : a,
		  			nombre : snap.val()[a].nombre,
		  			semestre : snap.val()[a].semestre,
		  			carrera : snap.val()[a].carrera
		  		})
		  	}
		  }
		  t.setState({materias : temp})
		});
	}
	seleccion ( clave, nombre,  semestre, carrera){
		ReactDOM.findDOMNode(this.refs.clave).value  = clave
		ReactDOM.findDOMNode(this.refs.nombre).value = nombre
		ReactDOM.findDOMNode(this.refs.semestre).value = semestre
		ReactDOM.findDOMNode(this.refs.carrera).value = carrera
 	}
	render() {
		return (
			<div className=" center-align">
			<br/>
				 <strong>Buscar Materia</strong>
				<div className="row" >
					<div className="nav-wrapper card ">
				      <form onSubmit={this.handleSearch}>
				        <div className="input-field">
				          <input ref="search" type="search" onChange={this.handleChange} required />
				          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
				        </div>
				      </form>
				    </div>
				</div>
				<div className="row left-align">
					<div className="col l1">
						Clave
					</div>
					<div className="col l4">
						Nombre
					</div>
					<div className="col l4">
						Carrera
					</div>
					<div className="col l1">
						Semestre
					</div>
				</div>
				
				<div className="row center-align card">
					<div className="nav-wrapper card ">
						<div className="input-field col l1">
				          <input id="clave" ref="clave" type="text" placeholder="Clave" className="validate white"/>
				        </div>
						<div className="input-field col l4">
				          <input id="nombre" ref="nombre" type="text" placeholder="Nombre" className="validate white"/>
				        </div>
				        <div className="input-field col l4">
						  <select ref="carrera" defaultValue={0} className="browser-default validate">
						  	<option value="0">Elige una carrera</option>
						  	<option value="Contador Publico">Contador Publico</option>
						    <option value="Ing. en Gestion Empresarial">Ing. en Gestion Empresarial</option>
						    <option value="Ing. Industrial">Ing. Industrial</option>
						    <option value="Ing. en Sistemas Computacionales">Ing. en Sistemas Computacionales</option>
						    <option value="Ing. Electrónica">Ing. Electrónica</option>
						    <option value="Ing. Mecatrónica">Ing. Mecatrónica</option>
						  </select>
						</div>
				        <div className="input-field col l1">
						  <select ref="semestre" defaultValue={0} className="browser-default validate">
						  	<option value="1">1</option>
						    <option value="2">2</option>
						    <option value="3">3</option>
						    <option value="4">4</option>
						    <option value="5">5</option>
						    <option value="6">6</option>
						    <option value="7">7</option>
						    <option value="8">8</option>
						    <option value="9">9</option>
						  </select>
						</div>
						
						<div className="col l2 right-align"><br/>
							<a className="green-text" onClick={this.addMat}><i className="material-icons">add_circle</i></a>
							<a className="blue-text" onClick={this.updateMat}><i className="material-icons">autorenew</i></a> 
							<a className="red-text" onClick={this.deleteMat}><i className="material-icons">remove_circle</i></a>
							<a className="grey-text" onClick={this.clearForm}><i className="material-icons">backspace</i></a>
							<br/><br/> 
						</div>
					</div>
				</div>
				<div className="col l12 white">
					<table className="highlight">
						<tbody>
							{this.state.materias.map(mate => (
								<ItemMateria key={mate.clave} seleccion={this.seleccion.bind(this)} mate={mate}/>
							))}
						</tbody>
					</table>
				</div>

				
			</div>
			)
	}
}