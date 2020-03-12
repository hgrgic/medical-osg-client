import React from 'react';
import './style.css';
import {SignUpForm, LoginForm} from './Forms'
import {
    Navbar,
    Nav, 
    Form,  
    Button,
    Jumbotron, 
    Image,
    Container,
    Modal

} from 'react-bootstrap';

import {Link} from "react-router-dom";

// Cognito imports
import { connect } from 'react-redux';
import cognito from '../auth/cognitoFunctions';
import request from 'request';
import appConfig from '../aws-config/aws-cognito.json';

// Button redirect
import { useHistory } from 'react-router-dom';


const mapStateToProps = state => {
  return { session: state.session }
}

// Modal Components

function SignUpModal() {
    const [show, setShow] = React.useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <React.Fragment>
        
          <a className="signup btn btn-primary" href={cognito.getCognitoSignUpUri()} >Sign up</a>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Sign up</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <SignUpForm />
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>Close</Button>
                  </Modal.Footer>
          </Modal>
      </React.Fragment>
    );
  }
  
  // Login Modal Component

const LoginModal = () => {
    
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  
    return (
        <React.Fragment>
             <a className="btn btn-primary" href={cognito.getCognitoSignInUri()}>Sign in</a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }

const HomeNavigation = () => {
        return (
            <header>
                <Navbar expand="lg" variant="dark" bg="dark">
                    <a href="/">
                        <Navbar.Brand>MedAssistant</Navbar.Brand>
                    </a>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <Link to="/about">About</Link>
                            </Nav.Link>
                        </Nav>
                        <Form inline>
                            <SignUpModal />
                            <LoginModal />
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }

class HomePage extends React.Component {
    render() {
        return (
        <React.Fragment>  
            <HomeNavigation />

            <Container className="App-intro-container">
            
                <Image src="./Medical-Engineering-Banner.jpg" className="App-intro-banner"></Image>
            
                <Jumbotron className="App-intro-jumbo">
                <h1>AI for Medical Professionals</h1>
                <p>Welcome to MedAssistant, the first crowdsourced machine learning tool for medical professionals around the world.</p>
                <Button variant="primary" href="/about">Learn more</Button>
                </Jumbotron>

            </Container>
        </React.Fragment>  
        )
    }
}

const AboutPage = () => {
        return (
            <React.Fragment>
                <HomeNavigation />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="aboutHeader">About</h1>
                            <p className="aboutText">Here we present the first web-based AI Medical Image Analysis tool for medical professionals. The platform allows certified medical professionals to upload their patient’s images in a confidential manner to then be anonymously processed by our machine learning backend which will produce suggestions on the content of the image (e.g. automated interpretation of knee MRIs). Other forms of user generated content will consist of the posts that the users make. This platform will allow users to open a discussion on a given medical topic, and will allow the user to upload their respective images which they would like to have interpreted, and analysed. Furthermore these discussions then also become visible to other users of the Medical Image Analysis platform, upon which they are able to comment on the issue and provide their own suggestions. The owner of the discussions is then able to close his or her discussion and use the information gathered through his post on this platform (suggestions from model and community) to inform his own decision making over the diagnosis to be made on the patients images. By using a collaborative human-in-the-loop approach to machine learning for medical analytics we provide unprecedented power a decision support system for the medical community to make better informed diagnoses. Furthermore as more user-generated-content is uploaded to our system, and more interactions take place on our website, our machine learning models’ accuracy scores will keep improving, thus also making for an ever more valuable user experience.</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

export {HomePage, AboutPage};
export default connect(mapStateToProps)(HomePage)