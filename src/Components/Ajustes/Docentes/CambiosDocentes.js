import React, { Component } from 'react';
import firebase from '../../../firebase'
import ReactDOM from 'react-dom'
import ItemDocente from './ItemDocente'

export default class CambiosDocentes extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this)
		this.updateDoc = this.updateDoc.bind(this)
		this.addDoc = this.addDoc.bind(this)
		this.deleteDoc = this.deleteDoc.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.clearForm = this.clearForm.bind(this)
		this.validar = this.validar.bind(this)
		this.state = {
			docentes : []
		}
		
	}
	handleSearch(e){
		e.preventDefault();
		let search = ReactDOM.findDOMNode(this.refs.search).value
		let rfc = ReactDOM.findDOMNode(this.refs.rfc)
		let nombre=ReactDOM.findDOMNode(this.refs.nombre)
		let titulo= ReactDOM.findDOMNode(this.refs.titulo)

		firebase.database().ref('docentes/')
		.on('value', function(snap) {
		  for (let a in snap.val()){
		  	if(a === search ){
		  		rfc.value = a
		  		nombre.value = snap.val()[a].nombre
		  		titulo.value = snap.val()[a].titulo
		  		break
		  	}else {
		  		rfc.value = ""
		  		nombre.value = ""
		  		titulo.value = 0
		  	}
		  }
		});

	}
	validar () {
		if (ReactDOM.findDOMNode(this.refs.rfc).value === "" ||
		ReactDOM.findDOMNode(this.refs.nombre).value === "" ||
		ReactDOM.findDOMNode(this.refs.titulo).value === "0") {
			return true 
		}else {
			return false
		}
	}
	deleteDoc(){
		if (this.validar()){
			console.log("se encuentran vacios")
			return 
		}
		let rfc = ReactDOM.findDOMNode(this.refs.rfc).value
		firebase.database().ref('docentes/'+ rfc).remove()
		this.clearForm()
	}
	updateDoc () {
		if (this.validar()){
			console.log("se encuentran vacios")
			return 
		}
		let search = ReactDOM.findDOMNode(this.refs.search).value
		let rfc = ReactDOM.findDOMNode(this.refs.rfc).value
		let nombre=ReactDOM.findDOMNode(this.refs.nombre).value
		let titulo= ReactDOM.findDOMNode(this.refs.titulo).value
		if (search === "") {
			console.log("Necesita un valor en busqueda")
			return 
		}

		firebase.database().ref('docentes/'+ search).remove()
		firebase.database().ref('docentes/' + rfc).set({
		    nombre: nombre,
		    titulo : titulo
		});
		this.clearForm()
	}
	addDoc () {
		if (this.validar()){
			console.log("se encuentran vacios")
			return 
		}
		let rfc = ReactDOM.findDOMNode(this.refs.rfc).value
		let nombre = ReactDOM.findDOMNode(this.refs.nombre).value
		let titulo = ReactDOM.findDOMNode(this.refs.titulo).value
		console.log(rfc)
		console.log(nombre)
		console.log(titulo)
		firebase.database().ref('docentes/' + rfc).set({
		    nombre: nombre,
		    titulo : titulo
		});
		this.clearForm()
	}
	clearForm(){
		ReactDOM.findDOMNode(this.refs.rfc).value = ""
		ReactDOM.findDOMNode(this.refs.nombre).value = ""
		ReactDOM.findDOMNode(this.refs.titulo).value = 0
		//this.setState({docentes : []})
	}
	handleChange (e) {
		let search = ReactDOM.findDOMNode(this.refs.search).value
		let t = this
		firebase.database().ref('docentes/').on('value', function(snap) {
		 
		  let temp = []

		  for (let a in snap.val()){
		  	if (a.toLowerCase().includes(search.toLowerCase())) {
		  		temp.push({
		  			rfc : a,
		  			titulo : snap.val()[a].titulo,
		  			nombre : snap.val()[a].nombre
		  		})
		  	}
		  }
		  t.setState({docentes : temp})
		});
	}
	seleccion ( rfc, nombre,  titulo ){
		ReactDOM.findDOMNode(this.refs.rfc).value  = rfc
		ReactDOM.findDOMNode(this.refs.nombre).value = nombre
		ReactDOM.findDOMNode(this.refs.titulo).value = titulo
 	}
	render() {
		return (
			<div className=" center-align">
			<br/>
				 <strong>Buscar Docente</strong>
				<div className="row">
					<div className="nav-wrapper card ">
				      <form onSubmit={this.handleSearch}>
				        <div className="input-field">
				          <input ref="search" type="search" onChange={this.handleChange} required />
				          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
				        </div>
				      </form>
				    </div>
				</div>
				<div className="row center-align">
					<div className="col l2">
						RFC
					</div>
					<div className="col l2">
						Titulo
					</div> 
					<div className="col l6">
						Nombre
					</div>
				</div>
				
				<div className="row center-align card">
					<div className="nav-wrapper card ">
						<div className="input-field col l2">
				          <input id="rfc" ref="rfc" type="text" placeholder="RFC" className="validate white"/>
				        </div>
				        <div className="input-field col l2">

						  <select ref="titulo" defaultValue={0} className="browser-default validate">
						  	<option value="0" disabled >Titulo</option>
						    <option value="Lic.">Lic.</option>
						    <option value="Ing.">Ing.</option>
						    <option value="M.T.I.">M.T.I.</option>
						    <option value="M.C.">M.C.</option>
						    <option value="M.A.">M.A.</option>
						    <option value="DR.">DR.</option>
						    <option value="DRA.">DRA.</option>
						  </select>
						</div>
						<div className="input-field col l6">
				          <input id="nombre" ref="nombre" type="text" placeholder="Nombre" className="validate white"/>
				        </div>
						
						<div className="col l2 right-align"><br/>
							<a className="green-text" onClick={this.addDoc}><i className="material-icons">add_circle</i></a>
							<a className="blue-text" onClick={this.updateDoc}><i className="material-icons">autorenew</i></a> 
							<a className="red-text" onClick={this.deleteDoc}><i className="material-icons">remove_circle</i></a>
							<a className="grey-text" onClick={this.clearForm}><i className="material-icons">backspace</i></a>
							<br/><br/> 
						</div>
					</div>
				</div>
				<div className="col l12 white">
				<table className="highlight">
					<tbody>
						{this.state.docentes.map(doce => (
							<ItemDocente key={doce.rfc} seleccion={this.seleccion.bind(this)} doce={doce}/>
						))}
					</tbody>
				</table>
				</div>

				
			</div>
			)
	}
}