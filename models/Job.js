const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: String,
  salary: String,
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    default: 'Full-time'
  },
  status: {
    type: String,
    enum: ['Applied', 'Assessment', 'HR Round', 'Technical Interview', 'Final Decision', 'Rejected'],
    default: 'Applied'
  },
  jobLink: String,
  appliedDate: {
    type: Date,
    default: Date.now
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
