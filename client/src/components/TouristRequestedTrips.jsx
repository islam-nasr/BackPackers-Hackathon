import axios from "axios";
import React, { Component } from "react";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

export default class TouristRequestedTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
    // this.trips = [
    //   {
    //     country: "Egypt",
    //     cities: ["Cairo", "Luxor"],
    //     startDate: "9-9-2019",
    //     endDate: "10-10-2019",
    //     averagePrice: 10000
    //   },
    //   {
    //     country: "Egypt",
    //     cities: ["Hurghada", "Gouna"],
    //     startDate: "9-9-2019",
    //     endDate: "10-10-2019",
    //     averagePrice: 100000
    //   }
    // ];
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/trips/ReadAllOfUser/5d3fb9cd674879336cc0c1fa"
      )
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
        <div class="back">
          <TopNavbar />
          <div class="container pt-5">
            <h1 class="my-4">Requested Trips</h1>
            {this.state.trips
              .filter(trip => {
                return (
                  new Date(trip.startDate).getTime() > Date.now() &&
                  trip.acceptedOffer == null
                );
              })
              .map(trip => (
                <>
                  <div class="row">
                    <div class="col-md-7">
                      <img
                        class="img-fluid rounded mb-3 mb-md-0"
                        src={"/place-" + trip.cities[0] + ".jpg"}
                      />
                    </div>
                    <div class="col-md-5">
                      <h3>Your trip to {trip.country}</h3>
                      <p>
                        Cities to visit: {trip.cities.join(", ")}
                        <br />
                        From: {trip.startDate.substring(0, 10)}
                        <br />
                        To: {trip.endDate.substring(0, 10)}
                        <br />
                        Average Price: {trip.averagePrice}
                      </p>
                      <a
                        class="btn btn-primary"
                        href={"/tourist/RequestedTripsOffers/" + trip._id}
                      >
                        View Offers
                      </a>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
          </div>
          <br />
          <br />
          <Footer />
        </div>
      </div>
    );
  }
}
