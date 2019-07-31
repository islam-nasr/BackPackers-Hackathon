import React, { Component } from "react";
import Footer from "./Footer";
import FacebookLoginWithButton from "react-facebook-login";
import GoogleLogin from "react-google-login";
import SigninNav from "./SigninNav";

export default class Signin extends Component {
  render() {
    const responseFacebook = response => {
      console.log(response);
    };
    const componentClicked = () => {
      console.log("Clicked!");
    };
    const responseGoogle = response => {
      console.log(response);
    };
    return (
      <div class="signin-background">
        {/* <HomeNavbar /> */}
        <SigninNav />
        <br />
        <br />
        <br />
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">
                <div class="card-body">
                  <h5 class="card-title text-center">Sign In</h5>
                  <form class="form-signin">
                    <div class="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        class="form-control"
                        placeholder="Email address"
                        required
                        autofocus
                      />
                      <label for="inputEmail">Email address</label>
                    </div>
                    <div class="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        class="form-control"
                        placeholder="Password"
                        required
                      />
                      <label for="inputPassword">Password</label>
                    </div>
                    <div class="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />
                      <label class="custom-control-label" for="customCheck1">
                        Remember password
                      </label>
                    </div>
                    <button
                      class="btn btn-lg btn-outline-info btn-block text-uppercase"
                      type="submit"
                    >
                      Sign in
                    </button>
                    <div class="my-4">
                      <FacebookLoginWithButton
                        appId="1206715649505081"
                        autoLoad
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}
                        icon="fa-facebook"
                      />
                      <br />
                      <br />
                      <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                      {/* <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button> */}
                      {/* <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}
