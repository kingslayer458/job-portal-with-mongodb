import mongoose from 'mongoose';

// Check if the Job model already exists to prevent OverwriteModelError
const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: '/images/default-logo.png',
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['fulltime', 'parttime', 'contract', 'internship'],
    default: 'fulltime',
  },
  salary: {
    type: String,
    required: true,
  },
  salaryRange: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    }
  },
  description: {
    type: [String],
    required: true,
  },
  deadline: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use mongoose.models.Job || mongoose.model('Job', JobSchema) to ensure the model is only created once
export default mongoose.models.Job || mongoose.model('Job', JobSchema);
