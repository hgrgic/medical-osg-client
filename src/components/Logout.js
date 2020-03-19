import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


import cognito from '../auth/cognitoFunctions';

// Logout routes to the front page of the application
class Logout extends Component { 

	    render() {
        return (
        	<Redirect to="/" />
        	)
    }

}

export {Logout}