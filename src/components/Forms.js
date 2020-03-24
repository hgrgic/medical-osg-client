import React from 'react';
import appConfig from '../aws-config/aws-cognito.json';

// Get session token
let user = localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`)
let token = localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.${user}.accessToken`)

// Form to handle opening a new discussion
class OpenNewDiscussionForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            sent: false,
            temp: []
        }
    }

    // Handle form submission, make POST request to API
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch(process.env.REACT_APP_API_URL + 'discussion/open', {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': JSON.stringify(token)
            },
            body: data
        });

        this.setState({
            sent: true,
            temp: data
        });
    }

    // Render the form
    render() {

        let sent = this.state.sent;

        if (!sent) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                    <label htmlFor="owner"><b>Enter discussion details</b></label>
                    <input type="hidden" class="form-control" id="owner" name="owner" placeholder="Enter your name" required value={user}/>
                </div>
                <div class="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Enter discussion title" required/>
                    
                    <label htmlFor="status"></label>
                    <input id="status" name="status" type="hidden" value="open" />
                </div>

                <div class="form-group">
                <label htmlFor="category">Inference Category</label>
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                        <option name="category" id="category" value="classification" selected required>Image Classification</option>
                        <option name="category" id="category" value="segmentation">Object Segmentation</option>
                    </select>
                </div>
        
                
                
                <div class="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
                </div>
        
                <div class="form-group">
                    <label htmlFor="files">Upload medical images</label>
                    <input type="file" class="form-control-file" id="files" name="files"  accept=".jpg,.jpeg" multiple required />
                </div>
                <button type="submit" class="btn btn-primary submit-discussion-btn">Submit Discussion</button>
                </form>
            );
        } else {
            return (
                <p>Thank you we have received your request.</p>
            );
        }
    }
}

/* 
Form to handle adding comments
This function takes the handleComment function of its parent component
ViewDiscussion and thereby modifies its state with the form data below
*/
class AddComment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.status == 'open') {
            return (
                <form onSubmit={this.props.handleComment}>
                    <div class="form-group">
                        <label htmlFor="text">Add Comment</label>
                        <textarea class="form-control" id="text" name="text" rows="2" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>
                </form>
            );
        } else {
            return (
                <form>
                    <div class="form-group">
                        <label>Cannot add comments to a closed discussion.</label>
                    </div>
                </form>
            );
        }
        
    }
}

export {OpenNewDiscussionForm, AddComment};