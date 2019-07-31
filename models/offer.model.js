const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const placeSchema = require("./place.model").schema;

//offer schema
const offerSchema = new Schema(
  {
    places: [
      {
        place: placeSchema,
        from: Date,
        to: Date,
        cancelled: {
          type: Boolean,
          default: false
        }
      }
    ],
    transportations: [
      {
        from: String,
        to: String,
        by: String,
        departureTime: Date,
        arrivalTime: Date,
        image: String
      }
    ],
    price: Number,
    image: String,
    tourguide: { type: Schema.Types.ObjectId, ref: "Tourguide", required: true }
  },
  {
    timestamps: true
  }
);
offerSchema.index({
  "$**": "text"
});

module.exports = Offer = mongoose.model("Offer", offerSchema);
