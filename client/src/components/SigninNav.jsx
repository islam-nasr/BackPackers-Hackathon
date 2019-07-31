import React from "react";
import { Navbar, Nav } from "react-bootstrap";

class SigninNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar scrolling dark expand="md" fixed="top">
          <Navbar.Brand href="/">BackPackers</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/About-Us">About Us</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default SigninNav;
