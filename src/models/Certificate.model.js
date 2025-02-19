const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  certificate_url: {
    type: String,
    required: true
  },
  issued_at: {
    type: Date,
    default: Date.now
  },
  valid_until: {
    type: Date
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
