# TSC-80 - TypeScript for the TIC-80

[![Actively Maintained](https://img.shields.io/badge/Maintenance%20Level-Actively%20Maintained-green.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)

TIC-80 versions compatibility:

- 0.80.x: `npm install -g tic80-typescript`
- 0.90.x: not compatible due to api changes
- 1.0.x-dev: [documentation here](https://github.com/scambier/tic80-typescript/tree/develop), `npm install -g tic80-typescript@next`

![](logo.png)

Write your [TIC-80](https://tic80.com/) games in TypeScript. Works with the free version of TIC-80.

TSC-80 contains all the functions declarations (`.d.ts`) for the TIC-80 API, and will compile your TypeScript code in JavaScript to inject it into your TIC-80 cart.

## Installation and usage

### Pre-requisites

This tool has been tested with TIC-80 version 0.80.1344 (free edition) on Windows 10, and should work on all platforms compatible with TIC-80 and TypeScript.

1. Install NodeJS LTS
2. Install TypeScript (`npm install -g typescript`)
3. Create and save an empty JavaScript game in TIC-80 (`new js` then `save yourjsgame`)

### Install TSC-80 and create a boilerplate project

1. `$ npm install -g tic80-typescript`
2. `$ tsc80 init` will create the necessary files (config, index.ts and declarations) into the current directory
3. Set the correct values inside the `tsc80-config.json` (see below)

### Configuration

You need to complete the `tsc80-config.json` for each project.

```js
{
  "game": { // Some information about your game
    "author": "game developer",
    "title": "Your cart's title",
    "desc": "short description",
    "input": "gamepad", // Or "mouse", or "keyboard". All inputs are enabled this field is omitted.
    "cart": "yourjsgame.tic", // The name of your TIC cart. Must end with ".tic"
    "backup": true // Copy your cart from the TIC folder to your project folder. Useful for version control backups.
  },
  "tic": {
    "ticExecutable": "path/to/tic/executable/file", // The file path to your TIC executable.
    "cartsDirectory": "path/to/tic/carts/folder" // The directory where TIC stores its carts. Accessible from TIC with the "folder" command
  },
  "compression": { // These settings will alter how the final js file will look like
    "compressedFile": "build/compressed.js", // Path to compressed file. You should not have to change this.
    "indentLevel": 1, // Ignored if `compress` or `mangle` are `true`
    "compress": false,
    "mangle": false // Compress a bit further
  }
}
```

### Run TSC-80

- `$ tsc80 run` will compile, compress, and inject your code into the `.tic` file, then start your game.
- Once that TIC-80 is running, you can save your game cart with `save`.

**Do not forget to save your cart after modifiyng non-code assets (sprites, map, sounds, music)!**

If the backup option is set, the resulting `.tic` file will be automatically copied in your project directory when you close TIC-80.

## Compression options

The compression options in `tsc80-config.json` can help you to save a lot of space if you're running against TIC-80 limitations.

- Default compiled file, straight from TypeScript: 100% of code size
- `"indentLevel": 1` - 71% of original code size (that is the default)
- `"compress": true` - 55%
- `"mangle": true` - 44%

(Your mileage may vary.)

## Code organization & limitations

TSC-80 only transpiles your TypeScript files to JavaScript, and compiles them together as a single output file. Internally, TIC-80 uses [Duktape](https://duktape.org/) as its JavaScript engine.

The following limitations apply:

- ES5 only (with some syntax exceptions). TSC-80 does not provide polyfills.
- Required to have a single file output (`compilerOptions.outFile` in `tsconfig.json`)
- No modules, and no npm dependencies.
- All declared variables and classes at file level (in all files) are public and share the same root namespace.
- By default, files are compiled in an undefined order. This may cause problems, as some initialization code may be called before all the required classes/functions are read, leading to `undefined` errors.

Some tips to ease development:

- The default [index.ts](https://github.com/scambier/tic80-typescript/blob/master/tocopy/index.ts) has an `init()` function that is called once during the first game loop.
- You can always use [TypeScript's triple-slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) and [namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html) to manage dependencies order.
- Don't compress the output file unless necessary.
- If you run into any problem, like a black screen or an error message, please double check your `tsc80-config.json` and the generated js code.

## Changelog

### 0.4.9 - 2021-07-17

- Added `elli()`, `ellib()`, and `trib()`

### 0.4.8 - 2021-04-19

- Fixed `mouse()` signature

### 0.4.7 - 2021-04-08

- Removing `"use strict"` from output file, since it breaks the global scope in TIC-80 engine.
- Updated dependencies
- Stricter TypeScript
- Better documentation

### 0.4.6 - 2021-04-03

- Cleaned a bit of code
- Added information in README
- `compress` and `mangle` now default to true

### 0.4.5 - 2020-06-15

- Added new function declarations (up-to-date with TIC version 0.80)
- Added jsdocs for all functions. Thanks a lot @miltoncandelero

### 0.4.3 - 2019-01-17

- Fixed the return types of multiple functions
- Updated the boilerplate code to meet TS standards

### 0.4.2 - 2018-04-19

- Added `key()`, `keyp()` and `reset()` declarations
- Updated the boilerplate code for latest TIC-80 version
- Updated README for better, step-by-step instructions

### 0.4.1 - 2017-10-13

- Fixed missing input support (thanks @matanegui)
- Fixed `tsc80` cmd help message

### 0.4 - 2017-10-08

- Added `textri()` declaration

### 0.3 - 2017-08-05

- Refactored code

### 0.2 - 2017-08-04

- Making a real npm package

### 2017-07-31

- Added a `backup` option to copy your cart to your project's folder

### 2017-07-29

- Updated `print()` and `spr()` declarations

### 2017-07-27

- Added `exit()` declaration to `tic.d.ts`
- Updated `README.md`

### 2017-07-19

- Updated `tic.d.ts`

### 2017-07-11

- Compile from TS to JS (*finally...*)
- Renamed "main.ts" to "sample.ts"
- Described a small trick to ensure that the init code waits for its dependencies
- Removed the `require` of the compiled file
- Cleared README a bit

### 2017-07-09

- Added a `require` of the compiled code to catch exceptions
- Added uglify-js to compress the compiled code
- Rewrote the launch script

### 2017-07-06

- Project birth: created a definitions file for TIC-80, and a `tsconfig.json`
