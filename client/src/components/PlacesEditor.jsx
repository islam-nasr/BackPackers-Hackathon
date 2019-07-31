import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Table, Badge, Modal } from "react-bootstrap";
import GoogleMapReact from "google-map-react";

class PlacesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      selectorShown: false,
      showRestoreButton: this.props.showRestoreButton ? true : false,
      editTimes: this.props.editTimes ? true : false,
      readOnly: this.props.readOnly ? true : false,
      allPlaces: []
    };
    this.state.initialPlaces = this.props.places
      ? this.placesReassignIndex([...this.props.places])
      : [];
    this.state.places = [...this.state.initialPlaces];
    // this.allPlaces = [
    //   {
    //     name: "Great Pyramids",
    //     location: "Giza, Egypt",
    //     tags: ["Culture", "History"],
    //     lat: 29.9773,
    //     long: 31.1325
    //   },
    //   {
    //     name: "Nile Cruise",
    //     location: "Cairo, Egypt",
    //     tags: ["Nature"],
    //     lat: 30.0444,
    //     long: 31.2357
    //   }
    // ];
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/places/readAll")
      .then(res => {
        res.data.data.forEach(place => {
          let parts = [];
          if (place.address.city && place.address.city !== "")
            parts.push(place.address.city);
          if (place.address.state && place.address.state !== "")
            parts.push(place.address.state);
          if (place.address.country && place.address.country !== "")
            parts.push(place.address.country);
          place.location = parts.join(", ");
        });
        this.setState({ allPlaces: res.data.data });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  /*addInterest(interest) {
    if (!this.state.interests.includes(interest)) {
      this.setState({
        interests: [...this.state.interests, interest]
      })
    }
  }
  removeInterest(interest) {
    console.log(interest);
    this.setState({
      interests: this.state.interests.filter(i => i != interest)
    })
  }*/
  placeAdd(place) {
    let newPlace = { ...place };
    if (this.state.editTimes) {
      newPlace.from = "";
      newPlace.to = "";
    }
    let places = [...this.state.places, newPlace];
    this.placesReassignIndex(places);
    this.setState({ places: places, selectorShown: false });
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(places);
    }
  }
  placeDown(i) {
    if (i < this.state.places.length) {
      let places = this.state.places;
      let place = places[i - 1];
      places.splice(i - 1, 1);
      places.splice(i, 0, place);
      this.placesReassignIndex(places);
      this.setState({ places: places });
      if (this.props.onPlacesChanged) {
        this.props.onPlacesChanged(places);
      }
    }
  }
  placeUp(i) {
    if (i > 1) {
      let places = this.state.places;
      let place = places[i - 1];
      places.splice(i - 1, 1);
      places.splice(i - 2, 0, place);
      this.placesReassignIndex(places);
      this.setState({ places: places });
      if (this.props.onPlacesChanged) {
        this.props.onPlacesChanged(places);
      }
    }
  }
  placeRemove(i) {
    let places = this.state.places;
    places.splice(i - 1, 1);
    this.placesReassignIndex(places);
    this.setState({ places: places });
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(places);
    }
  }
  placesReassignIndex(places) {
    let i = 1;
    places.forEach(place => {
      place.i = i++;
      if (this.state.editTimes) {
        if (!place.from) place.from = "";
        if (!place.to) place.to = "";
      }
    });
    return places;
  }
  getFilteredPlaces() {
    let filter = this.state.filter.toLowerCase();
    let unpinnedPlaces = this.state.allPlaces.filter(place => !place.pinned);
    let pinnedPlaces = this.state.allPlaces.filter(place => place.pinned);
    let places = pinnedPlaces.concat(unpinnedPlaces);
    return places.filter(place => {
      let foundInSelected = false;
      this.state.places.forEach(selectedPlace => {
        if (selectedPlace.name === place.name) foundInSelected = true;
      });
      if (foundInSelected) return false;
      if (filter === "") return true;
      if (
        place.name.toLowerCase().includes(filter) ||
        place.location.toLowerCase().includes(filter)
      )
        return true;
      let foundInTags = false;
      place.tags.forEach(tag => {
        if (tag.toLowerCase().includes(filter)) foundInTags = true;
      });
      if (foundInTags) return true;
      return false;
    });
  }
  render() {
    return (
      <div>
        {/*<div style={{width: '100%', height: '250px'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCfC28qR0pC0R0YT2zERWNP-TUhTO5W8i4' }}
            defaultCenter={{lat: 30.0444, lng: 31.2357}}
            defaultZoom={11}
          >
            {this.state.places.map(place =>
              <div style={{
                color: 'white', 
                background: 'brown',
                padding: '5px 5px',
                display: 'inline-flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100%',
                opacity: '0.5',
                transform: 'translate(-50%, -50%)'
              }} lat={place.lat} lng={place.long}>
                #{place.i}
              </div>
            )}
          </GoogleMapReact>
        </div>*/}
        <Modal
          show={this.state.selectorShown}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={e => this.setState({ selectorShown: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Select a place
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Search"
              onChange={e => this.setState({ filter: e.target.value })}
            />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.getFilteredPlaces().map(place => (
                  <tr>
                    <td>
                      {place.name}{" "}
                      {place.pinned && (
                        <Badge variant="warning" style={{ color: "white" }}>
                          Featured
                        </Badge>
                      )}
                    </td>
                    <td>{place.location}</td>
                    <td>
                      {place.tags.map(tag => (
                        <>
                          <Badge pill variant="info">
                            {tag}
                          </Badge>
                          &nbsp;
                        </>
                      ))}
                    </td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={e => this.placeAdd(place)}
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.setState({ selectorShown: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {!this.state.readOnly && (
          <p>
            <Button
              variant="info"
              onClick={e => this.setState({ selectorShown: true, filter: "" })}
            >
              Add Place
            </Button>{" "}
            {this.state.showRestoreButton && (
              <Button
                variant="info"
                onClick={e =>
                  this.setState({
                    places: this.placesReassignIndex([
                      ...this.state.initialPlaces
                    ])
                  })
                }
              >
                Restore Suggested Places
              </Button>
            )}
          </p>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              {this.state.editTimes && <th>Schedule</th>}
              <th>Name</th>
              <th>Location</th>
              <th>Tags</th>
              <th>Location</th>
              {!this.state.readOnly && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {this.state.places.map(place => (
              <tr>
                <td>{place.i}</td>
                {this.state.editTimes && (
                  <td>
                    <Form.Group>
                      <Form.Label>From</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        readOnly={this.state.readOnly}
                        value={place.from}
                        onChange={e => {
                          place.from = e.target.value;
                          this.setState({ places: this.state.places });
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>To</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        readOnly={this.state.readOnly}
                        value={place.to}
                        onChange={e => {
                          place.to = e.target.value;
                          this.setState({ places: this.state.places });
                        }}
                      />
                    </Form.Group>
                  </td>
                )}
                <td>
                  {place.name}{" "}
                  {place.pinned && (
                    <Badge variant="warning" style={{ color: "white" }}>
                      Featured
                    </Badge>
                  )}
                </td>
                <td>{place.location}</td>
                <td>
                  {place.tags.map(tag => (
                    <>
                      <Badge pill variant="info">
                        {tag}
                      </Badge>
                      &nbsp;
                    </>
                  ))}
                </td>
                <td style={{ padding: "4px", width: "250px", height: "250px" }}>
                  <div style={{ width: "100%", height: "100%" }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyCfC28qR0pC0R0YT2zERWNP-TUhTO5W8i4"
                      }}
                      center={{ lat: place.lat, lng: place.long }}
                      zoom={11}
                      options={{
                        fullscreenControl: false,
                        zoomControl: false,
                        scaleControl: false,
                        rotateControl: false
                      }}
                    >
                      <div
                        style={{
                          color: "white",
                          background: "brown",
                          padding: "10px 10px",
                          display: "inline-flex",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "100%",
                          opacity: "0.5",
                          transform: "translate(-50%, -50%)"
                        }}
                        lat={place.lat}
                        lng={place.long}
                      >
                        #{place.i}
                      </div>
                    </GoogleMapReact>
                  </div>
                </td>
                {!this.state.readOnly && (
                  <td>
                    <Button
                      style={{ marginBottom: "5px" }}
                      variant="outline-info"
                      size="sm"
                      onClick={e => this.placeUp(place.i)}
                    >
                      Up
                    </Button>{" "}
                    <Button
                      style={{ marginBottom: "5px" }}
                      variant="outline-info"
                      size="sm"
                      onClick={e => this.placeDown(place.i)}
                    >
                      Down
                    </Button>{" "}
                    <Button
                      style={{ marginBottom: "5px" }}
                      variant="outline-danger"
                      size="sm"
                      onClick={e => this.placeRemove(place.i)}
                    >
                      Remove
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PlacesEditor;
