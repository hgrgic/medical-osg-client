import React from 'react';
import {HomePage, AboutPage} from './components/Home';
import {Callback} from './components/Callback'
import {Logout} from './components/Logout';
import {PlatformPage, DiscussionPage, NewDiscussionPage} from './components/Platform';
import appConfig from './aws-config/aws-cognito.json';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  Redirect
} from "react-router-dom";


// React Router (Application URLs)

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
         <Route exact path="/logout" component={Logout}/>
        <Route exact path="/discussion/:id" >
          {localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`) !== null ? <DiscussionPage /> : <HomePage />}
          // TODO CHECK THIS ROUTING
        </Route>
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

function Platform() {
  return (
  {/* do something here */} 
  );         
}

function About() {
  return (
    {/* do something here */}
    );
}

function Home() {
  return (
    {/* do something here */}
  );
}
