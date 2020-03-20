import React from 'react';
import {Link} from "react-router-dom";

import { 
    Button,
    Badge,
    Spinner
} from 'react-bootstrap';

import {OpenNewDiscussionForm, AddComment} from './Forms';
import appConfig from '../aws-config/aws-cognito.json';

// Get session token
let user = localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`)
let token = localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.${user}.accessToken`)

// Authorised GET request
const getAuthorised = {
  method: 'GET',
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Authorization': JSON.stringify(token),
    'Content-Type': 'text/plain'
  }
}

// Authorised POST request
function postAuthorised(query) {
  if (query) {
    return {
      method: 'POST',
      body: JSON.stringify({"query": query}),
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': JSON.stringify(token),
        'Content-Type': 'application/json'
      }
    }
  } else {
    return {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': JSON.stringify(token),
        'Content-Type': 'application/json'
      }
    }
  }
}

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
      const url = process.env.REACT_APP_API_URL + 'search'

      event.preventDefault();

      this.setSearchStatus();
      
      const searchQuery = new FormData(event.target).get("query"); // Get search query

      // modify post request object to include search query
      let request = postAuthorised(searchQuery)
 
      fetch(url, request)
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
      const url = process.env.REACT_APP_API_URL + 'discussion';
      
      await fetch(url, getAuthorised)
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
      error: false,
      images: []
    }
    this.handleComment = this.handleComment.bind(this);
    this.reloadComments = this.reloadComments.bind(this);
  }


  async reloadComments() {
    const url = process.env.REACT_APP_API_URL + 'discussion/' + this.state.id;
    
    await fetch(url, getAuthorised)
    .then(response => response.json())
    .then(
      (discussionObject) => {
        this.setState({
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

  async handleComment(event) {
    event.preventDefault();

    const commentForm = new FormData(event.target);
    const comment = commentForm.get('text');
    const postUrl = process.env.REACT_APP_API_URL + 'comment/add';
    
    // Prepare request object
    
    let commentObject = JSON.stringify({
      discussionId: this.state.id,
      text: comment,
      user: user})
    
    let request = postAuthorised()
    
    request.body = commentObject

    await fetch(postUrl, request)
    .then(() => {
      console.log('comment added!')
      this.reloadComments()
    });
  }

  async componentDidMount() {
    const url = process.env.REACT_APP_API_URL + 'discussion/' + this.state.id;
    
    await fetch(url, getAuthorised)
    .then(response => response.json())
    .then(
      (discussionObject) => {
        this.setState({
          discussion: discussionObject,
          comments: discussionObject.comments,
          loading: false,
          images: discussionObject.files
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
          <DiscussionImages discussionId={this.state.id}/>
          
          <h5 class="card-header top-border">Predictions</h5>
          <div class="card-body">
            <ImagePredictions images={this.state.images}/>
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
        <AddComment handleComment={this.handleComment} status={discussion.status}/>
      </div>
    );
    }
  }
}

class DiscussionImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  async componentDidMount() {
    const url = process.env.REACT_APP_API_URL + 'discussion/' + this.props.discussionId; 

    await fetch(url, getAuthorised)
    .then(response => response.json())
    .then(data => {
      this.setState({
        images: data.files
      });
      console.log(this.state.images)
    },
    error => {
      if (error) {
        this.setState({
          error: true
        });
      }
      console.log('An error has occurred.')
    })     
  }

  render() {
    let images = this.state.images;

    return (
    <div class="card-body">
      <div class="discussion-image-holder text-center">
        {images.map((image) => (
          <img class="img-fluid rounded discussion-image" src={process.env.REACT_APP_S3_URL + image} />
          ))}
      </div>
    </div>
    );
  }

}

class ImagePredictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: []
    }
  }

  async componentDidMount() {
    const url = process.env.REACT_APP_ML_URL + 'predict';
    
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(
        this.props.images.map((image) => (
        process.env.REACT_APP_S3_URL + image
      )))
    })
    .then(response => response.json())
    .then(preds => {
      this.setState({
        predictions: preds
      })
    })
}

  render () {
    let predictions = this.state.predictions;

    return (
      <ul class="list-group-flush">
        {predictions.map((prediction) => (
        <li class="list-group-item">{prediction.class}</li> 
      ))}
      </ul>
    )
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