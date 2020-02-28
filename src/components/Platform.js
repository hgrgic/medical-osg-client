import React from 'react';
import { 
    Button, 
    Table,
    Navbar,
    Nav, 
    Form,  
    FormControl
  } from 'react-bootstrap';

import {Link} from "react-router-dom";

class PlatformPage extends React.Component {
    render() {
        return (
          <body>
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

          </body>
        );
    }
}

export default PlatformPage;