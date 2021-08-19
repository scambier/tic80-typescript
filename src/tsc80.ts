#!/usr/bin/env node

import * as child_process from 'child_process'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as stripJsonComments from 'strip-json-comments'
import * as uglifyJS from 'uglify-js'
import * as yesno from 'yesno'
import { Command } from 'commander'
import * as chokidar from 'chokidar'

const version: string = require('../package.json').version

const program = new Command()
program.version(version)

program
  .command('init')
  .description('Copy the required files inside current directory. If a file already exists, it will be skipped.')
  .action(init)

program
  .command('build')
  .description(' Compile and compress your game')
  // .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
  .action((option, command) => {
    build({ run: false })
  })

program
  .command('run')
  .description(' Build, watch, and launch your TIC-80 game')
  // .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
  .action((option, command) => {
    build({ run: true })
  })

program.parse()

// let arg = process.argv[2]
// if (arg) {
//   arg = arg.toLowerCase()
//   if (arg === 'init') {
//     init()
//   }
//   else if (arg === 'run') {
//     run()
//   }
//   else {
//     showHelp()
//   }
// } else {
//   showHelp()
// }

/**
 * Initialization code
 * Copy required files to working dir
 */
function init(): void {

  const toCopyDir = path.join(__dirname, '../tocopy')

  console.log('The following files will be added to the current directory:')

  // Fetch all files to copy
  fs.readdirSync(toCopyDir).forEach(file => {
    console.log(file)
  })

  yesno({ question: 'Proceed to copy? (y/n)' }).then(ok => {
    if (!ok) {
      console.log('Stopping installation')
      process.exit(0)
    }

    console.log()
    fs.readdirSync(toCopyDir).forEach((file: string) => {
      const from = path.join(toCopyDir, file)
      const to = path.join(process.cwd(), file)
      fs.copySync(from, to, {
        filter: () => {
          if (fs.existsSync(to)) {
            console.log(`/!\\ ${file} already exists in directory, skipping`)
            return false
          }
          return true
        }
      })
    })

    console.log('\nAll files copied. Edit the tsc80-config.json, then type "tsc80 run"')
    process.exit(0)
  })
}

/**
 * Compile, compress, run
 */
function build({ run = false }): void {

  const config: any = JSON.parse(stripJsonComments(fs.readFileSync('tsc80-config.json', 'utf8')))
  const tsconfig: any = JSON.parse(stripJsonComments(fs.readFileSync('tsconfig.json', 'utf8')))

  const cTic: {
    ticExecutable: string,
  } = config['tic']

  const cCompress: {
    compressedFile: string,
    indentLevel: number,
    compress: boolean,
    mangle: boolean
  } = config['compression']

  const outFile: string = tsconfig['compilerOptions']['outFile']

  function compile(): void {
    console.log('Compiling TypeScript...')

    // Initial build
    child_process.execSync(`tsc`)
    makeGameFile()

    // Watching and rebuilding
    if (run) {
      child_process.exec(`tsc --watch`, (error, stdout, stderr) => {
        if (stdout) { console.log(stdout) }
        if (stderr) console.log(stderr)
      })

      // Watch changes
      chokidar.watch(outFile).on('change', (path, stats) => {
        makeGameFile()
      })
      launchTIC()
    }
  }

  function makeGameFile(): void {
    console.log('Building game file')
    const buildStr = fs.readFileSync(outFile, 'utf8')
    const result = uglifyJS.minify(buildStr, {
      compress: cCompress.compress ? {} : false,
      mangle: cCompress.mangle ? { toplevel: false } : false,
      output: {
        semicolons: false, // Only works if `mangle` or `compress` are set to false
        beautify: !(cCompress.mangle || cCompress.compress),
        indent_level: cCompress.indentLevel,
        comments: true,
      }
    })

    // Global strict mode breaks the global scope
    result.code = result.code.replace('"use strict"', '')

    fs.writeFileSync(cCompress.compressedFile, result.code)

    if (!cTic.ticExecutable) {
      console.log('Missing "ticExecutable" in tsc80-config.json')
      process.exit(0)
    }
  }

  function launchTIC() {

    let child = child_process.spawn(cTic.ticExecutable,
      [
        '--skip',
        '--keepcmd',
        `--fs=${process.cwd()}`,
        '--cmd',
        `load game.js & load ${cCompress.compressedFile} code & run`,
      ],
      {
        stdio: 'inherit'
      })

    child.on('exit', (code, signal) => {
      process.exit(code ?? 0)
    })
  }

  compile()
}
