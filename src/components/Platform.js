import React from 'react';
import { 
    Button, 
    Navbar, 
    Form,  
    FormControl
  } from "react-bootstrap";

import {Link} from "react-router-dom";

import {FetchDiscussionItems} from "./Discussion"

const PlatformHeader = () => {
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
  )
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

export default PlatformPage;