const test = require('ava');
const p4k = require('../index');


test('fetch best new albums', t => {
  return p4k.getBestNewAlbums()
    .then((albums) => {
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
      t.pass();
    })
    .catch((err) => {
      console.error(err);
      t.fail();
    });
})
