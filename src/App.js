import React from 'react';
import {HomePage, AboutPage} from './components/Home';
import PlatformPage from './components/Platform';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

// React Router (Application URLs)

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/platform">
          <PlatformPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/">
          <HomePage />
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
