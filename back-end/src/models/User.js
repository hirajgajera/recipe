const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  recipies: [{ type: mongoose.Schema.ObjectId, ref: "Recipe" }],
});

module.exports = mongoose.model("User", userSchema);
