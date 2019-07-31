const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Rating schema
const ratingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    feedback: String,
    stars: Number
  },
  {
    timestamps: true
  }
);
ratingSchema.index({
  "$**": "text"
});

module.exports = Rating = mongoose.model("Rating", ratingSchema);
