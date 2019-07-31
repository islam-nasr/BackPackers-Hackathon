import axios from "axios";
import React, { Component } from "react";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import PlacesEditor from "./PlacesEditor";
import TransporationEditor from "./TransportationEditor";
import { UncontrolledCarousel } from "reactstrap";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";

export default class TouristRequestedTripsOffersInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorShown: false,
      offer: {},
      images: [],
      places: [],
      loaded: false,
      isShowing: false
    };
    // this.offer = {
    //   places: [
    //     {
    //       place: {
    //         name: "Tiran Island",
    //         address: {
    //           city: "Sharm",
    //           locationURL: ""
    //         },
    //         image: "tiran",
    //         tags: ["Culture", "History"]
    //       },
    //       from: "2019-10-10 09:00:00.000",
    //       to: "2019-11-11 09:00:00.000"
    //     },
    //     {
    //       place: {
    //         name: "Blue Hole",
    //         address: {
    //           city: "Dahab",
    //           locationURL: ""
    //         },
    //         image: "bluehole",
    //         tags: ["Culture", "History"]
    //       },
    //       from: "2019-11-11 09:00:00.000",
    //       to: "2019-12-12 09:00:00.000"
    //     }
    //   ],
    //   transportations: [
    //     {
    //       from: "Sharm",
    //       to: "Dahab",
    //       by: "Bus",
    //       departureTime: "2019-10-10 07:00:00.000",
    //       arrivalTime: "2019-10-10 015:00:00.000"
    //     },
    //     {
    //       from: "Dahab",
    //       to: "Sharm",
    //       by: "Car",
    //       departureTime: "2019-11-11 08:00:00.000",
    //       arrivalTime: "2019-11-11 20:00:00.000"
    //     }
    //   ],
    //   price: 100000
    // };
    // [
    //   {
    //     src: "https://picsum.photos/450/300?image=1072",
    //     caption: this.trip.destination,
    //     header: "Slide 1 Header"
    //   },
    //   {
    //     src: "https://picsum.photos/450/300?image=855",
    //     header: "Slide 1 Header",
    //     caption: "dd"
    //   },
    //   {
    //     src: "https://picsum.photos/450/300?image=355",
    //     header: "Slide 1 Header",
    //     caption: "Slide 3"
    //   }
    // ];
    // this.place = [
    //     {
    //       name: 'Great Pyramids',
    //       address: 'Giza, Egypt',
    //       tags: ['Culture', 'History'],
    //       lat: 29.9773,
    //       long: 31.1325,
    //     }
    //    ];
  }
  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  };
  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/offers/read/" +
          this.props.match.params.offerID
      )
      .then(res => {
        this.setState({
          offer: res.data.data
        });
        let items = [];
        let places = [];
        for (let i = 0; i < this.state.offer.places.length; i++) {
          items.push({
            src: "/place-" + this.state.offer.places[i].place.image + ".jpg",
            caption: this.state.offer.places[i].place.address.city,
            header: this.state.offer.places[i].place.name
          });
          places.push({
            name: this.state.offer.places[i].place.name,
            location: this.state.offer.places[i].place.address.city,
            tags: this.state.offer.places[i].place.tags,
            from: this.state.offer.places[i].from.substring(0, 21),
            to: this.state.offer.places[i].to.substring(0, 21),
            lat: 29.9773,
            long: 31.1325
          });
        }
        this.setState({
          images: items,
          places: places,
          loaded: true
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  accept() {
    axios
      .post(
        "http://localhost:5000/api/offers/accept/" +
          this.props.match.params.offerID +
          "/" +
          this.props.match.params.tripID +
          "/5d3fb9cd674879336cc0c1fa"
      )
      .then(res => {
        alert("Offer accepted successfully");
      })
      .catch(error => {
        alert(error.message);
      });
  }
  reject() {
    axios
      .delete(
        "http://localhost:5000/api/offers/delete/" +
          this.props.match.params.offerID +
          "/" +
          this.props.match.params.tripID +
          "/5d3fb9cd674879336cc0c1fa"
      )
      .then(res => {
        alert("Offer rejected successfully");
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
          <br />
          <>
            <div class="container py-3">
              <div class="h1 text-center">
                Egypt offer <br />
                Offered by:
                <a href={"/profile/" + this.state.offer.tourguide._id}>
                  {" "}
                  {this.state.offer.tourguide.name}{" "}
                </a>
              </div>
              <br />
              <div class="col-md-15">
                <UncontrolledCarousel items={this.state.images} />
              </div>
              <br />
              <Card>
                <Card.Header>
                  <b>offer planner</b>
                </Card.Header>
                <Card.Body>
                  <Form action="home">
                    <Card.Text>
                      <p class="card-info">
                        Price: {this.state.offer.price} LE <br />
                      </p>
                      <h3>Visited Places</h3>
                      <PlacesEditor
                        readOnly
                        places={this.state.places}
                        showRestoreButton
                        editTimes
                        onPlacesChanged={places =>
                          this.setState({
                            places: places
                          })
                        }
                      />
                      <h3>Transportation</h3>
                      <TransporationEditor
                        readOnly
                        transportations={this.state.offer.transportations}
                      />
                    </Card.Text>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </>
          <Container className="mt-3">
            <Button
              variant="outline-success"
              href="/tourist/UpcomingTrips"
              size="lg"
              block
              onClick={() => {
                this.accept();
              }}
            >
              Accept
            </Button>
          </Container>
          <Container className="mt-3">
            <Button
              variant="outline-danger"
              size="lg"
              block
              onClick={() => {
                this.setState({
                  selectorShown: true
                });
              }}
            >
              Reject
            </Button>
          </Container>
          <Modal
            show={this.state.selectorShown}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={e =>
              this.setState({
                selectorShown: false
              })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Reason of Rejecting
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="We will help you to get what you want"
              />
              <Button
                variant="outline-danger"
                href={
                  "/tourist/RequestedTripsOffers/" +
                  this.props.match.params.tripID
                }
                onClick={() => {
                  this.reject();
                }}
              >
                Reject Trip
              </Button>
            </Modal.Body>
          </Modal>
          <br />
          <Footer />
        </div>
      </div>
    );
  }
}
