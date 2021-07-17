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
  .command('run')
  .description(' Compile, compress, and launch your TIC-80 game')
  .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
  .action((option, command) => {
    run(option.watch)
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
function run(watch = false): void {

  const config: any = JSON.parse(stripJsonComments(fs.readFileSync('tsc80-config.json', 'utf8')))
  const tsconfig: any = JSON.parse(stripJsonComments(fs.readFileSync('tsconfig.json', 'utf8')))

  const cGame: {
    author: string,
    title: string,
    desc: string,
    cart: string,
    input: 'gamepad' | 'mouse',
    backup: boolean
  } = config['game']

  const cTic: {
    ticExecutable: string,
    cartsDirectory: string
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
    // First run to at least have the file
    child_process.exec(`tsc ${watch ? '--watch' : ''}`, (error, stdout, stderr) => {
      if (stdout) console.log(stdout)
      if (stderr) console.log(stderr)
    })
    chokidar.watch(outFile).on('change', (path, stats) => {
      makeGameFile()
      launchTIC()
    })

  }

  let ticRunning = false
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
        comments: false,
        preamble: `// title: ${cGame.title}\n// author: ${cGame.author}\n// desc: ${cGame.desc}\n// script: js\n${cGame.input ? `input: ${cGame.input}\n` : ''}`
      }
    })

    // Global strict mode breaks the global scope
    result.code = result.code.replace('"use strict"', '')

    fs.writeFileSync(cCompress.compressedFile, result.code)

    if (!cTic.ticExecutable || !cTic.cartsDirectory) {
      console.log('Missing "ticExecutable" and/or "cartsDirectory" in tsc80-config.json')
      process.exit(0)
    }
  }

  function launchTIC() {
    if (ticRunning) return
    const cmd = `"${cTic.ticExecutable}" "${cTic.cartsDirectory}/${cGame.cart}" -code ${cCompress.compressedFile}`
    console.log(`Launch TIC: ${cmd}`)

    ticRunning = true
    let child = child_process.spawn(cTic.ticExecutable,
      [
        `${cTic.cartsDirectory}/${cGame.cart}`,
        watch ? '-code-watch' : '-code',
        cCompress.compressedFile
      ],
      {
        stdio: 'inherit'
      })

    child.on('exit', (code, signal) => {
      process.on('exit', () => {
        ticRunning = false
        backupCart()
        // child = null
        if (signal) {
          process.kill(process.pid, signal)
        } else {
          process.exit(code ?? 0)
        }
      })
    })
  }

  function backupCart(): void {
    const cartPath = `${cTic.cartsDirectory}/${cGame.cart}`
    if (fs.existsSync(cartPath)) {
      if (fs.existsSync(cGame.cart)) {
        fs.unlinkSync(cGame.cart)
      }
      fs.copySync(cartPath, cGame.cart)
      console.log(`Copied ${cGame.cart} into current dir`)
    } else {
      console.error(`Unable to copy ${cartPath}`)
      console.error(`Did you save your game at least once in TIC-80?`)
    }
  }

  compile()
}

function showHelp(): void {
  console.log('  v' + version)
  console.log()
  console.log('  Usage: tsc80 [command]')
  console.log()
  console.log('  Commands:')
  console.log('')
  console.log('    init  - Copy the required files inside current directory. If a file already exists, it will be skipped.')
  console.log('    run   - Compile, compress, and launch your TIC-80 game')
}
