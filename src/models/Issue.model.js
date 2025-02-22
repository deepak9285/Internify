const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  desc: { type: String, required: true },
  issueCategory: { type: String, required: true },
});

module.exports = mongoose.model("Issue", IssueSchema);
