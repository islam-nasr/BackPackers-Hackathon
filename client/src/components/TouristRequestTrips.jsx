import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Container, Nav, Form } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import PlacesEditor from "./PlacesEditor";

export default class TouristRequestTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      maxStep: 0,
      startDate: "",
      endDate: "",
      country: "Egypt",
      averagePrice: 5000,
      statedStatesOnly: false,
      statedPlacesOnly: false,
      states: [],
      places: []
    };
    this.states = ["Cairo", "Luxor", "Alexandria"];
  }
  nextStep() {
    if (this.state.step < 2) {
      let newStep = this.state.step + 1;
      this.setState({
        step: newStep,
        maxStep: this.state.maxStep > newStep ? this.state.maxStep : newStep
      });
    } else {
    }
  }
  addDestination(destination) {
    if (!this.state.states.includes(destination)) {
      this.setState({
        states: [...this.state.states, destination]
      });
    }
  }
  removeDestination(destination) {
    this.setState({
      states: this.state.states.filter(i => i !== destination)
    });
  }
  submit() {
    let trip = {
      country: this.state.country,
      cities: this.state.states,
      places: this.state.places,
      statedStatesOnly: this.state.statedStatesOnly,
      statedPlacesOnly: this.state.statedPlacesOnly,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      averagePrice: this.state.averagePrice
    };
    axios.post(
      "http://localhost:5000/api/trips/create/5d3fb9cd674879336cc0c1fa",
      trip
    );
    this.props.history.push("/tourist/home");
  }
  render() {
    return (
      <div class="back">
        <br />
        <br />
        <div>
          <TopNavbar />
          <Container className="pt-5">
            <Card>
              <Card.Header>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link
                      onClick={e => this.setState({ step: 0 })}
                      active={this.state.step === 0}
                    >
                      Basic information
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={e => this.setState({ step: 1 })}
                      active={this.state.step === 1}
                      disabled={this.state.maxStep < 1}
                    >
                      Destinations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={e => this.setState({ step: 2 })}
                      active={this.state.step === 2}
                      disabled={this.state.maxStep < 2}
                    >
                      Trip suggestions
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Form action="home">
                  {this.state.step === 0 && (
                    <>
                      <Card.Title>Schedule your trip</Card.Title>
                      <Card.Text>
                        <Form.Group>
                          <Form.Label>Destination</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={e =>
                              this.setState({ country: e.target.value })
                            }
                            defaultValue={this.state.country}
                          >
                            <option value="Egypt">Egypt</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Start date</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={e =>
                              this.setState({ startDate: e.target.value })
                            }
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>End date</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={e =>
                              this.setState({ endDate: e.target.value })
                            }
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Budget suggestion</Form.Label>
                          <Form.Control
                            type="number"
                            onChange={e =>
                              this.setState({ averagePrice: e.target.value })
                            }
                            defaultValue={this.state.averagePrice}
                          />
                        </Form.Group>
                      </Card.Text>
                      <Button variant="primary" onClick={e => this.nextStep()}>
                        Next
                      </Button>
                    </>
                  )}
                  {this.state.step === 1 && (
                    <>
                      <Card.Title>Choose your trip destinations</Card.Title>
                      <Card.Text>
                        {this.states.map(destination => (
                          <>
                            <Card>
                              <Card.Img
                                variant="top"
                                src={
                                  "/banner-" +
                                  destination.toLowerCase() +
                                  ".jpg"
                                }
                              />
                              <Card.Body>
                                <Card.Title>{destination}</Card.Title>
                                {this.state.states.includes(destination) ? (
                                  <Button
                                    variant="danger"
                                    onClick={e =>
                                      this.removeDestination(destination)
                                    }
                                  >
                                    Remove from destinations
                                  </Button>
                                ) : (
                                  <Button
                                    variant="info"
                                    onClick={e =>
                                      this.addDestination(destination)
                                    }
                                  >
                                    I'd like to visit this place
                                  </Button>
                                )}
                              </Card.Body>
                            </Card>
                          </>
                        ))}
                        {this.state.states.length > 0 && (
                          <>
                            <br />
                            Selected destinations:{" "}
                            <b>{this.state.states.join(", ")}</b>
                          </>
                        )}
                        <br />
                        <Form.Check
                          label="Limit the tour guide's choices to only these destinations"
                          type="checkbox"
                          onChange={e =>
                            this.setState({ statedStatesOnly: e.target.value })
                          }
                          defaultValue={this.state.statedStatesOnly}
                        />
                      </Card.Text>
                      <Button variant="primary" onClick={e => this.nextStep()}>
                        Next
                      </Button>
                    </>
                  )}
                  {this.state.step === 2 && (
                    <>
                      <Card.Title>Got any preferences?</Card.Title>
                      <Card.Text>
                        You may choose a list of places you'd like to visit, or
                        you may skip this step.
                        <br />
                        <br />
                        <PlacesEditor
                          onPlacesChanged={places =>
                            this.setState({ places: places })
                          }
                        />
                        <Form.Check
                          label="Limit the tour guide's choices to only these places"
                          type="checkbox"
                          onChange={e =>
                            this.setState({ statedPlacesOnly: e.target.value })
                          }
                          defaultValue={this.state.statedPlacesOnly}
                        />
                      </Card.Text>
                      <Button variant="primary" onClick={e => this.submit()}>
                        Finish
                      </Button>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Container>
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
