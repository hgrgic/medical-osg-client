import React from 'react';

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

export {SignUpForm, LoginForm};