// const db = require("../models");
const axios = require('axios');
const { parseSetlistHtml, parseVenueHtml } = require('../utils/phishnet');
const valid = require('../utils/validation');
const apiKey = process.env.PHISHNET_APIKEY;

// Defining methods for the bookController
module.exports = {
  findAll: (req, res) => {
    res.send('finding all');
    // db.Book.find(req.query)
    //   .then(dbBook => res.json(dbBook))
    //   .catch(err => res.status(422).json(err));
  },
  /**
   * Get a show on a specific date
   * @param {str} req.params.showDate  = "YYYY-MM-DD"
   */
  addSetlistByDate: ({ params: { showDate } }, res) => {
    if (!valid.dateFormat(showDate)) {
      return res.status(400).send('Invalid date parameter.');
    }

    axios
      .get(
        `https://api.phish.net/v3/setlists/get?apikey=${apiKey}&showdate=${showDate}`
      )
      .then(({ data: { response } }) => {
        if (!response.count) {
          return res.status(400).send('No show on that date.');
        }
        // one complete show
        const showData = response.data[0];

        const showObj = {
          phishnetShowId: showData.showId,
          phishnetUrl: showData.url,
          venue: parseVenueHtml(showData.venue),
          location: showData.location,
          date: showData.showdate,
          day: showData.long_date.split(' ')[0],
          rating: parseFloat(showData.rating),
          setlist: parseSetlistHtml(showData.setlistdata)
        };
        return res.json(showObj);
      })
      .catch(err => {
        console.log('Error getting data: ', err);
        return res
          .status(400)
          .send('Error.  Please check the show date and try again.');
      });
  }
};
// https://api.phish.net/v3/setlists/get?apikey=A53B4CA86749D9E5CDE2&showdate=2019-09-01

// getSetlistByDate showData:
// const data = {
//   showid: 1547482744,
//   showdate: '2019-09-01',
//   short_date: '09/01/2019',
//   long_date: 'Sunday 09/01/2019',
//   relative_date: '7 months ago',
//   url:
//     'http://phish.net/setlists/phish-september-01-2019-dicks-sporting-goods-park-commerce-city-co-usa.html',
//   gapchart:
//     'http://phish.net/setlists/gap-chart/phish-september-01-2019-dicks-sporting-goods-park-commerce-city-co-usa.html',
//   artist: "<a href='http://phish.net/setlists/phish'>Phish</a>",
//   artistid: 1,
//   venueid: 961,
//   venue:
//     '<a href="http://phish.net/venue/961/Dick%27s_Sporting_Goods_Park">Dick\'s</a>',
//   location: 'Commerce City, CO, USA',
//   setlistdata:
//     "<p><span class='set-label'>Set 1</span>: <a href='http://phish.net/song/stray-dog' class='setlist-song'>Stray Dog</a><sup title=\"Lyric changed to \"Plague Dog.\"\">[1]</sup>, <a href='http://phish.net/song/stealing-time-from-the-faulty-plan' class='setlist-song'>Stealing Time From the Faulty Plan</a>, <a href='http://phish.net/song/turtle-in-the-clouds' class='setlist-song'>Turtle in the Clouds</a>, <a title=\"Initially uncertain, the band practices prudence as myriad ideas (rhythmically, tonally, and texturally) are thrown into the fray without clear direction or heading. At 7:45, Page and Trey slide the jam cleanly into F, where a textured and detailed bliss jam oozes and bounces in dynamic. Trey fades a sustained note into foley so Page can step up to the organ (with the assistance of swirl and crunch) and remind us all of why he is the Chairman Of The Boards. Around the 11 minute mark, whale call Trey joins Mike and Fish's rhythmic bounce. Finally at 13:00, after just over 5 minutes of continued type II jamming, Trey winds the band back into the classic outro riff. \" href='http://phish.net/song/wolfmans-brother' class='setlist-song'>Wolfman's Brother</a>, <a href='http://phish.net/song/birds-of-a-feather' class='setlist-song'>Birds of a Feather</a>, <a href='http://phish.net/song/we-are-come-to-outlive-our-brains' class='setlist-song'>We Are Come to Outlive Our Brains</a> > <a href='http://phish.net/song/taste' class='setlist-song'>Taste</a> > <a href='http://phish.net/song/my-friend-my-friend' class='setlist-song'>My Friend, My Friend</a><sup title=\"\tNo \"Myfe\" ending.\">[2]</sup> > <a href='http://phish.net/song/twenty-years-later' class='setlist-song'>Twenty Years Later</a> > <a href='http://phish.net/song/sparkle' class='setlist-song'>Sparkle</a>, <a href='http://phish.net/song/crazy-sometimes' class='setlist-song'>Crazy Sometimes</a> > <a href='http://phish.net/song/bathtub-gin' class='setlist-song'>Bathtub Gin</a></p><p><span class='set-label'>Set 2</span>: <a href='http://phish.net/song/sightless-escape' class='setlist-song'>Sightless Escape</a><sup title=\"Phish debut.\">[3]</sup>, <a href='http://phish.net/song/fuego' class='setlist-song'>Fuego</a> -> <a title=\"Beginning with a slower tempo, this &quot;Piper&quot; gradually builds to normal speed. The jam peels away from customary, becoming mildly dissonant and atonal, before shifting to a warmer, more upbeat sentiment. The jam then becomes energized, pulsing, and rocking. Around 11:00 the music shifts again, with quieter musings and percussive drive which suggest a big peak, but > to &quot;Tweezer&quot; instead. \" href='http://phish.net/song/piper' class='setlist-song'>Piper</a> > <a href='http://phish.net/song/tweezer' class='setlist-song'>Tweezer</a> -> <a href='http://phish.net/song/also-sprach-zarathustra' class='setlist-song'>Also Sprach Zarathustra</a> > <a href='http://phish.net/song/chalk-dust-torture' class='setlist-song'>Chalk Dust Torture</a><sup title=\"Unfinished.\">[4]</sup> > <a href='http://phish.net/song/waste' class='setlist-song'>Waste</a> > <a href='http://phish.net/song/cavern' class='setlist-song'>Cavern</a> > <a href='http://phish.net/song/first-tube' class='setlist-song'>First Tube</a></p><p><span class='set-label'>Encore</span>: <a href='http://phish.net/song/the-horse' class='setlist-song'>The Horse</a> > <a href='http://phish.net/song/silent-in-the-morning' class='setlist-song'>Silent in the Morning</a> > <a href='http://phish.net/song/a-life-beyond-the-dream' class='setlist-song'>A Life Beyond The Dream</a>, <a href='http://phish.net/song/tweezer-reprise' class='setlist-song'>Tweezer Reprise</a><p class='setlist-footer'>[1] Lyric changed to \"Plague Dog.\"<br>[2] \tNo \"Myfe\" ending.<br>[3] Phish debut.<br>[4] Unfinished.<br></p>",
//   setlistnotes:
//     'This show was webcast via&nbsp;<a href="http://www.livephish.com/">Live Phish</a>&nbsp;and simulcast on Sirius radio. This show featured the Phish debut of Sightless Escape. Stray Dog was sung as &quot;Plague Dog,&quot; a reference to an outbreak of&nbsp;plague&nbsp;(carried by fleas on prairie dogs) in the Commerce City area. MFMF didn&#39;t contain the &quot;Myfe&quot; ending. Birds of a Feather included a The Birds quote.Tweezer included Fuego teases and quotes. Also Sprach Zarathustra included a Jean Pierre tease by Trey. Chalk Dust Torture was unfinished.<br>via <a href="http://phish.net">phish.net</a>',
//   rating: '4.0637'
// };
