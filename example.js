#! /usr/bin/env node

const LoggerFactory = require('./index');
const color = require('./index').colors;

const labelsData = [
  {
    label: 'prepare',
    color: color.GREEN
  },
  {
    label: 'parse',
    color: color.PURPLE
  },
  {
    label: 'extract',
    color: color.BLUE
  },
  {
    label: 'compute',
    color: color.RED
  },
  {
    label: 'create',
    color: color.YELLOW
  }
];

const levelsData = [
  {
    value: 0
  },
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  }
];

const logger = LoggerFactory.createLogger(labelsData, levelsData);
logger.enable();
logger.disable();
logger.enable('parse', 'compute');
logger.setExpandObjects(true);

logger.log(2, 'prepare', 'hello');
logger.log(1, 'parse', 'hello %s', 'world');
logger.log(3, 'parse', 'hello %s', {a:1});
logger.log(2, 'compute', 'hello %s %s %s', {a:1,b:{c:{d:2}}}, {}, {});
logger.log(2, 'compute', 'hello %s', [1,2,3]);
