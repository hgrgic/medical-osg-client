import React from 'react';

import { 
    Nav, 
    Navbar, 
    NavDropdown
  } from "react-bootstrap";

import {Link} from "react-router-dom";

import {FetchDiscussionItems, ViewDiscussion, NewDiscussion} from "./Discussion"

import {UserInformation} from "./User"

// Cognito imports
import { connect } from 'react-redux';
import cognito from '../auth/cognitoFunctions';
import request from 'request';
import appConfig from '../aws-config/aws-cognito.json';


const mapStateToProps = state => {
  return { session: state.session }
}


class PlatformPage extends React.Component {
  constructor(props) {
    super(props);
     this.state = { apiStatus: 'Not called' }
  }

  onSignOut = (e) => {
    e.preventDefault()
    cognito.signOutCognitoSession()
  }

    render() {
        return (
          <React.Fragment>
            <PlatformHeader />
            <ComponentContainer title='Recent Discussion'>
              <FetchDiscussionItems />
            </ComponentContainer> 




      <div >
        <header >
          { this.props.session.isLoggedIn ? (
            <div>
              <p>You are logged in as user {this.props.session.user.userName} ({this.props.session.user.email}).</p>
              <p></p>
              <div>
                <div>API status: {this.state.apiStatus}</div>
                <div className="Home-api-response">{this.state.apiResponse}</div>
              </div>
              <p></p>
              <a href="#" onClick={this.onSignOut}>Sign out</a>
            </div>
          ) : (
            <div>
              <p>You are not logged in.</p>
              <a href={cognito.getCognitoSignInUri()}>Sign in</a>
            </div>
          )}
          </header>
      </div>


          </React.Fragment>
        );
    }
}

const ComponentContainer = (props) => {
  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-sm-12 grid-margin">
          <div className="card h-100 discussion-board">
            <h4 className="card-header">{props.title}</h4>
            <div className="card-body">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class PlatformHeader extends React.Component {
  render () {
    if (!this.props.discussionPage) {
      return (
        <header class="platform-navbar-fixed">
          <Navbar expand="lg" variant="dark" bg="dark">
              <Navbar.Brand>MedAssistant</Navbar.Brand>
              <NavDropdown title="Actions" id="nav-dropdown">
                  <NavDropdown.Item href="/platform/new-discussion">Open New Discussion</NavDropdown.Item>
              </NavDropdown>
              <UserInformation />
          </Navbar>
      </header>
      );
    } else {
      return (
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand>MedAssistant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/platform">Platform</Link>
          </Nav.Link>
        </Nav>
        <UserInformation />
        </Navbar.Collapse>
      </Navbar>
      );
    } 
  }
}

class DiscussionPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
    <React.Fragment>
      <PlatformHeader discussionPage={true}/>
      <ViewDiscussion text={this.props.match.params.id} />
    </React.Fragment>
    );
  }
}

const NewDiscussionPage = () => {
  return (
    <React.Fragment>
    <PlatformHeader discussionPage={true} />
    <ComponentContainer title='Open New Discussion'>
      <NewDiscussion />
    </ComponentContainer>
    </React.Fragment>
  );
}


export default connect(mapStateToProps)(PlatformPage, DiscussionPage, NewDiscussionPage)


// export {PlatformPage, DiscussionPage, NewDiscussionPage};