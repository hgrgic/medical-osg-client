import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import cognito from '../auth/cognitoFunctions';

 // Callback route after a successful Cognito sign-in
class Callback extends Component {
  // If a Cognito auth code is in the URL ( hash or query), initialize the new session
  componentDidMount () {
    if (this.props.location.hash || this.props.location.search) {
      cognito.parseCognitoWebResponse(window.location.href) 
    }

  }

  render () {
  setTimeout(() => {   window.location.href="/platform";  }, 1000);
    return <div />
  }
}

export {Callback}