const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ratingSchema = require("./rating.model").schema;

//Place schema
const placeSchema = new Schema(
  {
    name: String,
    address: {
      country: String,
      state: String,
      city: String,
      street: String,
      locationURL: String
    },
    lat: Number,
    long: Number,
    description: String,
    pinned: {
      type: Boolean,
      default: false
    },
    averagePrice: Number,
    image: String,
    tags: [String],
    ratings: [ratingSchema]
  },
  {
    timestamps: true
  }
);
placeSchema.index({
  "$**": "text"
});

module.exports = Place = mongoose.model("Place", placeSchema);
