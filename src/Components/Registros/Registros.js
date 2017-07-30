import React, { Component } from 'react'
import firebase from "../../firebase"

import VistaXMeses from './Vistas/VistaXMeses.js'

export default class Registros extends Component {
	constructor(props) {
		super(props);
		this.state ={
			meses : []
		}
		
	}
	componentDidMount() {
		let t = this
		firebase.database().ref("/semestre/" ).on('value', function(semestre) {
			firebase.database().ref("/semestres/"+semestre.val()+"/clase" ).on('value', function(meses) {
				let mesestemp = []
				for (let mes in meses.val()){
					let clasestemp = []
					for (let dia in meses.val()[mes]){
						for (let hora in meses.val()[mes][dia]){
							for(let lab in meses.val()[mes][dia][hora]){
								clasestemp.push({
									dia : dia,
									hora : hora,
									lab : lab,
									clave : meses.val()[mes][dia][hora][lab].clave,
									rfc : meses.val()[mes][dia][hora][lab].rfc,
									datos : meses.val()[mes][dia][hora][lab].datos,
									tiempos :meses.val()[mes][dia][hora][lab].tiempos
								})
							}

						}
					}  
					mesestemp.push({mes:mes, clases : clasestemp})

				}
				t.setState({meses : mesestemp})
			})
		})
	}
	render() {
		return (
			<div className="row">
				<div className="col s12 m9 l12">
				{
					this.state.meses.map((mes) =>(
						<VistaXMeses key={mes.mes} mes={mes.mes} clases={mes.clases} />
					))
				}
				</div>
				 
			</div>
		)
	}
}