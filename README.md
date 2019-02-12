# quick-ptime

A simple performance timer based off process.hrtime

## Installation

```
npm install quick-ptime
```

```
yarn add quick-ptime
```

## Basic Usage

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

## Timing a function

Version 1.1.0 introduces function timing, which can be used to benchmark a function.

Functions accept the following parameters in order:

- `name`: the name you wish to give this test to uniquely identify it's timer
- `method`: the function or method you wish to test
- `values`: the values you wish to pass as parameters `{array}`
- `rounds`: the number of rounds you wish to test against
- `sync`: whether or not the method you wish to test is a synchronous or asynchronus method.

```javascript
const func = () => {
    // do some process
}

const funcAsync = async (arg1, arg2, arg3) => {
    // do some async process
}

// get total time for all rounds
let elapsed = await ptime.runFunctionRounds("A function", func, null, 100000, true);
let elapsedAsync = await ptime.runFunctionRounds("An Async Function", funcAsync, [1, 2, 3], 100000, false);

// get average time for single round for x number of rounds
let avgElapsed = await ptime.runFunctionAverage("A function", func, null, 100000, true);
let avgElapsedAsync = await ptime.runFunctionAverage("An Async Function", funcAsync, [1, 2, 3], 100000, false);

// the returned objects are the same as ptime.elapsedtime();
```

## License

MIT © [shadowcodex](https://github.com/shadowcodex)