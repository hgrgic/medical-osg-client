import React from 'react';
import HomePage from './components/Home';
import Callback from './components/Callback'
import PlatformPage from './components/Platform';
import DiscussionPage from './components/Platform';
import NewDiscussionPage from './components/Platform';


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
          <Route exact path="/" component={HomePage}/>
         <Route exact path="/callback" component={Callback}/>
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







// import React from 'react';
// import {HomePage, AboutPage} from './components/Home';
// import Callback from './components/Callback'
// import {PlatformPage, DiscussionPage, NewDiscussionPage} from './components/Platform';
// import './App.css';

// import {
//   BrowserRouter,
//   Switch,
//   Route,
//   useParams
// } from "react-router-dom";


// // React Router (Application URLs)

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/platform">
//           <PlatformPage />
//         </Route>
//         <Route exact path="/about">
//           <AboutPage />
//         </Route>
//         <Route exact path="/">
//           <HomePage />
//         </Route>
//          <Route exact path="/callback" component={Callback}/>
//         <Route exact path="/discussion/:id" component={DiscussionPage} />
//         <Route exact path="/platform/new-discussion">
//           <NewDiscussionPage />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   );
// }

// function Platform() {
//   return (
//   {/* do something here */} 
//   );         
// }

// function About() {
//   return (
//     {/* do something here */}
//     );
// }

// function Home() {
//   return (
//     {/* do something here */}
//   );
// }
