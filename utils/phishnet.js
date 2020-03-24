const axios = require('axios');
const cheerio = require('cheerio');

const parseShowHtml = showHtml => {


  let setlistInfo = {
    songCount: 0
  };

  let setCount = 0;

  const $ = cheerio.load(showHtml);

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

module.exports = {
  parseShowHtml
};
