const test = require('ava');
const p4k = require('../index');

test('fetch best new albums', t => {
  return p4k.getBestNewAlbums()
    .then((albums) => {
      console.log(albums);
      t.pass();
    })
    .catch((err) => {
      console.error(err);
      t.fail();
    });
});

test('fetch best new tracks', t => {
  return p4k.getBestNewTracks()
    .then((tracks) => {
      console.log(tracks);
      t.pass();
    })
    .catch((err) => {
      console.error(err);
      t.fail();
    });
});

test('fetch best new reissues', t=> {
  return p4k.getBestNewReissues()
    .then((reissues) => {
      console.log(reissues);
      t.pass();
    })
    .catch((err) => {
      console.error(err);
      t.fail();
    });
})
