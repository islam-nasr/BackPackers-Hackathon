import axios from "axios";
import React from "react";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import Rate from "./EditableRate";

export default class RateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourguideFeedback: "",
      tourguideStars: 1,
      tripFeedback: "",
      tripStars: 1
    };
  }
  onSubmit() {
    axios
      .post(
        "http://localhost:5000/api/ratings/CreateForTourguide/5d3fb9f0674879336cc0c1fb/5d3fb9cd674879336cc0c1fa",
        {
          feedback: this.state.tourguideFeedback,
          stars: this.state.tourguideStars
        }
      )
      .then(res => {})
      .catch(error => {
        alert(error.message);
      });
    axios
      .post(
        "http://localhost:5000/api/ratings/CreateForTrip/" +
          this.props.match.params.tripID +
          "/5d3fb9cd674879336cc0c1fa",
        {
          feedback: this.state.tripFeedback,
          stars: this.state.tripStars
        }
      )
      .then(res => {})
      .catch(error => {
        alert(error.message);
      });
  }
  render() {
    return (
      <div>
        <TopNavbar />
        <div class="back">
          {/* <SigninNav /> */}
          <br />
          <br />
          <br />
          <div class="container">
            <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Rating</h5>
                    <form class="form-signin">
                      <div class="form-label-group">
                        <input
                          type="description"
                          id="inputRateGuide"
                          class="form-control"
                          placeholder="Comment"
                          onChange={e =>
                            this.setState({
                              tourguideFeedback: e.target.value
                            })
                          }
                          required
                          autofocus
                        />
                        <label for="inputRateGuide">Review tourguide...</label>
                      </div>
                      <label for="RateGuide">Rate tourguide: </label>
                      <Rate onStarClick={this.state.tourguideStars} />
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="inputMessage"
                          class="form-control"
                          placeholder="Comment"
                          onChange={e =>
                            this.setState({
                              tripFeedback: e.target.value
                            })
                          }
                          required
                          autofocus
                        />
                        <label for="inputMessage">
                          Feedback on how well was your trip...
                        </label>
                      </div>
                      <label for="RateGuide">Rate Trip: </label>
                      <Rate onStarClick={this.state.tripStars} />
                      <button
                        class="btn btn-lg btn-outline-info btn-block text-uppercase"
                        type="submit"
                        href="tourist/previousTrip"
                        onClick={() => {
                          this.onSubmit();
                        }}
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
