const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tripSchema = require("./trip.model").schema;
const ratingSchema = require("./rating.model").schema;

//User schema
const userSchema = new Schema(
  {
    name: String,
    bio: String,
    birthdate: Date,
    address: {
      country: String,
      state: String,
      city: String,
      street: String,
      locationURL: String
    },
    education: String,
    occupation: String,
    interests: [String],
    contactNumbers: [String],
    languages: [String],
    passportNumber: String,
    criminalRecordLink: String,
    credits: {
      type: Number,
      default: 0
    },
    image: String,
    ratings: [ratingSchema]
  },
  {
    discriminatorKey: "usertype",
    timestamps: true
  }
);
userSchema.index({
  "$**": "text"
});
//Tourguide schema
const tourguideSchema = new Schema({
  yearsOfExperience: Number,
  contractSigned: {
    type: Boolean,
    default: false
  }
});
tourguideSchema.index({
  "$**": "text"
});
tourguideSchema.virtual("offers", {
  ref: "Offer",
  localField: "_id",
  foreignField: "tourguide"
});
//Tourist schema
const touristSchema = new Schema({
  trips: [tripSchema]
});
touristSchema.index({
  "$**": "text"
});

const User = mongoose.model("User", userSchema);
const Tourguide = User.discriminator("Tourguide", tourguideSchema);
const Tourist = User.discriminator("Tourist", touristSchema);
module.exports = {
  Tourguide: Tourguide,
  Tourist: Tourist
};
