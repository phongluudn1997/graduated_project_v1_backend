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
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }
});

module.exports = mongoose.model("User", User, "User");
