const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: 'Enter a username.',
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: 'Enter your email.',
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address.'],
    },
    password: {
      type: String,
      trim: true,
      required: 'Password required.',
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    shows: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Show',
        unique: true,
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);

// adds a dynamically-created property to schema
userSchema.virtual('totalSongsHeard').get(function () {
  return this.shows.reduce((total, show) => total + show.setlist.songCount, 0);
});
// calculate average show rating
userSchema.virtual('showScoreAverage').get(function () {
  return (
    this.shows.reduce((total, show) => total + show.rating, 0) /
    this.shows.length
  );
});

// create an object that counts the number of times each song has been heard
userSchema.virtual('timesSongHeard').get(function () {
  return this.shows.reduce((acc, { setlist }) => {
    for (key in setlist) {
      if (Array.isArray(setlist[key])) {
        for (song of setlist[key]) {
          acc[song] = ++acc[song] || 1;
        }
      }
    }
    return acc;
  }, {});
  // TODO: this produces a alphabetically sorted list
  // const timesSongHeard = this.shows.reduce((acc, { setlist }) => {
  //   for (key in setlist) {
  //     if (Array.isArray(setlist[key])) {
  //       for (song of setlist[key]) {
  //         acc[song] = ++acc[song] || 1;
  //       }
  //     }
  //   }
  //   return acc;
  // }, {});
  // const ordered = {};
  // Object.keys(timesSongHeard)
  //   .sort()
  //   .forEach(function (key) {
  //     ordered[key] = timesSongHeard[key];
  //   });
  // return ordered;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
