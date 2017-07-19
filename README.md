# TypeScript for TIC-80
Create your TIC-80 games with TypeScript

## What is this?

The goal of this tool is to ease the use of TypeScript for the [TIC-80](https://tic.computer/). It contains:
- `tic.d.ts`: a file containing the definition of all TIC-80 functions
- `tsconfig.json`: basic settings to compile your `.ts` files in a single `.js` file
- `config.json`: defined just below
- `sample.ts`: a sample TypeScript file
- `runtic.js`: the script that will transform your TS files to a TIC-80 game

## Installation

- Download [the zip](https://github.com/scambier/tic80-typescript/archive/master.zip) containing this repository, and extract it in your working directory.
- Run `npm install`
- Create an empty game in TIC-80
- Edit the values in `config.json`:
```js
{
  "game": { // Some information about your game
    "author": "game developer",
    "desc": "short description",
    "cart": "mygame.tic" // The name of your TIC cart. Must end with ".tic"
  },
  "tic": {
    "ticPath": "path/to/tic/executable", // The path to your TIC executable
    "cartsPath": "path/to/tic/carts/folder" // The directory where TIC stores its carts
  },
  "compression": { // These settings will alter how the final js file will look like
    "compressedFile": "build/compressed.js", // Path to compressed file. You should not have to change this.
    "indentLevel": 1,
    "compress": false,
    "mangle": false
  }
}
```

## Usage

Simply run `npm start` (or `node runtic.js`) to compile, compress and launch your game.

## More

### Code organization

By default, the `tsconfig.json` will build all `.ts` files in your project folder, in no particular order. 
This may cause some problems, as some initialization code may be called before all the required classes/functions are read, leading to `undefined` errors.

What you can do is call an `init()` function once, in your `TIC()` function. See an example of this in `sample.ts`


### Code size with different compression options

The minification/compression options provided by Uglify work well to save you a lot of precious TIC-80's space.

Straight "TypeScript to JavaScript" code is indented with 4 spaces. By default, `npm start` will reduce indentation to 1 space.

- Default compiled file, straight from TypeScript: 100% of code size
- With indent level of 1 and comments removed: 71%
- Compressed: 55%
- Compressed and mangled: 44%

(Your mileage may vary.)

## Requirements

NodeJS 6+, TypeScript


## Changelog

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
