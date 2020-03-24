import React from 'react';
import cognito from '../auth/cognitoFunctions';
import appConfig from '../aws-config/aws-cognito.json';

// Gets user information and displays username, and/or signs him/her out
class UserInformation extends React.Component {

	onSignOut = (e) => {
		e.preventDefault()
		cognito.signOutCognitoSession()
	}

	render () {
		return (
				<div class="user-information">
					<div class = "row">
    					<div class="col loggedin">
     				 		Logged in as: {localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`)}
    					</div>
    					<div class="col text-center signout">
    						<a class="btn btn-primary" href="#" onClick={this.onSignOut}>Sign out</a>
    					</div>
    				</div>
    			</div>
			   )
			}
		}


export {UserInformation};