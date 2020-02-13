import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, Table} from 'react-bootstrap';

// can define components by using functions as below

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// defining state by converting function to a class

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // life cycle methods for component mounting/unmounting

  componentDidMount() { 
    this.timeID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>It is {this.state.date.toLocaleTimeString()}.</h1>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand href="#home">Discussion Platform</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Getting Started</Nav.Link>
                  <NavDropdown title="Gallery" id="basic-nav-dropdown">
                    <NavDropdown.Item>Action</NavDropdown.Item>
                    <NavDropdown.Item>Another action</NavDropdown.Item>
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
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
    </div>
  );
}
export default App;