# tic80-typescript
Create your TIC-80 games with TypeScript

## What is this?

The goal of this tool is to ease the use of TypeScript for the [TIC-80](https://tic.computer/). It contains:
- `tic.d.ts`: a file containing the definition of all TIC-80 functions
- `tsconfig.json`: basic settings to compile your `.ts` files in a single `.js` file
- `config.json`: defined just below
- `main.ts`: a sample TypeScript file
- `runtic.js`: the script that will compress your code (while keeping it readable by default), inject it to TIC-80, and launch your game 

## Installation

- Download [the zip](https://github.com/scambier/tic80-typescript/archive/master.zip) containing this repository, and extract it in your working directory.

- Run `npm install`

- Edit the values in `config.json`:
```js
{
  "game": { // Some information about your game
    "author": "game developer",
    "desc": "short description",
    "cart": "javascript.tic" // The name of your TIC cart. Must end with ".tic"
  },
  "tic": {
    "ticPath": "path/to/tic/executable", // The path to your TIC executable
    "cartsPath": "path/to/tic/carts/folder" // The directory where TIC stores its carts
  },
  "compression": { // These settings will alter how the final js file will look like
    "compressedFile": "build/compress.js", // Path to compressed file. You should not have to change this.
    "indentLevel": 1,
    "keepComments": false,
    "compress": false,
    "mangle": false
  }
}
```

## Usage

- First, create an empty game in TIC-80, and report its name in `config.json` (`"game"` > `"cart"`)
- Write your code (a sample `main.ts` is provided)
- Ensure that your code is compiled to `build/compiled.js`. This tool does **not** perform the compilation from `ts` to `js`.
- Run `npm start` to compress your code (to `build/compressed.js` by default) and launch your game.

This command will try to execute your compiled file (to catch any exception and print its stack trace), 
run it through Uglify-js to compress it, and then inject the resulting code into TIC-80.

## Code size with different compression options

- Default compiled file, straight from TypeScript: 100% of code size
- With indent level of 1 and comments removed: 71%
- Compressed: 55%
- Compressed and mangled: 44%

(Your mileage may vary.)

## Requirements

NodeJS 6+, TypeScript


## Changelog

### 2017-07-09

- Added a `require` of the compiled code to catch exceptions
- Added uglify-js to compress the compiled code
- Rewrote the launch script

