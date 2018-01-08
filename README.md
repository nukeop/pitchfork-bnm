# pitchfork-bnm
Pitchfork.com scraper that gets best new music info

# Usage

The module exposes 3 methods, each of which scrapes data from the sections found here: https://pitchfork.com/best/

```bash
$ npm install --save pitchfork-bnm
```
```javascript
const p4k = require('pitchfork-bnm');

p4k.getBestNewAlbums()
    .then((albums) => {
      console.log(albums);
});
```
```javascript
const p4k = require('pitchfork-bnm');

p4k.getBestNewTracks()
    .then((tracks) => {
      console.log(tracks);
});
```
```javascript
const p4k = require('pitchfork-bnm');

p4k.getBestNewReissues()
    .then((reissues) => {
      console.log(reissues);
});
```

# Testing
```bash
$ npm test
```
