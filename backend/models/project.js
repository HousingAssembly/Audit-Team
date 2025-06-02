const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  area: String,
  year: Number,
  municipality: String,
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Upcoming'],
  },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
