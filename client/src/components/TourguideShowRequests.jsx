import React, { Component } from "react";
import axios from "axios";
import TopNavbar from "./TopNavbarGuide";
import Footer from "./Footer";

export default class TourguideShowRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/trips/ReadAll")
      .then(res => {
        this.setState({ trips: res.data.data });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  render() {
    return (
      <div>
        <TopNavbar />
        <div class="container pt-5">
          <h1 class="my-4">Requested Trips</h1>
          {this.state.trips.map(trip => (
            <>
              <div class="row">
                <div class="col-md-7">
                  <img
                    class="img-fluid rounded mb-3 mb-md-0"
                    src={"/place-" + trip.cities[0].toLowerCase() + ".jpg"}
                  />
                </div>
                <div class="col-md-5">
                  <h3>
                    Trip request to {trip.country} from{" "}
                    <a href={"/profile/" + trip.tourist._id}>
                      {trip.tourist.name}
                    </a>
                  </h3>
                  <p>
                    Cities to visit: {trip.cities.join(", ")}
                    <br />
                    From: {trip.startDate.substring(0, 10)}
                    <br />
                    To: {trip.endDate.substring(0, 10)}
                    <br />
                    Average Price: {trip.averagePrice}
                    <br />
                    Tourist wants to visit stated places only :{" "}
                    {trip.statedPlacesOnly.toString()}
                  </p>
                  <a
                    class="btn btn-primary"
                    href={
                      "/tourguide/offer" +
                      "/" +
                      trip._id +
                      "/5d3fb9f0674879336cc0c1fb"
                    }
                  >
                    Make Offer
                  </a>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
