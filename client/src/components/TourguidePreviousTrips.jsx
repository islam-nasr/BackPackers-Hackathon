import axios from "axios";
import React, { Component } from "react";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

export default class TourguidePreviousTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
    // this.trip = {
    //   country: "Egypt",
    //   cities: ["Sharm", "Dahab"],
    //   startDate: "9/9/2019",
    //   endDate: "15/9/2019",
    //   averagePrice: 4000,
    //   image: "sharm",
    //   acceptedOffer: {
    //     places: [
    //       {
    //         place: {
    //           name: "Tiran Island",
    //           address: {
    //             city: "Sharm",
    //             locationURL: ""
    //           },
    //           image: "tiran",
    //           tags: ["Culture", "History"]
    //         },
    //         day: "19/9/2019",
    //         from: "14:30",
    //         to: "17:20"
    //       },
    //       {
    //         place: {
    //           name: "Blue Hole",
    //           address: {
    //             city: "Dahab",
    //             locationURL: ""
    //           },
    //           image: "bluehole",
    //           tags: ["Culture", "History"]
    //         },
    //         day: "19/9/2019",
    //         from: "14:30",
    //         to: "17:20"
    //       }
    //     ],
    //     tourguide: { name: "Omar Saad" },
    //     transportations: [
    //       {
    //         from: "Sharm",
    //         to: "Dahab",
    //         by: "Bus",
    //         departureTime: "",
    //         arrivalTime: ""
    //       },
    //       {
    //         from: "Dahab",
    //         to: "Sharm",
    //         by: "Car",
    //         departureTime: "",
    //         arrivalTime: ""
    //       }
    //     ]
    //   }
    //   // ratings: [ratingSchema]
    // };
    // places: [
    //     {
    //       name: 'Great Pyramids',
    //       location: 'Giza, Egypt',
    //       tags: ['Culture', 'History'],
    //       lat: 29.9773,
    //       long: 31.1325,
    //     },
    // let items = [];
    // let places = [];
    // for (let i = 0; i < this.trip.acceptedOffer.places.length; i++) {
    //   items.push({
    //     src: "/place-" + this.trip.acceptedOffer.places[i].place.image + ".jpg",
    //     caption: this.trip.acceptedOffer.places[i].place.address.city,
    //     header: this.trip.acceptedOffer.places[i].place.name
    //   });
    //   places.push({
    //     name: this.trip.acceptedOffer.places[i].place.name,
    //     location: this.trip.acceptedOffer.places[i].place.address.city,
    //     tags: this.trip.acceptedOffer.places[i].place.tags,
    //     lat: 29.9773,
    //     long: 31.1325
    //   });
    // }
    // this.imgs = items;
    // this.places = places;
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/trips/ReadByTourguide/5d3fb9f0674879336cc0c1fb"
      )
      .then(res => {
        this.setState({
          trips: res.data.data
        });
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
            <h1 class="my-4">Previous Trips</h1>
            {this.state.trips
              .filter(trip => {
                return (
                  new Date(trip.startDate).getTime() < Date.now() &&
                  trip.acceptedOffer != null
                );
              })
              .map(trip => (
                <>
                  <div class="row">
                    <div class="col-md-7">
                      <img
                        class="img-fluid rounded mb-3 mb-md-0"
                        src={"/place-" + trip.cities[0].toLowerCase() + ".jpg"}
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
                        href={"/tourist/previousTrip/" + trip._id}
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
