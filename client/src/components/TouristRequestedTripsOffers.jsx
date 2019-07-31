import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

export default class TouristRequestedTripsOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      loaded: false
    };
    //   this.offers = [
    //     {
    //       places: [
    //         {
    //           place: {
    //             name: "Moez Street",
    //             address: {
    //               country: "Egypt",
    //               city: "Cairo",
    //               street: "Moez Street",
    //               locationURL: "google maps URL"
    //             },
    //             description:
    //               "going to moez street from morning uptill night watching old buildings",
    //             image: "MoezImage"
    //           },
    //           from: 10.0,
    //           to: 15.0
    //         },
    //         {
    //           place: {
    //             name: "MoezStreet",
    //             address: {
    //               country: "Egypt",
    //               city: "Cairo",
    //               street: "MoezStreet",
    //               locationURL: "location"
    //             },
    //             description: "going to moez street",
    //             image: "MoezImage"
    //           },
    //           from: 10.0,
    //           to: 15.0
    //         }
    //       ],
    //       price: 1500,
    //       image: "Cairo",
    //       transportations: [
    //         {
    //           from: "Alexandria",
    //           to: "Cairo",
    //           by: "Train",
    //           departureTime: 7.0,
    //           arrivalTime: 9.0,
    //           image: "cairo"
    //         }
    //       ]
    //     }
    //   ];
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/offers/ReadAllOfTrip/" +
          this.props.match.params.tripID
      )
      .then(res => {
        this.setState({
          offers: res.data.data.offers,
          loaded: true
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  render() {
    if (!this.state.loaded) return <div />;
    return (
      <div>
        <div class="back">
          <TopNavbar />
          <br />
          <br />
          <div className="mt-3">
            <h1 className="display-4" style={{ textAlign: "center" }}>
              Offered Trips
            </h1>
            {this.state.offers.map(offer => (
              <Container className="mt-3">
                <Card className="trip-banner">
                  <Card.Header>The offer on your trip to Egypt</Card.Header>
                  <div>
                    <Card.Img
                      variant="bottom"
                      src={"/banner-cairo.jpg"}
                      alt="Card image"
                    />
                    <Card.ImgOverlay>
                      <Card.Text>
                        Places to visit:
                        {offer.places.map(place => (
                          <h> {place.place.name} </h>
                        ))}
                      </Card.Text>
                      <Card.Text>Price: {offer.price} </Card.Text>
                      <Card.Text>
                        Offered by:{" "}
                        <a href={"/profile/" + offer.tourguide._id}>
                          {offer.tourguide.name}
                        </a>
                      </Card.Text>
                      <Button
                        href={
                          "/tourist/RequestedTripsOffersInfo/" +
                          this.props.match.params.tripID +
                          "/" +
                          offer._id
                        }
                        variant="info"
                        block
                      >
                        View details
                      </Button>
                    </Card.ImgOverlay>
                  </div>
                </Card>
              </Container>
            ))}
          </div>
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
