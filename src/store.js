import { createStore } from 'redux'

import firebase from './firebase'



const reducer = (state, action) => {
	if(action.type === "CHANGE_USER"){
		console.log("cambió usaurio")
		return {
			user : true
		}
	}

	return state;	
}

export default createStore(reducer, { user : true }); 