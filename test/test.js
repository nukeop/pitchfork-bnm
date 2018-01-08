const test = require('ava');
const p4k = require('../index');


test('fetch best new albums', t => {
  return p4k.getBestNewAlbums()
    .then((albums) => {
      console.log(albums);
      t.pass();
    })
    .catch((err) => {
      t.fail();
    });
});
