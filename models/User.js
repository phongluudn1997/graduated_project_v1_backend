const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    minlength: [6, "Password at least 6 words"]
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: mongoose.Types.ObjectId("5dde0a0f1a9feb4ec9be53d8")
  },
  active: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model("User", User, "User");
