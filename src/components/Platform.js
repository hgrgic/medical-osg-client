import React from 'react';
import { 
    Button, 
    Nav, 
    Navbar, 
    Form,  
    FormControl
  } from "react-bootstrap";

import {Link} from "react-router-dom";

import {FetchDiscussionItems, ViewDiscussion, NewDiscussion} from "./Discussion"

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

class PlatformPage extends React.Component {
  constructor(props) {
    super(props);
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