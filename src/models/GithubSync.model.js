const mongoose = require('mongoose');

const GitHubSyncSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  github_repo: {
    type: String,
    required: true
  },
  sync_status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    required: true
  },
  last_synced_at: {
    type: Date,
    default: Date.now
  },
  error_message: {
    type: String,
    default: null
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

module.exports = mongoose.model('GitHubSync', GitHubSyncSchema);
