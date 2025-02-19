const mongoose = require('mongoose');

const TaskProgressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  commit_count: {
    type: Number,
    default: 0
  },
  code_quality_score: {
    type: Number,
    min: 0,
    max: 100
  },
  task_progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  feedback_score: {
    type: Number,
    min: 0,
    max: 10
  },
  github_activity: {
    commits: {
      type: Number,
      default: 0
    },
    pull_requests: {
      type: Number,
      default: 0
    },
    issues: {
      type: Number,
      default: 0
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TaskProgress', TaskProgressSchema);
