import React, { Component } from 'react';
import Popup from './components/Popup';  
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
  Modal,
  Row
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



// Modal Components

function SignUpModal() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="App-header-btns">
        Signup
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="container login-container">
            <div class="row">
                <div class="col-md-12 login-form-1">
                <h3>Register to MedAssistant</h3>
                    <form>
                        <div class="form-group">
                         <label class="control-label" for=
                            "inputHospitalName">Hospital Name</label>
                            <input type="text" class="form-control" placeholder="E.g. MedAssistant *" value="" />
                        </div>
                        <div class="form-group">
                         <label class="control-label" for=
                            "inputSpecialization">Medical Specialty</label>
                            <input type="text" class="form-control" placeholder="E.g.  Oncology *" value="" />
                        </div>
                        <div class="form-group">
                        <label class="control-label" for=
                            "inputFirstName">First Name</label>
                            <input type="text" class="form-control" placeholder="E.g. John *" value="" />
                        </div>
                        <div class="form-group">
                        <label class="control-label" for=
                            "inputLastName">Last Name</label>
                            <input type="text" class="form-control" placeholder="E.g. Doe *" value="" />
                        </div>
                        <div class="form-group">
                        <label class="control-label" for=
                            "inputEmail">Email</label>
                            <input type="text" class="form-control" placeholder="E.g. med@med.com *" value="" />
                        </div>
                        <div class="form-group">
                         <label class="control-label" for=
                            "inputUsername">Username</label>
                            <input type="text" class="form-control" placeholder="E.g. Doctor1 *" value="" />
                        </div>
                        <div class="form-group">
                            <label class="control-label" for=
                            "inputPassword">Password</label>
                            <input type="password" class="form-control" placeholder="Min. 8 Characters *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Sign Up" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Modal Component

function LoginModal() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="App-header-btns">
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="container login-container">
            <div class="row">
                <div class="col-md-12 login-form-1">
                <h3>Welcome back!</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Email *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Your Password *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Login" />
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Forget Password?</a>
                        </div>
                        <div variant = "danger" class="alert alert-error">
                          <button class="close" data-dismiss="alert" type=
                          "button">×</button> <strong>Wrong Credentials </strong>
                      </div>
                    </form>

                </div>
            </div>
        </div>


        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Alert Example 
  // function AlertDismissibleExample() {
  //   const [show, setShow] = useState(true);
  
  //   if (show) {
  //     return (
  //       <Alert variant="danger" onClose={() => setShow(false)} dismissible>
  //         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
  //         <p>
  //           Change this and that and try again. Duis mollis, est non commodo
  //           luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
  //           Cras mattis consectetur purus sit amet fermentum.
  //         </p>
  //       </Alert>
  //     );
  //   }
  //   return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  // }
  
  // render(<AlertDismissibleExample />);

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
              <SignUpModal />
              <LoginModal />
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
