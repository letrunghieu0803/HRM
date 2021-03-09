const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default : true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
