require('isomorphic-fetch');
const cheerio = require('cheerio');
const p4kUrl = 'http://pitchfork.com';

function getReviewDetails(reviewUrl) {
  return fetch(reviewUrl)
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html);
      var details = {};

      details.score = $('.score').text();
      details.abstract = $('.abstract>p').text();
      details.review = $('.contents.dropcap').text();
      return details;
    });
}

function getBestNewAlbums() {
  var parsedAlbums = [];

  return fetch(p4kUrl + '/best/')
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html);
      var albums = $('#best-new-albums>div>ul').find('li>div.album-small');

      albums = albums.map((i, el) => {
	var album = {};
	var el$ = cheerio.load(el);
	album.thumbnail = el$('div.artwork>img').attr('src');
	album.artist = el$('ul.artist-list').text();
	album.title = el$('h2.title').html();
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

    })
    .catch((err) => {
      console.error(err);
    }); 
}

module.exports = {
  getBestNewAlbums
};
