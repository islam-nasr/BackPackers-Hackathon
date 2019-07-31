import React, { Component } from "react";
import HomeNavbar from "./HomeNavBar";
import Footer from "./Footer";
import { Button, ButtonToolbar } from "react-bootstrap";

export class HomeNew extends Component {
  render() {
    return (
      <div>
        <HomeNavbar />
        <header class="masthead">
          <div class="container h-100">
            <div class="row h-100 align-items-center">
              <div class="col-12 text-center">
                <h1
                  class="font-weight-light"
                  style={{
                    color: "white",
                    textTransform: "uppercase",
                    fontSize: "70px",
                    textAlign: "center"
                  }}
                >
                  <b>Are You Ready ?</b>
                </h1>
                <p class="lead">A great facility for your trips</p>
              </div>
            </div>
          </div>
        </header>
        <section class="py-5">
          <div class="container">
            <h2 class="font-weight-light">Welcome !</h2>
            <p>
              BackPackers is a website for both tourists and tour guides. We
              offer a unique service that matches tourists with independant tour
              guides, removing the stress of having to plan your own trip when
              visiting a new place in Egypt.{" "}
              <b>
                To join, please specify whether you are a tourist or a tour
                guide:
              </b>
            </p>
            <ButtonToolbar>
              <Button href="/tourist/home" variant="info">
                I am a tourist
              </Button>
              <Button
                href="/tourguide/home"
                variant="info"
                style={{ marginLeft: "7px" }}
              >
                I am a tourguide
              </Button>
            </ButtonToolbar>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default HomeNew;
