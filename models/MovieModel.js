const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
});
const movieSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
  },
  poster: {
    type: String,
  },
  rating: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  first_air_date: {
    type: Date,
  },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Movie", movieSchema);
