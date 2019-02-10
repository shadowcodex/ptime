# quick-ptime

A simple performance timer based off process.hrtime

## Installation

```
npm install quick-ptime
```

```
yarn add quick-ptime
```

## Usage

```javascript
let ptime = require('quick-ptime');

// setup a timer
const set = ptime.setTime("my timer name");
console.log(set); // 2399

// get the time I started my timer
const get = ptime.getTime("my timer name");
console.log(get); // 2399

// get the diff in nanoseconds of my timer and now
const diff = ptime.diffTime("my timer name");
console.log(diff); // 101

// get the diff in multiple formatted ways
const elapsed = ptime.elapsedTime("my timer name");
console.log(elapsed.nanosecondsDiff); // 101
console.log(elapsed.data.seconds); // 0
console.log(elapsed.data.milliseconds); // 0
console.log(elapsed.data.nanoseconds); // 101
console.log(elapsed.formatted); // "+ 0s 0ms 101ns"
```

## License

MIT © [shadowcodex](https://github.com/shadowcodex)