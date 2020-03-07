import React from 'react';
import {Link} from "react-router-dom";

import { 
    Button,
    Badge
} from 'react-bootstrap';

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
            discussions: []
        };
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
  
      if (loading && !error) {
        return (
          <div>
            <p>Data is loading...</p>
          </div>
        );
      } else if (loading && error) {
        return (
          <div>
            <p>Data not loaded due to an error.</p>
          </div>
        );
      } else {
        return (
          <div>
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
        <div class="container text-center">
          <div class="loader"></div> 
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


//TODO: Implement upload images page under each discussion
const UploadImage = () => {
    return (
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
    );
}

export {UploadImage, FetchDiscussionItems, ViewDiscussion};