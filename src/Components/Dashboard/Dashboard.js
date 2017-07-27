import React, { Component } from 'react'
import Card from './Cards/Card.js'

export default class Dashboard extends Component{
	render() {
		return(
			<div className="row">
				<Card clase={{lab:"F1"}}/>
				<Card clase={{lab:"F2"}}/>
				<Card clase={{lab:"F3"}}/>
				<Card clase={{lab:"F4"}}/>
				<Card clase={{lab:"F5"}}/>
		    </div>
		)
	}
}