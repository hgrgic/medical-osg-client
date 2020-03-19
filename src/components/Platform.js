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
import cognito from '../auth/cognitoFunctions';
import appConfig from '../aws-config/aws-cognito.json';


class PlatformPage extends React.Component {
  constructor(props) {
    super(props);
     this.state = { apiStatus: 'Not called' }
  }

    render() {
        return (
          <React.Fragment>
            <PlatformHeader />
            <ComponentContainer title='Recent Discussion'>
              <FetchDiscussionItems />
            </ComponentContainer> 


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

export {PlatformPage, DiscussionPage, NewDiscussionPage};