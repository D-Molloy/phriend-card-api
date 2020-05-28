const cheerio = require('cheerio');

const parseSetlistHtml = showHtml => {
  const $ = cheerio.load(showHtml);
  let setCount = 0;
  let setlistInfo = {
    songCount: 0
  };

  $('[class^="set"]').each(function(_, element) {
    const songName = $(element).text();
    const className = $(element).attr('class');

    if (className === 'set-label') {
      setCount++;
      // TODO: remove - setlistInfo[`set${setCount}`] = [];
      setlistInfo[`Set ${setCount}`] = [];
    }

    if (className === 'setlist-song') {
      // TODO: remove - setlistInfo[`set${setCount}`].push(songName);
      setlistInfo[`Set ${setCount}`].push(songName);
      setlistInfo.songCount++;
    }
  });

  return setlistInfo;
};

const parseVenueHtml = venueHtml => {
  const $ = cheerio.load(venueHtml);
  return $('a').text();
};

module.exports = {
  parseSetlistHtml,
  parseVenueHtml
};
