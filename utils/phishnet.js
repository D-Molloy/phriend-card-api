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
      setlistInfo[`set${setCount}`] = [];
    }

    if (className === 'setlist-song') {
      setlistInfo[`set${setCount}`].push(songName);
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
