const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Boolean,
    required: true,
  },
  // image: {
  //   type: String,
  //   require: true,
  // },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  grade: {
    type: String,
    required: true,
  },
  words: [{
    type: String,
    required: true,
  }],
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Deck", DeckSchema);
