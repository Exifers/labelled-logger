
# labelled-logger
[![npm version](https://img.shields.io/npm/v/labelled-logger.svg?style=flat-square)](https://www.npmjs.com/package/labelled-logger)
[![install size](https://badgen.net/packagephobia/install/labelled-logger)](https://packagephobia.now.sh/result?p=labelled-logger)
[![downloads](https://img.shields.io/npm/dm/labelled-logger.svg?style=flat-square)](https://npm-stat.com/charts.html?package=labelled-logger)


Features:
- colored log labels
- log levels
- nicely displayed
- printf-like message formatting
- configurable and customizable

![demo](https://i.ibb.co/M1BJjpy/demo.gif)

## Table of Contents
- [Usage](#usage)

## Usage

```javascript
const LoggerFactory = require('labelled-logger');
const colors = require('labelled-logger').colors;

const labelsData = [
  {
    label: 'prepare',
    color: colors.GREEN
  },
  {
    label: 'parse',
    color: colors.PURPLE
  },
  {
    label: 'extract', 
    color: colors.BLUE
  },
  {
    label: 'compute',
    color: colors.RED
  },
  {
    label: 'create',
    color: colors.YELLOW
  }
];

const levelsData = [
  { value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }
];

const logger = LoggerFactory.createLogger(labelsData, levelsData);
logger.setLevel(1); // everything below or equal level 1 will be printed
logger.setExpandObjects(true); // objects and lists will be printed entirely
logger.disable(); // don't log anything
logger.enable('create', 'compute'); // log only create and compute labels
logger.enable(); // log all labels


// log messages in your code
// logger.log(<level>, <label>, <message>, ...<variables>)

logger.log(0, 'prepare', 'reading file');
/* ... */
logger.log(1, 'prepare', '%d lines read', lines);
/* ... */
logger.log(1, 'parse', 'parsed file, parsed returned %s', ret);
```
