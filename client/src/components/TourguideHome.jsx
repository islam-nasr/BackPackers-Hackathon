import React, { Component } from "react";
import TopNavbar from "./TopNavbarGuide";
import { Carousel } from "react-bootstrap";
import Footer from "./Footer";
import "../signin.css";

class TourguideHome extends Component {
  render() {
    return (
      <div>
        <TopNavbar />
        <header>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"/tourist-home4.jpg"}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={e =>
                    this.props.history.push("/tourguide/ShowRequests")
                  }
                >
                  Show Requests
                </h3>
                <p>Show requests from tourists.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"/tourist-home2.jpg"}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={e =>
                    this.props.history.push("/tourguide/UpcomingTrips")
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
                src={"/tourist-home1.jpg"}
                alt="Third slide"
                onClick={e =>
                  this.props.history.push("/tourguide/TouristPreviousTrips")
                }
              />
              <Carousel.Caption>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={e =>
                    this.props.history.push("/tourguide/PreviousTrips")
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
            <h1 class="font-weight-light">
              Start your own business with BackPackers!
            </h1>
            <p class="lead">
              Earning money and experience has never been more enjoyable and
              easy. With BackPackers you will contact with a variety of tourists
              from all over the world and help them see the beauty of our
              country by guiding them through places and cities in Egypt.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default TourguideHome;
