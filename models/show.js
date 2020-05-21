const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showSchema = new Schema({
  phishnetShowId: {
    type: Number,
    trim: true,
    unique: true,
  },
  phishnetUrl: {
    type: String,
    trim: true,
    default: 'https://www.phish.net/',
  },
  venue: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  // "2019-09-01"
  date: {
    type: String,
    trim: true,
  },
  day: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
  },
  setlist: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
