const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showSchema = new Schema(
  {
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
  }

  // {
  //   toJSON: {
  //     // include any virtual properties when data is requested
  //     virtuals: true,
  //   },
  // }
);

// // adds a dynamically-created property to schema
// userSchema.virtual("totalDuration").get(function () {
//   // "reduce" array of exercises down to just the sum of their durations
//   return this.exercises.reduce((total, exercise) => {
//     return total + exercise.duration;
//   }, 0);
// });

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
