const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  type: {
    type: String,
    enum: ["reading", "listening", "writing", "speaking"],
    required: true
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  audio: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  }
});

PostSchema.virtual("url").get(function() {
  return "/posts/" + this.type + "/" + this._id;
});
module.exports = mongoose.model("Post", PostSchema, "Post");
