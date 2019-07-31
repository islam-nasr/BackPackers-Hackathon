import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

class TopNavbarGuide extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      usertype: "Guide"
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if (this.state.usertype === "Guide") {
      return (
        <div>
          <Navbar scrolling dark expand="md" fixed="top">
            <Navbar.Brand href="/">BackPackers</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/tourguide/home">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/signin">Log Out</Nav.Link>
              <Nav.Link href="/About-Us">About Us</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar scrolling dark expand="md" fixed="top">
            <Navbar.Brand href="/">BackPackers</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/tourist/home">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/signin">Log Out</Nav.Link>
              <Nav.Link href="/About-Us">About Us</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
        </div>
      );
    }
  }
}

export default TopNavbarGuide;
