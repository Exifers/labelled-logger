
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


// log messages in your code:
logger.log(0, 'prepare', 'reading file');
/* ... */
logger.log(1, 'prepare', '%d lines read', lines);
/* ... */
logger.log(1, 'parse', 'parsed file, parsed returned %s', ret); 
```
