const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const offerSchema = require("./offer.model").schema;
const ratingSchema = require("./rating.model").schema;
const placeSchema = require("./place.model").schema;
const countries = require("../api/constants/countries.constant").countries;

//Trip schema
const tripSchema = new Schema(
  {
    country: String,
    states: [String],
    cities: [String],
    places: [placeSchema],
    statedStatesOnly: {
      type: Boolean,
      default: false
    },
    statedPlacesOnly: {
      type: Boolean,
      default: false
    },
    startDate: Date,
    endDate: Date,
    averagePrice: Number,
    image: String,
    tourist: { type: Schema.Types.ObjectId, ref: "Tourist", required: true },
    offers: [offerSchema],
    acceptedOffer: offerSchema,
    rating: ratingSchema
  },
  {
    timestamps: true
  }
);
tripSchema.index({
  "$**": "text"
});

module.exports = Trip = mongoose.model("Trip", tripSchema);
