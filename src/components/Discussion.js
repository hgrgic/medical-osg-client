import React from 'react';
import {Link} from "react-router-dom";

import { 
    Button,
    Badge,
    Spinner
} from 'react-bootstrap';

import {OpenNewDiscussionForm} from './Forms';


const LoadingSpinner = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

const DiscussionStatus = ( {discussion} ) => {
    if (discussion == "open") {
      return <Badge variant="success">open</Badge>;
    } else if (discussion == "closed") {
      return <Badge variant="danger">closed</Badge>;
    } else {
      return null
    }
  }
  
class FetchDiscussionItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            discussions: [],
            searching: false,
            noContentFound: false
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    setSearchStatus() {
      this.setState({searching: true});
    }


    handleSearch(event) {
      event.preventDefault();

      this.setSearchStatus();
      
      const query = new FormData(event.target);
      
      fetch('http://localhost:3001/search', {
          method: 'POST',
          body: query
      })
      .then(
        function(response) {
            return response.json()
          }
        )
      .then(
          (data) => {
              this.setState({
                  discussions: data,
                  loading: false,
                  searching: false
              });
          },
          (error) => {
            if (error) {
              this.setState({
                loading: false,
                searching: false,
                error: true
            });
              alert('No matching records found, please try again.')
            }
          }
      )
  }
  
    async componentDidMount() {
      const url = "http://localhost:3001/discussion";
      
      await fetch(url)
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
            discussions: data,
            loading: false
          });
        },
        (error) => {
          if (error) {
            console.log('An error has occurred')
            this.setState({
              error: true
            });
          }
        }
      )  
    }
       
    render () {
      let error = this.state.error;
      let loading = this.state.loading;
      let discussions = this.state.discussions;
      let searching = this.state.searching;

      if (loading && !error) {
        return (
          <div class="text-center">
            <LoadingSpinner />
          </div>
        );
      } else if (searching) {
        return (
          <div class="text-center">
            <LoadingSpinner />
          </div>
        );
      } else {
        return (
          <div>

            <div class="text-center">
            <form onSubmit={this.handleSearch} inline class="App-search-form">
              <label htmlFor="query"></label>
              <input type="text" class="mr-sm-2 App-search-bar" id="query" name="query" placeholder="Search by title or description" inline required/>
              <button type="submit" class="btn btn-primary">Search</button>
            </form>
            </div>

            {discussions.map((discussion) => (
              <div class="card discussion-card">
                <div class="card-body">
                  <h5 class="card-title">{discussion.title} <DiscussionStatus discussion={discussion.status} /></h5>
                  <h6 class="card-subtitle mb-2 text-muted">{discussion.owner}</h6>
                  <p class="card-text">{discussion.description}</p>
                  <p class="card-text">{discussion.discussionId}</p>
                  <Link to={"discussion/" + discussion.discussionId}>
                    <Button variant="primary">View Discussion</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  }

class ViewDiscussion extends React.Component {
  constructor(props) {
    /* This component gets its ID prop from the router
    and uses it to fetch other attributes from the API. */
    super(props);
    this.state = {
      id: this.props.text,
      discussion: {},
      loading: true,
      comments: [],
      error: false
    }
  }

  async componentDidMount() {
    const url = "http://localhost:3001/discussion/" + this.state.id;
    
    await fetch(url)
    .then(response => response.json())
    .then(
      (discussionObject) => {
        this.setState({
          discussion: discussionObject,
          comments: discussionObject.comments,
          loading: false
        });
      },
      (error) => {
        if (error) {
          console.log('An error has occurred')
          this.setState({
            error: true
          });
        }
      }
    )  
  }

  render () {
    let discussion = this.state.discussion;
    let comments = this.state.comments;
    let loading = this.state.loading;
    let error = this.state.error;

    const commentItems = comments.map((comment) =>
      <React.Fragment>
        <div class="list-group-item flex-column align-items-start comment-container">
        <div class="d-flex w-100 justify-content-between">
          <h5 key={comment.commentId} class="mb-1">{comment.user}</h5>
          <small key={comment.commentId} class="text-muted">{comment.createdAt}</small>
        </div>
        
        <p key={comment.commentId} class="mb-1">{comment.text}</p>
        </div>
      </React.Fragment>
    );

    if (loading && !error) {
      return (
        <div class="container text-center" style={{'margin-top': 1 + 'em'}}>
          <LoadingSpinner /> 
        </div>
      );
    } else if (loading && error) {
      return (
        <div>
          <div class="container">
          <p>Data not loaded due to an error.</p>
          </div>
        </div>
      );
    } else {
     
    return (
      <div class="container">
        <div class="card open-discussion-card">
          <h5 class="card-header">{discussion.title} <DiscussionStatus discussion={discussion.status} /></h5>
          <div class="card-body">
            <div class="discussion-image-holder text-center">
              <img class="img-fluid rounded" src="https://via.placeholder.com/150"></img>
              <img class="img-fluid rounded" src="https://via.placeholder.com/150"></img>
              <img class="img-fluid rounded" src="https://via.placeholder.com/150"></img>
            </div>
          </div>
          
          <h5 class="card-header top-border">Description</h5>
          <div class="card-body">
            <p>{discussion.description}</p>
          </div>
        
          <h5 class="card-header top-border">Comments</h5>
          <div class="card-body">
            <div class="list-group">
              {commentItems}
            </div>
          </div>
        </div>       
      </div>
    );
    }
  }
}

class NewDiscussion extends React.Component {
  render() {
    return (
      <OpenNewDiscussionForm />
    );
  }
}

export {FetchDiscussionItems, ViewDiscussion, NewDiscussion};