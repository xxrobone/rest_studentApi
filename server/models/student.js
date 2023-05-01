const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required',
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  classes: {
    type: Array,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

studentSchema.index({ '$**': 'text' });
module.exports = mongoose.model('Student', studentSchema);
