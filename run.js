#!/usr/bin/env node

'use strict';

const
  // User settings
  tic = "absolute/path/to/tic/executable",
  storage = "absolute/path/to/carts/directory",
  cart = "game.tic",

  // Typescript and TIC settings
  code = "build.js",
  cmd = `${tic} "${storage}/${cart}" -code ${code}`,
  child_process = require('child_process');

console.log(`Executing ${cmd}`);

child_process.exec(cmd, function (error, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
});
