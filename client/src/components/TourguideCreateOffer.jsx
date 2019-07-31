import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import PlacesEditor from "./PlacesEditor";
import TransporationEditor from "./TransportationEditor";

export default class TourguideCreateOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      //{
      //   name: "Person",
      //   startDate: "25/7/2019",
      //   endDate: "30/7/2019",
      //   country: "Egypt",
      //   averagePrice: 5000,
      //   statedStatesOnly: false,
      //   statedPlacesOnly: false,
      //   states: ["Cairo", "Luxor"],
      //   places: [
      //     {
      //       name: "Great Pyramids",
      //       location: "Giza, Egypt",
      //       tags: ["Culture", "History"],
      //       pinned: false,
      //       lat: 29.9773,
      //       long: 31.1325
      //     },
      //     {
      //       name: "Nile Cruise",
      //       location: "Cairo, Egypt",
      //       tags: ["Nature"],
      //       pinned: true,
      //       lat: 30.0444,
      //       long: 31.2357
      //     }
      //   ]
      // },
      offerPrice: 0,
      places: [],
      transportations: [],
      states: [],
      loaded: false
    };
    //this.states = ["Cairo", "Luxor"];
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/trips/read/" + this.props.match.params.tripID
      )
      .then(res => {
        this.setState({
          trip: res.data.data,
          offerPrice: res.data.data.averagePrice
        });
        if (this.state.trip.states && this.state.trip.states.length > 0) {
          this.setState({
            states: this.state.trip.states,
            loaded: true
          });
        } else {
          if (this.state.trip.cities && this.state.trip.cities.length > 0)
            this.setState({
              states: this.state.trip.cities,
              loaded: true
            });
          else {
            this.setState({
              states: ["Cairo", "Hurgada"],
              loaded: true
            });
          }
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }
  submit() {
    let offer = {
      places: this.state.places.map(place => {
        return {
          from: place.from,
          to: place.to,
          place: place
        };
      }),
      transportations: this.state.transportations,
      price: Math.floor(this.state.offerPrice*1.12)
    };
    console.log(offer);
    axios
      .post(
        "http://localhost:5000/api/offers/create/" +
          this.props.match.params.tripID +
          "/" +
          this.props.match.params.tourguideID +
          "/5d3fb9cd674879336cc0c1fa",
        offer
      )
      .then(res => {
        console.log(res);
        this.props.history.push("/tourguide/home");
      });
  }
  render() {
    if (!this.state.loaded) return <div />;
    let trip = this.state.trip;
    return (
      <div class="back">
        <div>
          <TopNavbar />
          <Container className="pt-5">
            <Card className="trip-banner">
              <Card.Header>
                {trip.tourist.name}'s trip to {this.state.states.join(", ")} on{" "}
                {trip.startDate.substring(0, 10)}
              </Card.Header>
              <div>
                {console.log(this.state.states)}
                <Card.Img
                  variant="bottom"
                  src={"/banner-" + this.state.states[0].toLowerCase() + ".jpg"}
                  alt="Card image"
                />
                <Card.ImgOverlay>
                  <Card.Text style={{ lineHeight: "26pt" }}>
                    Start date: <b>{trip.startDate.substring(0, 10)}</b>
                    <br />
                    End date: <b>{trip.endDate.substring(0, 10)}</b>
                    <br />
                    Budget: <b>{trip.averagePrice}</b>
                    <br />
                    The person{" "}
                    <b>is {!trip.statedStatesOnly && "not"} limited</b> to the
                    selected destinations ({this.state.states.join(", ")})
                    <br />
                    The person{" "}
                    <b>is {!trip.statedPlacesOnly && "not"} limited</b> to the
                    selected places
                  </Card.Text>
                </Card.ImgOverlay>
              </div>
            </Card>
            <Card>
              <Card.Header>
                <b>Trip planner</b>
              </Card.Header>
              <Card.Body>
                <Form action="home">
                  <Card.Text>
                    <PlacesEditor
                      places={this.state.trip.places}
                      showRestoreButton
                      editTimes
                      onPlacesChanged={places =>
                        this.setState({ places: places })
                      }
                    />
                    <TransporationEditor
                      onTransportationsChanged={transportations =>
                        this.setState({ transportations: transportations })
                      }
                    />
                  </Card.Text>
                  <Form.Group>
                    <Form.Label>Offer price</Form.Label>
                    <Form.Control
                      type="number"
                      value={this.state.offerPrice}
                      onChange={e =>
                        this.setState({ offerPrice: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={e => this.submit()}>
                    Submit offer
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
          <br />
          <br />
          <Footer />
        </div>
      </div>
    );
  }
}
