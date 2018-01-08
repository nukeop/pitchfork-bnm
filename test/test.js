const test = require('ava');
const p4k = require('../index');


test('fetch best new albums', t => {
  return p4k.getBestNewAlbums()
    .then((albums) => {
      t.pass();
    })
    .catch((err) => {
      t.fail();
    });
});

test('fetch best new tracks', t => {
  return p4k.getBestNewTracks()
    .then((tracks) => {
      t.pass();
    })
    .catch((err) => {
      t.fail();
    });
});
