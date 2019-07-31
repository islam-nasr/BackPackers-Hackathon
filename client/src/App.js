import React from "react";
import "./App.css";
import TourguideHome from "./components/TourguideHome";
import TourguideCreateOffer from "./components/TourguideCreateOffer.jsx";
import TouristHome from "./components/TouristHome";
import About from "./components/About.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import Contact from "./components/Contact";
import TouristRequestedTripsOffers from "./components/TouristRequestedTripsOffers";
import TouristRequestedTripsOffersInfo from "./components/TouristRequestedTripsOffersInfo";
import TouristRequestTrips from "./components/TouristRequestTrips";
import TouristRequestedTrips from "./components/TouristRequestedTrips";
import TouristPreviousTrips from "./components/TouristPreviousTrips";
import TouristPreviousTripsInfo from "./components/TouristPreviousTripsInfo";
import TourguidePreviousTrips from "./components/TourguidePreviousTrips";
import TourguidePreviousTrip from "./components/TourguidePreviousTrip";
import TouristUpcomingTrips from "./components/TouristUpcomingTrips";
import TourguideUpcomingTrips from "./components/TourguideUpcomingTrips";
import TouristUpcomingTripsInfo from "./components/TouristUpcomingTripsInfo";
import TourguideUpcomingTrip from "./components/TourguideUpcomingTrip";
import Signin from "./components/Signin";
import HomeNew from "./components/HomeNew";
import UserProfile from "./components/UserProfile";
import TourguideShowRequests from "./components/TourguideShowRequests";
import RateTrip from "./components/RateTrip";

function App() {
  return (
    <BrowserRouter>
      {/* //Tourist routes */}
      <Route exact path="/tourist/home" component={TouristHome} />
      <Route
        exact
        path="/tourist/RequestTrips"
        component={TouristRequestTrips}
      />
      <Route
        exact
        path="/tourist/TouristRequestedTrips"
        component={TouristRequestedTrips}
      />
      <Route
        exact
        path="/tourist/RequestedTripsOffers/:tripID"
        component={TouristRequestedTripsOffers}
      />
      <Route
        exact
        path="/tourist/RequestedTripsOffersInfo/:tripID/:offerID"
        component={TouristRequestedTripsOffersInfo}
      />
      <Route
        exact
        path="/tourist/UpcomingTrips"
        component={TouristUpcomingTrips}
      />
      <Route
        exact
        path="/tourist/UpcomingTripsInfo"
        component={TouristUpcomingTripsInfo}
      />
      <Route
        exact
        path="/tourist/PreviousTrips"
        component={TouristPreviousTrips}
      />
      <Route
        exact
        path="/tourist/PreviousTripsInfo/:tripID"
        component={TouristPreviousTripsInfo}
      />
      <Route exact path="/tourist/rateTrip/:tripID" component={RateTrip} />

      {/* //general  routes */}
      <Route exact path="/" component={HomeNew} />
      <Route exact path="/About-Us" component={About} />
      <Route exact path="/Contact-Us" component={Contact} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/profile/:userID" component={UserProfile} />
      {/* //Tourguide routes */}
      <Route exact path="/tourguide/home" component={TourguideHome} />
      <Route
        exact
        path="/tourguide/offer/:tripID/:tourguideID"
        component={TourguideCreateOffer}
      />
      <Route
        exact
        path="/tourguide/UpcomingTrips"
        component={TourguideUpcomingTrips}
      />
      <Route
        exact
        path="/tourguide/UpcomingTrip"
        component={TourguideUpcomingTrip}
      />
      <Route
        exact
        path="/tourguide/PreviousTrips"
        component={TourguidePreviousTrips}
      />
      <Route
        exact
        path="/tourguide/PreviousTrip"
        component={TourguidePreviousTrip}
      />
      <Route
        exact
        path="/tourguide/ShowRequests"
        component={TourguideShowRequests}
      />
    </BrowserRouter>
  );
}

export default App;
