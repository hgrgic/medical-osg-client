import React from 'react';
import { 
    Button, 
    Navbar, 
    Form,  
    FormControl,
  } from 'react-bootstrap';

import {Link} from "react-router-dom";

class DiscussionItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/discussion")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render () {
    const { error, isLoaded, items } = this.state;
    if (error) {
      console.log(error)
      return <p>An error has occured.</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li>{item.title}</li>
        ))}
        </ul>
      );
    }
  }
}




    // <div class="card">
    //   <div class="card-body">
    //     <h5 class="card-title">Test</h5>
    //     <h6 class="card-subtitle mb-2 text-muted">Test</h6>
    //     <p class="card-text">Test</p>
    //   </div>
    // </div>


 
  


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
                      <DiscussionItems />
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