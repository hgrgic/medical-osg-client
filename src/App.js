import React from 'react';
import {HomePage, AboutPage} from './components/Home';
import {PlatformPage, DiscussionPage, NewDiscussionPage} from './components/Platform';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
  useParams
} from "react-router-dom";

// React Router (Application URLs)

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/platform">
          <PlatformPage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/discussion/:id" component={DiscussionPage} />
        <Route exact path="/platform/new-discussion">
          <NewDiscussionPage />
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
