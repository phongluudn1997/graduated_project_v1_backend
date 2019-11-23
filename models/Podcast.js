const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PodcastSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  transcript: {
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId
    // ref: "User",
    // required: true
  },
  audio: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  image: {
    type: String
  }
});

PodcastSchema.virtual("url").get(function() {
  return "/podcasts/" + this._id;
});
module.exports = mongoose.model("Podcast", PodcastSchema, "podcast");
