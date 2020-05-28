const db = require('../models');
const axios = require('axios');
const { parseSetlistHtml, parseVenueHtml } = require('../utils/phishnet');
const { validateDate } = require('../utils/validation');
const apiKey = process.env.PHISHNET_APIKEY;

const updateUserShowArray = async (userId, showId) => {
  const user = await db.User.findByIdAndUpdate(
    userId,
    { $addToSet: { shows: showId } },
    { new: true }
  ).populate('shows');

  return user;
};

// Defining methods related to setlists
module.exports = {
  /**
   * GET shows array for current user
   * @param {_id} mongo id for the current user
   */
  getAllShowsForUser: async ({ user: { _id } }, res) => {
    const foundUser = await db.User.findOne({ _id }).select('-password').populate('shows');
    res.json(foundUser);
  },
  /**
   * POST a show on a specific date and add to user's shows array
   * @param {body} properties:  year, month day in ints
   * @param {user} currently logged in user
   */
  addSetlistByDate: async ({ body, user }, res) => {
    // validate user submitted showdate
    const { errors, showDate } = validateDate(body);
    if (!showDate) {
      return res.status(400).json(errors);
    }
    // grab the user ID of the logged in user
    const { _id: currentUser } = user;

    // check DB to see if the show exists
    const foundShow = await db.Show.findOne({
      date: showDate,
    });

    // if show exists, push that into the user's shows array and send back updated show list
    if (foundShow) {
      return res.json(await updateUserShowArray(currentUser, foundShow._id));
    } else {
      // if it doesn't, make the request, parse show data, insert into the show db, then push show id to users shows array
      try {
        const {
          data: { response },
        } = await axios.get(
          `https://api.phish.net/v3/setlists/get?apikey=${apiKey}&showdate=${showDate}`
        );

        if (response.count === 0) {
          return res.status(400).send('No show on that date.');
        }
        const {
          data: [showData],
        } = response;

        const showObj = {
          phishnetShowId: showData.showid,
          phishnetUrl: showData.url,
          venue: parseVenueHtml(showData.venue),
          location: showData.location,
          date: showData.showdate,
          day: showData.long_date.split(' ')[0],
          rating: parseFloat(showData.rating),
          setlist: parseSetlistHtml(showData.setlistdata),
        };

        // create the show in the db
        try {
          const createdShow = await db.Show.create(showObj);

          return res.json(
            await updateUserShowArray(currentUser, createdShow._id)
          );
        } catch (e) {
          return res.status(500).send('error creating show');
        }
      } catch (e) {
        console.log('Error getting show:', e);
        return res
          .status(400)
          .send('Error.  Please check the show date and try again.');
      }
    }
  },
  /**
   * DELETE a show from the users
   * @param {showId} the mongoId for the show to remove
   * @param {userId} currently logged in user
   */
  removeShowFromUser: async (
    { params: { id: showId }, user: { _id } },
    res
  ) => {
    const results = await db.User.findByIdAndUpdate(
      _id,
      { $pull: { shows: showId } },
      { new: true }
    )
      // exclude the password field
      .select('-password')
      .populate('shows');

    res.json(results);
  },
};
