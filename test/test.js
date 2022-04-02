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

test('sanitizing title with quotations', t => {
  // Test title with extraneous quotations
  let title = "“Hello”";
  let titleTest = p4k.sanitizeBestNewTracks(title);
  if(titleTest === "Hello") { 
    t.pass();
  }
  else {
    t.fail();
  }
})

test('sanitizing title without quotations', t => {
  // Test title without extraneous quotations
  let title = "Hello";
  let titleTest = p4k.sanitizeBestNewTracks(title);
  if(titleTest === "Hello") { 
    t.pass();
  }
  else {
    t.fail();
  }
})

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
