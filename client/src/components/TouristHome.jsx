import React, { Component } from "react";
import TopNavbar from "./TopNavbar";
import { Carousel } from "react-bootstrap";
import Footer from "./Footer";

class TouristHome extends Component {
  render() {
    return (
      <div>
        <TopNavbar />
        <header>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"/tourist-home1.jpg"}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={e =>
                    this.props.history.push("/tourist/RequestTrips")
                  }
                >
                  Start a trip
                </h3>
                <p>
                  Start a customized trip and wait for the offers from our
                  packbackers.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"/tourist-home2.jpg"}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={e =>
                    this.props.history.push("/tourist/TouristRequestedTrips")
                  }
                >
                  Requested Trips
                </h3>
                <p>View your requested trips.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"/tourist-home3.jpg"}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={e =>
                    this.props.history.push("/tourist/UpcomingTrips")
                  }
                >
                  Upcoming trips
                </h3>
                <p>View your upcoming trips.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"/tourist-home4.jpg"}
                alt="Third slide"
                onClick={e => alert("hi")}
              />
              <Carousel.Caption>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={e =>
                    this.props.history.push("/tourist/PreviousTrips")
                  }
                >
                  Previous trips
                </h3>
                <p>View your previous trips.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </header>
        <section class="py-5">
          <div class="container">
            <h1 class="font-weight-light">Get started with BackPackers!</h1>
            <p class="lead">
              Now traveling around Egypt is made easier with BackPackers, get
              accompanied with our tour guides that will help you visit Egypt's
              magnifecent places and cities.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default TouristHome;
