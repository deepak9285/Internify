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
  task_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },
  title:{
    type: String,
    required: true,
  },
  desc: { type: String, required: true },
  issueCategory: { type: String, required: true },
});

module.exports = mongoose.model("Issue", IssueSchema);
