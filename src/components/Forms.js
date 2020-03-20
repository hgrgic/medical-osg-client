import React from 'react';
import appConfig from '../aws-config/aws-cognito.json';

// Get session token
let user = localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.LastAuthUser`)
let token = localStorage.getItem(`CognitoIdentityServiceProvider.${appConfig.clientId}.${user}.accessToken`)

const SignUpForm = () => {
    return (
        <div class="container login-container">
              <div class="row">
                  <div class="col-md-12 login-form-1">
                  <h3>Register for MedAssistant</h3>
                      <form>
                          <div class="form-group">
                           <label class="control-label" for=
                              "inputHospitalName">Hospital Name</label>
                              <input type="text" class="form-control" placeholder="E.g. MedAssistant *" />
                          </div>
                          <div class="form-group">
                           <label class="control-label" for=
                              "inputSpecialization">Medical Specialty</label>
                              <input type="text" class="form-control" placeholder="E.g.  Oncology *" />
                          </div>
                          <div class="form-group">
                          <label class="control-label" for=
                              "inputFirstName">First Name</label>
                              <input type="text" class="form-control" placeholder="E.g. John *" />
                          </div>
                          <div class="form-group">
                          <label class="control-label" for=
                              "inputLastName">Last Name</label>
                              <input type="text" class="form-control" placeholder="E.g. Doe *" />
                          </div>
                          <div class="form-group">
                          <label class="control-label" for=
                              "inputEmail">Email</label>
                              <input type="text" class="form-control" placeholder="E.g. med@med.com *" />
                          </div>
                          <div class="form-group">
                           <label class="control-label" for=
                              "inputUsername">Username</label>
                              <input type="text" class="form-control" placeholder="E.g. Doctor1 *" />
                          </div>
                          <div class="form-group">
                              <label class="control-label" for=
                              "inputPassword">Password</label>
                              <input type="password" class="form-control" placeholder="Min. 8 Characters *" />
                          </div>
                          <div class="form-group">
                              <input type="submit" class="btnSubmit" value="Sign Up" />
                          </div>
                      </form>
                  </div>
              </div>
          </div>
    );
}

const LoginForm = () => {
    return (
        <div class="container login-container">
            <div class="row">
                <div class="col-md-12 login-form-1">
                    <h3>Welcome back!</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Email *" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Your Password *" />
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Login" />
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Forget Password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

class OpenNewDiscussionForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            sent: false,
            temp: []
        }
    }

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
                    <input type="file" class="form-control-file" id="files" name="files" multiple required />
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

export {SignUpForm, LoginForm, OpenNewDiscussionForm, AddComment};