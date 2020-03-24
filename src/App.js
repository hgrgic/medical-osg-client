import React from 'react';
import {HomePage, AboutPage} from './components/Home';
import {PlatformPage, DiscussionPage, NewDiscussionPage} from './components/Platform';
import appConfig from './aws-config/aws-cognito.json';
import cognito from './auth/cognitoFunctions';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

 // Callback route after a successful Cognito sign-in
 class Callback extends React.Component {
  
  // If a Cognito auth code is in the URL ( hash or query), initialize the new session
  componentDidMount () {
    if (this.props.location.hash || this.props.location.search) {
      cognito.parseCognitoWebResponse(window.location.href) 
    }
  }

  render () {
  setTimeout(() => { window.location.href="/platform"; }, 1000);
    return <div />
  }
}

/* 
React Router (Application URLs)
Only render component on given route
if cognito JWT token is valid.
*/

export default function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/platform">
          {localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`) !== null ? <PlatformPage /> : <HomePage />}
        </Route>

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <Route exact path="/">
          {localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`) !== null ? <PlatformPage /> : <HomePage />}
        </Route>

         <Route exact path="/callback" component={Callback}/>

         <Route exact path="/logout">
           <Redirect to="/" />
         </Route>

         
         <Route exact path="/discussion/:id" render={(props) => localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`) !== null ? <DiscussionPage {...props} /> : <HomePage />} />
         
        <Route exact path="/platform/new-discussion">
          {localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`) !== null ? <NewDiscussionPage /> : <HomePage />}
        </Route>
        
        <Route path="*" component={HomePage} >
          {localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`) !== null ? <PlatformPage /> : <HomePage />}
        </Route>
      
      </Switch>
    </BrowserRouter>
  );
}