# TSC-80 - TypeScript for the TIC-80

![](logo.png)

---

_The documentation for TSC-80 **1.0** is available [here](https://github.com/scambier/tic80-typescript/tree/v1) - Projects created for TSC-80 1.0 are incompatible with 2.0_

---

Write your [TIC-80](https://tic80.com/) **PRO** games in TypeScript.

TSC-80 contains all the functions declarations (`.d.ts`) for the TIC-80 API, and will compile your TypeScript code in JavaScript to inject it into your TIC-80 cart.

## Installation and usage

### Pre-requisites

This tool has been tested with TIC-80 version 1.2.x (pro edition) on Windows 10, and should work on all platforms compatible with TIC-80 and TypeScript.

1. Install NodeJS LTS
2. Install TypeScript: `npm install -g typescript`
3. Install TSC-80: `npm install -g tic80-typescript`

### Create a project

1. `tsc80 init` will create the necessary files (config, declarations, and game files) into the current directory
2. Set the correct values inside the `tsc80-config.json`

### Configuration

You need to complete the `tsc80-config.json` for each project.

```js
{
  "ticExecutable": "path/to/tic/executable/file", // The file path to your TIC executable.
  "entry": "main.ts", // The entry point of your game's code
  "outfile": "build/output.js", // Path to bundled file. You should not have to change this.
  "minify": false // If you want to minify your build. May provide very slight performances improvements
}
```

### Run TSC-80

- `$ tsc80 build` will build your game into the "build" directory
- `$ tsc80 run` will build, watch the changes, and launch your game through TIC-80

Once that TIC-80 is running, all code changes in .ts files will be reflected after a reload (`ctrl+r`). You can update and save your assets directly in TIC-80.

### Workflow

`$ tsc80 run` continuously watches changes in your .ts files and compiles them on the fly. You then alt-tab to TIC-80, and hit `ctrl+r` to reload the game.
This instructs TIC-80 to load `game.js` and inject the compiled code inside the cart.

❗ You **must not** edit the compiled JavaScript code inside the TIC-80 editor. Your changes would be overwritten.

You **must** only edit **assets** (sprites, map, sounds, music) inside the TIC-80 editor. **Don't forget to save your changes _before_ reloading the code.**

When you hit `ctrl+s` inside TIC-80, `game.js` is saved as a standalone TIC-80 cart.

#### Version control

The `build` folder can be ignored, but you **must** commit `game.js`, since it contains all non-code assets.

## Code & Modules

If you know TypeScript and modern web development, writing your TIC-80 game with TSC-80 should be straightforward. It uses [esbuild](https://esbuild.github.io/) to compile and bundle the code, targets `ES2020` and uses the modern ESM syntax (`import` & `export`).

`tsc80 build|run` only transpiles your TypeScript files to JavaScript, and compiles them together as a single output file. Internally, TIC-80 uses [QuickJS](https://github.com/nesbox/quickjs) as its JavaScript engine.

The following limitations apply:

- JS code up to ES2020. This tool does not provide polyfills.
- ! No `export` from your entry file
- Required to have a single file output
- Tree-shaking is disabled by default, as esbuild would strip important "unused" functions like `TIC()`

## Issues

**TIC-80 doesn't reload my code**

If you're building TIC-80 yourself, make sure to use the correct settings

```sh
$ cd <path-to-tic>/build
$ cmake -G "Visual Studio 16 2019" -DBUILD_PRO=On -DCMAKE_BUILD_TYPE=MinSizeRel ..
$ cmake --build . --config MinSizeRel --parallel
```

## Changelog

### 2.0.0 - 2024-02-16 - BREAKING CHANGES

- Projects created for TSC-80 1.0 must be refactored to be compatible with 2.0
- Builds are now done with esbuild, instead of `tsc`
- Projects now use ESM, with `import` and `export`

### 1.1.0 - 2023-08-18

- Formal tsconfig update to output ES2020 code for TIC-80 1.1.x

### 1.0.3 - 2023-08-09

- Dependencies update

### 1.0.1 - 2022-06-22

- Cleaner code
- Fixed race condition by @tmountain

### 1.0.0 - 2022-05-15

- Official release for TIC-80 1.0
- Added `ttri()`

### 1.0.0-dev - 2021-08-19

- Refactoring to make this tool compatible with TIC-80 1.0.x-dev
- Simplified workflow
- Added `peek1()`, `peek2()`, `poke1()`, `poke2()`, `vbank()`

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

- Compile from TS to JS (_finally..._)
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
