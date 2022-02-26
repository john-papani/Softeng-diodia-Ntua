#!/usr/bin/env node

require = require('esm')(module);
require('./mycli.js').cli(process.argv);
