const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  assignee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  task: { type: String, required: true },
  desc: { type: String, required: true },
  taskCategory: { type: String, required: true },
  submissionFormat: { type: String, required: true },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do", 
  },
  assignDate: { type: Date, required: true },
  submitDeadline: { type: Date, required: true },
  relief: { type: Date, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
