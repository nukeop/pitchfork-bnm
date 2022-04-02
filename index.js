require('isomorphic-fetch');
const cheerio = require('cheerio');
const p4kUrl = 'http://pitchfork.com';

function getReviewDetails(reviewUrl) {
  console.log(reviewUrl)
  return fetch(reviewUrl)
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html, {
        decodeEntities: false
      });
      var details = {};

      details.score = $('header>div>div:nth-child(2)>div>div:nth-child(2)>div>div>p').text();
      details.abstract = $('header>div:nth-child(4)').text();
      const reviews = $('.body__inner-container>p');
      reviews.splice(-3);
      details.review = reviews.text()
      return details;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getTrackReviewDetails(reviewUrl) {
  return fetch(reviewUrl)
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html, {
        decodeEntities: false
      });
      var details = {};

      details.review = $('.body__inner-container>p').text()
      return details;
    })
    .catch((err) => {
      console.error(err);
    });
}

function processAlbumList(albums) {
  albums = albums.map((i, el) => {
    var album = {};
    var el$ = cheerio.load(el, {
      decodeEntities: false
    });
    album.thumbnail = el$('div.artwork>img').attr('src');
    album.artist = el$('ul.artist-list').text();
    album.title = el$('h2.title>em').html();
    album.reviewUrl = p4kUrl + el$('a').attr('href');
    album.genres = el$('ul.genre-list').find('li>a').toArray().map((el, i) => { return el.children[0].data; });

    return album;
  });

  return Promise.all(Array.from(albums.map((i, album) => {
    return getReviewDetails(album.reviewUrl)
      .then(details => {
        return Promise.resolve(Object.assign({}, album, details));
      });
  })));
}

function getBestNewAlbums() {
  return fetch(p4kUrl + '/best/')
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html, {
        decodeEntities: false
      });
      var albums = $('#best-new-albums>div>ul').find('li>div.album-small');
      return processAlbumList(albums);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Sanitizes the track from pitchfork to remove extraneous quotations
function sanitizeBestNewTracks(title) { 
  if(title.length >= 2) { 
    // Check for first quotation
    let firstLetter = title[0];
    let titleLength = (title).length;
    let lastLetter = title[titleLength - 1];
    if(firstLetter === "“") { 
      // Check for last quotation
      if(lastLetter === "”") { 
        // Sanitize the title 
        title = (title).slice(1);
        title = (title).slice(0, (title).length - 1);
      }
    }
  }
  return title;
}

function getBestNewTracks() {
  return fetch(p4kUrl + '/best/')
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html, {
        decodeEntities: false
      });
      var tracks = $('#best-new-tracks>div>ul').find('li>div.track-small');

      tracks = tracks.map((i, el) => {
        var track = {};
        var el$ = cheerio.load(el, {
          decodeEntities: false
        });
        track.thumbnail = el$('div.artwork>img').attr('src');
        track.artist = el$('ul.artist-list').text();
        track.title = el$('h2.title').html();
        track.title = sanitizeBestNewTracks(track.title);
        track.reviewUrl = p4kUrl + el$('a').attr('href');

        return track;
      });

      return Promise.all(Array.from(tracks.map((i, track) => {
        return getTrackReviewDetails(track.reviewUrl)
          .then(details => {
            return Promise.resolve(Object.assign({}, track, details));
          });
      })));
    })
    .catch((err) => {
      console.error(err);
    });
}

function getBestNewReissues() {
  return fetch(p4kUrl + '/best/')
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html, {
        decodeEntities: false
      });
      var albums = $('#best-new-reissues>div>ul').find('li>div.album-small');
      return processAlbumList(albums);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  getBestNewAlbums,
  getBestNewTracks,
  getBestNewReissues,
  sanitizeBestNewTracks
};
