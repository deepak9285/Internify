import mongoose from 'mongoose';

const performanceMetricsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    commit_count: {
      type: Number,
      default: 0,
    },
    code_quality_score: {
      type: Number,
      min: 0,
      max: 100,
    },
    task_progress: {
      type: Number,
      min: 0,
      max: 100,
    },
    feedback_score: {
      type: Number,
      min: 0,
      max: 10,
    },
    github_activity: {
      commits: { type: Number, default: 0 },
      pull_requests: { type: Number, default: 0 },
      issues: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const PerformanceMetrics = mongoose.model('PerformanceMetrics', performanceMetricsSchema);

module.exports = PerformanceMetrics;
