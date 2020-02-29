import React from 'react';

import { 
    Button,
    Badge
} from 'react-bootstrap';

const DiscussionStatus = ( {discussion} ) => {
    if (discussion == "open") {
      return <Badge variant="success">open</Badge>;
    } else {
      return <Badge variant="danger">closed</Badge>;
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
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{discussion.title} <DiscussionStatus discussion={discussion.status} /></h5>
                  <h6 class="card-subtitle mb-2 text-muted">{discussion.owner}</h6>
                  <p class="card-text">{discussion.description}</p>
                  <p class="card-text">{discussion.discussionId}</p>
                  <Button variant="primary">View Discussion</Button>
                </div>
              </div>
            ))}
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

export {UploadImage, FetchDiscussionItems};