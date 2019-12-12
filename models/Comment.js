const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", CommentSchema, "Comment");
