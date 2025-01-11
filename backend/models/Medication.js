// models/Medication.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  time: {
    type: String,    // "HH:mm" format
    required: true
  },
  daysOfWeek: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  }]
});

const medicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  dosage: {
    type: String,
    required: true,
    trim: true
  },
  schedule: [scheduleSchema],
  instructions: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

medicationSchema.index({ userId: 1 }); //MongoDB creates a sorted list of userId values (the 1 means ascending order)

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;


