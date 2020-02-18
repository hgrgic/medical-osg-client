import React from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  Navbar,
  Nav, 
  NavDropdown, 
  Form,  
  FormControl, 
  Button, 
  Table, 
  Jumbotron, 
  Image,
  Container,
  Row
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Defining application routes


// React Router  

export default function App() {
  return (
    <Router>
      <header>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand>MedAssistant</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link>
                    <Link to="/platform">Platform</Link>
                    </Nav.Link>
                  <Nav.Link>
                    <Link to="/about">About</Link>
                  </Nav.Link>
              </Nav>
              <Form inline className="App-search-form">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 App-search-bar" />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Form inline>
              <Button variant="primary" className="App-header-btns">Sign Up</Button>
              <Button variant="success" className="App-header-btns">Log In</Button>
              </Form>
          </Navbar.Collapse>
        </Navbar>
      </header>
    
  {/*Application URLs*/}

    <Switch>

      <Route path="/platform">
        <Platform />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
  );
}

function Platform() {
  return (
  <div className="App">
      <div className="container">
        <div className="row mt-5">
            <div className="col-lg-12 mb-12 grid-margin discussion-board">
              <div className="card h-100">
                  <h4 className="card-header">Post your image</h4>
                  <div className="card-body">
                    <p className="card-text">Post your images here to be annotated by our machine-learning backend.</p>
                  </div>
                  <div className="card-footer">
                    <Button variant="btn btn-primary">Upload</Button>
                  </div>
              </div>
            </div>
        </div>
        <div className="row mb-4">
          <div className="col-sm-12 grid-margin">
            <div className="card h-100">
              <h4 className="card-header">Recent Discussions</h4>
              <div className="card-body">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>User</th>
                      <th>Topic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
  <div className="App">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>About Page</h1>
          <p>Content for about page.</p>
          </div>
        </div>
      </div>
    </div>
        );
}

function Home() {
  return (
    
    <Container className="App-intro-container">
    <Image src="./Medical-Engineering-Banner.jpg" className="App-intro-banner"></Image>
    <Jumbotron className="App-intro-jumbo">
      <h1>AI for Medical Professionals</h1>
      <p>Welcome to MedAssistant, the first crowdsourced machine learning tool for medical professionals around the world.</p>
    <p>
      <Button variant="primary">Learn more</Button>
    </p>
    </Jumbotron>
    </Container>
  
  
  );
}
