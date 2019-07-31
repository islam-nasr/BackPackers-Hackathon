import React from "react";
import Footer from "./Footer";
import SigninNav from "./SigninNav";

class Contact extends React.Component {
  render() {
    return (
      <div>
        {/* <TopNavbar /> */}
        <div class="back">
          <SigninNav />
          <br />
          <br />
          <br />
          <div class="container">
            <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Contact Us</h5>
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
                          type="text"
                          id="inputMessage"
                          class="form-control"
                          placeholder="Comment"
                          required
                        />
                        <label for="inputMessage">Comment</label>
                      </div>
                      <button
                        class="btn btn-lg btn-outline-info btn-block text-uppercase"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Contact;

// <div class="container contact">
// 	<div class="row">
// 		<div class="col-md-3">
// 			<div class="contact-info">
//                 <br/>
// 				<img src={contact} alt="image"/>

// 			</div>
// 		</div>
// 		<div class="col-md-9">
// 			<div class="contact-form">
// 				<div class="form-group">
//                     <br/>
// 				  <label class="control-label col-sm-2" for="fname">First Name:</label>
// 				  <div class="col-sm-10">
// 					<input type="text" class="form-control" id="fname" placeholder="Enter First Name" name="fname"></input>
// 				  </div>
// 				</div>
// 				<div class="form-group">
// 				  <label class="control-label col-sm-2" for="lname">Last Name:</label>
// 				  <div class="col-sm-10">
// 					<input type="text" class="form-control" id="lname" placeholder="Enter Last Name" name="lname"></input>
// 				  </div>
// 				</div>
// 				<div class="form-group">
// 				  <label class="control-label col-sm-2" for="email">Email:</label>
// 				  <div class="col-sm-10">
// 					<input type="email" class="form-control" id="email" placeholder="Enter email" name="email"></input>
// 				  </div>
// 				</div>
// 				<div class="form-group">
// 				  <label class="control-label col-sm-2" for="comment">Comment:</label>
// 				  <div class="col-sm-10">
// 					<textarea class="form-control" rows="5" id="comment"></textarea>
// 				  </div>
// 				</div>
// 				<div class="form-group">
// 				  <div class="col-sm-offset-2 col-sm-10">
//                     <Button  onClick={e=>alert('Submitted Successfully')} variant="info">Submit</Button>

// 				  </div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// </div>
