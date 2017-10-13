# TSC-80 - TypeScript for the TIC-80

![](logo.png)

Write your [TIC-80](https://tic.computer/) games in TypeScript


## Installation and usage

### Pre-requisites

- Install NodeJS 6+
- Install TypeScript (`npm install -g typescript`)
- Create and save an empty game in TIC-80

### Install TSC-80

- `$ npm install -g tic80-typescript`
- `$ tsc80 init` to copy the necessary files into the current directory
- Setup correct values inside the `tsc80-config.json` (see below)

### Run TSC-80

- Create a `.ts` file to start your game (a sample is provided in this repo)
- `$ tsc80 run` will compile, compress, and launch your game through the TIC-80.

### Configuration options

You need to complete the `tsc80-config.json` for each project. **All fields are required.**
```js
{
  "game": { // Some information about your game
    "author": "game developer",
    "title": "Your cart's title",
    "desc": "short description",
    "input": "gamepad", // Or "mouse"
    "cart": "mygame.tic", // The name of your TIC cart. Must end with ".tic"
    "backup": true // Copy your cart from the TIC folder to your project folder. Backup it with git!
  },
  "tic": {
    "ticExecutable": "path/to/tic/executable", // The path to your TIC executable
    "cartsDirectory": "path/to/tic/carts/folder" // The directory where TIC stores its carts. Accessible from TIC with the "folder" command
  },
  "compression": { // These settings will alter how the final js file will look like
    "compressedFile": "build/compressed.js", // Path to compressed file. You should not have to change this.
    "indentLevel": 1,
    "compress": false,
    "mangle": false
  }
}
```

Do note that if you happen to manually edit the `tsconfig.json` file, it is required to keep the `compilerOptions.outFile` option.


## More

### Code organization

With the default `tsconfig.json`, TSC-80 will build all `.ts` files in your project folder, in no particular order. 
This may cause some problems, as some initialization code may be called before all the required classes/functions are read, leading to `undefined` errors.

What you can do is call an `init()` function once, in your `TIC()` function.  
A sample file is provided [here](https://github.com/scambier/tic80-typescript/blob/master/sample/tsc80-sample.ts).

### Compression options

The minification/compression options provided by Uglify work well to save you a lot of precious TIC-80's space.

- Default compiled file, straight from TypeScript: 100% of code size
- `"indentLevel": 1`: 71% (that is the default)
- `"compress": true`: 55%
- `"mangle": true`: 44%

(Your mileage may vary.)


## Changelog

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
