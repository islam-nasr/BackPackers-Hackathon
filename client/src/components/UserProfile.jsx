import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  Badge
} from "react-bootstrap";
import axios from "axios";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import NonEditableRate from "./NonEditableRate";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      birthdate: "",
      education: "",
      occupation: "",
      interests: [],
      contactNumbers: [],
      languages: [],
      passportNumber: "",
      image: "",
      rating: 3,
      loaded: false
    };
  }
  componentDidMount() {
    let id = this.props.match.params.userID;
    axios
      .get("http://localhost:5000/api/tourguides/read/" + id)
      .then(res => {
        if (res.data.data) {
          this.setState({
            ...res.data.data,
            loaded: true
          });
        } else {
          axios
            .get("http://localhost:5000/api/tourists/read/" + id)
            .then(res => {
              if (res.data.data) {
                this.setState({
                  ...res.data.data,
                  loaded: true
                });
              } else {
                this.setState({
                  name: "User not found",
                  loaded: true
                });
              }
            })
            .catch(error => {
              alert(error.message);
            });
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }
  getProfilePicture() {
    if (!this.state.image || this.state.image === "") return "/avatar.png";
    return "/" + this.state.image + ".jpg";
  }
  render() {
    if (!this.state.loaded) return <div />;
    return (
      <div>
        <TopNavbar />
        <br />
        <Container className="pt-5">
          <Row>
            <Col md="3">
              <img src={this.getProfilePicture()} className="profile-large" />
            </Col>
            <Col
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "20px"
              }}
            >
              <b style={{ fontSize: "20pt" }}>{this.state.name}</b>
              <br />
              <i>{this.state.occupation}</i>
              <br />
              <i>{this.state.education}</i>
              <br />
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: "14pt"
                }}
              >
                {this.state.interests.map(intr => (
                  <>
                    <Badge variant="info">{intr}</Badge>{" "}
                  </>
                ))}
              </span>
            </Col>
          </Row>
          <Card>
            <Card.Body>
              <i>{this.state.bio}</i>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem style={{ fontSize: "11pt" }}>
                {[
                  ["Birth date", this.state.birthdate.substring(0, 10)],
                  [
                    "Contact numbers",
                    this.state.contactNumbers.map(numb => (
                      <>
                        {numb}
                        <br />
                      </>
                    ))
                  ],
                  [
                    "Languages",
                    this.state.languages.map(lang => (
                      <>
                        {lang}
                        <br />
                      </>
                    ))
                  ],
                  ["Passport number", this.state.passportNumber]
                ].map(entry => (
                  <Row className="pb-2">
                    <Col sm={4} className="nopadding">
                      {entry[0]}:
                    </Col>
                    <Col
                      sm={8}
                      style={{
                        paddingLeft: "0px"
                      }}
                    >
                      <b>{entry[1]}</b>
                    </Col>
                  </Row>
                ))}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link>
                Rating: <NonEditableRate rate={this.state.rating} />
              </Card.Link>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <Footer />
      </div>
    );
  }
}
