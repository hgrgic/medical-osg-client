import React from 'react';
import { 
    Button, 
    Nav, 
    Navbar, 
    Form,  
    FormControl
  } from "react-bootstrap";

import {Link} from "react-router-dom";

import {FetchDiscussionItems, ViewDiscussion} from "./Discussion"

const PlatformHeader = ({ discussionPage }) => {
  if (!discussionPage) {
    return (
      <header>
        <Navbar expand="lg" variant="dark" bg="dark">
            <Navbar.Brand>MedAssistant</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="App-search-form">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 App-search-bar" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
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
            </Navbar.Collapse>
        </Navbar>
    );
  }
  
}

class PlatformPage extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
        return (
          <React.Fragment>
            <PlatformHeader />
            <div className="container">
              <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                  <div className="card h-100 discussion-board">
                    <h4 className="card-header">Recent Discussions</h4>
                    <div className="card-body">
                      <FetchDiscussionItems />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
    }
}

class DiscussionPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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

export {PlatformPage, DiscussionPage};