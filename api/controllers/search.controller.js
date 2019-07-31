const Offer = require("../../models/offer.model");
const Place = require("../../models/place.model");
const Rating = require("../../models/rating.model");
const Trip = require("../../models/trip.model");
const Tourist = require("../../models/user.model").Tourist;
const Tourguide = require("../../models/user.model").Tourguide;
//Search all models
const search = async (req, res) => {
  try {
    const offers = await Offer.find({
      name: {
        $regex: new RegExp(req.body.text)
      }
    });
    const places = await Place.find({
      name: {
        $regex: new RegExp(req.body.text)
      }
    });
    const ratings = await Rating.find({
      title: {
        $regex: new RegExp(req.body.text)
      }
    });
    const trips = await Trip.find({
      title: {
        $regex: new RegExp(req.body.text)
      }
    });
    const tourguides = await Tourguide.find({
      name: {
        $regex: new RegExp(req.body.text)
      }
    });
    const tourists = await Tourist.find({
      name: {
        $regex: new RegExp(req.body.text)
      }
    });
    res.json({
      Offers: offers,
      Places: places,
      Ratings: ratings,
      Trips: trips,
      Tourguides: tourguides,
      Tourists: tourists
    });
  } catch (error) {
    res.json({
      err: error.message
    });
  }
};

module.exports = { search };
