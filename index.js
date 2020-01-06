const chalk = require('chalk');
const sprintf = require('sprintf-js').sprintf;

const color = {
  GREEN: {
    hex: '#8dc891'
  },
  PURPLE: {
    hex: '#c5a5c5',
  },
  BLUE: {
    hex: '#79b6f2'
  },
  RED: {
    hex: '#fc929e'
  },
  YELLOW: {
    hex: '#fac863'
  }
};

function equalize(token, tokens) {
  const length = Math.max(...tokens.map(t => t.length));
  const delta = length - token.length;
  return token + ' '.repeat(delta); 
}

class Logger {
  constructor(labelsData = [], levelsData = [], options = {}) {
    this.labelsData = labelsData;
    this.levelsData = levelsData;

    this.level = options.level || null;
    this.failSilently = options.failSilently || true;
  }

  init() {
    const labels = this.labelsData.map(ld => ld.label);
    this.labelsData = this.labelsData.map(entry => ({
      ...entry,
      equalized: equalize(entry.label, labels)
    }));
  }

  error(message) {
    if (!this.failSilently) {
      throw new Error(message);
    }
  }

  enable(...args) {
    if (!args.length) {
      this.labelsData = this.labelsData.map(entry => ({
        ...entry,
        enabled: true
      }));
      return;
    }

    for (const arg of args) {
      this.labelsData = this.labelsData.map(entry => ({
        ...entry,
        enabled: entry.label === arg || entry.enabled
      }));
    }
  }

  disable(...args) {
    if (!args.length) {
      this.labelsData = this.labelsData.map(entry => ({
        ...entry,
        enabled: false 
      }));
      return;
    }

    for (const arg of args) {
      this.labelsData = this.labelsData.map(entry => ({
        ...entry,
        enabled: entry.label !== arg && entry.enabled
      }));
    }
  }

  setLevel(level) {
    this.level = level;
  }

  setFailSilently(value) {
    this.failSilently = value;
  }

  log(level, label, ...args) {

    const labelEntry = this.labelsData.find(ld => ld.label === label);
    const levelEntry = this.levelsData.find(ld => ld.value === level);

    if (!labelEntry) {
      this.error('labelled-logger: Unknown label: ' + label);
      return;
    }
    if (!levelEntry) {
      this.error('labelled-logger: Unknown level: ' + level);
      return;
    }

    if (this.level > level) {
      return;
    }
    if (!labelEntry.enabled) {
      return;
    }
 
    let [template, ...tokens] = args;
    tokens = tokens || [];
    tokens = tokens.map(token => chalk.bold(token));

    const message = sprintf(template, tokens);

    const formattedLabel = chalk.hex(labelEntry.color.hex)
      (labelEntry.equalized + ': ');

    console.log(formattedLabel + message);
  }
}

const LoggerFactory = {
  createLogger(labelsData, levelsData, options) {
    const logger = new Logger(labelsData, levelsData, options);
    logger.init();
    logger.enable();
    return logger;
  }
};


module.exports = {
  _default: LoggerFactory,
  Logger,
  color
};
