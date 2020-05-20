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

const User = mongoose.model('User', userSchema);

module.exports = User;
