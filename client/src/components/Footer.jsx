import React from "react";
import { Nav } from "react-bootstrap";
import "../footer.css";
import { CardFooter } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <body class="d-flex flex-column">
        <CardFooter id="sticky-footer" class="py-4 bg-dark text-white-50">
          <div class="container text-center">
            <small>Copyright &copy; Back-Packers</small>
            <Nav.Link href="/Contact-Us">Contact Us</Nav.Link>
          </div>
        </CardFooter>
      </body>
    );
  }
}

export default Footer;
