const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: "Enter a username.",
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Enter your email.",
      match: [/.+@.+\..+/, "Please enter a valid e-mail address."],
    },
    password: {
      type: String,
      trim: true,
      required: "Password required.",
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    shows: [
      {
        type: Schema.Types.ObjectId,
        ref: "Show",
        default:""
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

// total songs heard
userSchema.virtual("totalSongsHeard").get(function () {
  return this.shows.reduce((total, show) => total + show.setlist.songCount, 0);
});

// calculate average show rating
userSchema.virtual("showScoreAverage").get(function () {
  return (
    this.shows.reduce((total, show) => total + show.rating, 0) /
    this.shows.length
  );
});
// return best show by phish.net rating
userSchema.virtual("showBest").get(function () {
return this.shows.reduce((max, currentValue) => {
  if( max.rating > currentValue.rating){
    return max
  } else{
    return currentValue
  }
 }, this.shows[0])
});
// return worst show by phish.net rating
userSchema.virtual("showWorst").get(function () {
return this.shows.reduce((min, currentValue) => {
  if( min.rating < currentValue.rating){
    return min
  } else{
    return currentValue
  }
 }, this.shows[0])
});
// get the average score for all shows on a particular day
userSchema.virtual("avgShowScoreByDay").get(function () {
  return this.shows
    .reduce((acc, show) => {
      const showIndex = acc.findIndex((shows) => shows.day === show.day);
      if (showIndex > -1) {
        acc[showIndex].ratings.push(show.rating);
      } else {
        acc.push({
          day: show.day,
          ratings: [show.rating],
        });
      }
      return acc;
    }, [])
    .map(({ day, ratings }) => {
      return {
        day,
        shows: ratings.length,
        rating:
          ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length,
      };
    })
    .sort(function (a, b) {
      return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
    });
});
// get the average score for all shows by year
userSchema.virtual("avgShowScoreByYear").get(function () {
  return this.shows
    .reduce((acc, show) => {
      const currentYear = show.date.substring(0, 4);
      const showIndex = acc.findIndex((shows) => shows.year === currentYear);
      if (showIndex > -1) {
        acc[showIndex].ratings.push(show.rating);
      } else {
        acc.push({
          year: currentYear,
          ratings: [show.rating],
        });
      }
      return acc;
    }, [])
    .map(({ year, ratings }) => {
      return {
        year,
        shows: ratings.length,
        rating:
          ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length,
      };
    })
    .sort(function (a, b) {
      return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
    });
});
// get tally of score by venue and all shows at venue
userSchema.virtual("venueSummary").get(function () {
  return this.shows
    .reduce((acc, show) => {
      const showIndex = acc.findIndex((shows) => shows.venue == show.venue);
      if (showIndex > -1) {
        acc[showIndex].shows.push({
          date: show.date,
          phishnetUrl: show.phishnetUrl,
          rating: show.rating,
          day: show.day,
        });
      } else {
        acc.push({
          venue: show.venue,
          location: show.location,
          shows: [
            {
              date: show.date,
              phishnetUrl: show.phishnetUrl,
              rating: show.rating,
              day: show.day,
            },
          ],
        });
      }
      return acc;
    }, [])
    .map((venue) => {
      return {
        ...venue,
        venueRating:
          venue.shows.reduce((acc, show) => acc + show.rating, 0) /
          venue.shows.length,
      };
    });
});

// create an object that counts the number of times each song has been heard
userSchema.virtual("songFrequency").get(function () {
  const timesSongHeard = this.shows.reduce((acc, { setlist }) => {
    for (key in setlist) {
      if (Array.isArray(setlist[key])) {
        for (song of setlist[key]) {
          acc[song] = ++acc[song] || 1;
        }
      }
    }
    return acc;
  }, {});
  // This produces an array of tuples sorted by play count descending
  var sortable = [];
  for (var key in timesSongHeard)
    if (timesSongHeard.hasOwnProperty(key))
      sortable.push([key, timesSongHeard[key]]); // each item is an array in format [key, value]

  // sort items by value
  return sortable.sort(function (a, b) {
    return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
  });

  // this produces a alphabetically sorted list
  // const ordered = {};
  // Object.keys(timesSongHeard)
  //   .sort()
  //   .forEach(function (key) {
  //     ordered[key] = timesSongHeard[key];
  //   });
  // return ordered;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
