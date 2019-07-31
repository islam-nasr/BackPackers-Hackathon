const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./config/keys").mongoURI;
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
// Express body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
// Cors
app.use(cors());
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Entry point
app.get("/", (req, res) => res.send(`<h1>Welcome to Backpackers</h1>`));
// Use Routes
app.use("/api/offers", require("./api/routes/offer.router"));
app.use("/api/places", require("./api/routes/place.router"));
app.use("/api/ratings", require("./api/routes/rating.router"));
app.use("/api/searches", require("./api/routes/search.router"));
app.use("/api/tourguides", require("./api/routes/tourguide.router"));
app.use("/api/tourists", require("./api/routes/tourist.router"));
app.use("/api/trips", require("./api/routes/trip.router"));
// Wrong path
app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
