#!/usr/bin/env node

import * as child_process from 'child_process'
import * as path from 'path'
import * as uglifyJS from 'uglify-js'
import * as stripJsonComments from 'strip-json-comments'
import * as fs from 'fs-extra'
import * as yesno from 'yesno'

let arg = process.argv[2]
if (arg) {
  arg = arg.toLowerCase()
  if (arg === 'init') {
    init()
  }
  else if (arg === 'run') {
    run()
  }
  else {
    showHelp()
  }
} else {
  showHelp()
}

/**
 * Initialization code
 * Copy required files to working dir
 */
function init() {

  let toCopyDir = path.join(__dirname, '../tocopy')

  console.log('The following files will be added to the current directory:')

  // Fetch all files to copy
  fs.readdirSync(toCopyDir).forEach(file => {
    console.log(file)
  })

  yesno.ask("Proceed to copy? (y/n)", false, (ok: boolean) => {
    if (!ok) {
      console.log("Stopping installation")
      process.exit(0)
    }

    console.log()
    fs.readdirSync(toCopyDir).forEach((file: string) => {
      const
        from = path.join(toCopyDir, file),
        to = path.join(process.cwd(), file)
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

    console.log('\nAll files copied. Setup the tsc80-config.json, then type "tsc80 run"')
    process.exit(0)
  })
}

/**
 * Compile, compress, run
 */
function run() {

  let
    config: object = JSON.parse(stripJsonComments(fs.readFileSync('tsc80-config.json', 'utf8'))),
    tsconfig: object = JSON.parse(stripJsonComments(fs.readFileSync('tsconfig.json', 'utf8'))),
    cGame: object = config['game'],
    cTic: object = config['tic'],
    cCompress: object = config['compression'],
    outFile: string = tsconfig['compilerOptions']['outFile']

  function compile(): void {
    console.log('Compiling TypeScript...')
    child_process.exec('tsc', function (error, stdout, stderr) {
      if (stdout) console.log(stdout)
      if (stderr) {
        console.log(stderr)
      }
      else {
        compressAndLaunch()
      }
    })
  }

  function compressAndLaunch(): void {
    const
      buildStr = fs.readFileSync(outFile, 'utf8'),
      result = uglifyJS.minify(buildStr, {
        compress: cCompress['compress'],
        mangle: cCompress['mangle'],
        output: {
          semicolons: false,
          beautify: !cCompress['mangle'] && !cCompress['compress'],
          indent_level: cCompress['indentLevel'],
          comments: false,
          preamble: `// title: ${cGame['title']}\n// author: ${cGame['author']}\n// desc: ${cGame['desc']}\n// script: js\n`
        }
      })

    fs.writeFileSync(cCompress['compressedFile'], result.code)

    if (!cTic['ticExecutable'] || !cTic['cartsDirectory']) {
      console.log('Missing "ticExecutable" and/or "cartsDirectory" in tsc80-config.json')
      process.exit(0)
    }

    const cmd = `"${cTic['ticExecutable']}" "${cTic['cartsDirectory']}/${cGame['cart']}" -code ${cCompress['compressedFile']}`
    console.log(`Launch TIC: ${cmd}`)

    let child = child_process.spawn(cTic['ticExecutable'],
      [
        `${cTic['cartsDirectory']}/${cGame['cart']}`,
        '-code',
        cCompress['compressedFile']
      ],
      {
      stdio: 'inherit'
    })

    child.on('exit', (code, signal) => {
      process.on('exit', () => {
        backupCart()
        child = null
        if (signal) {
          process.kill(process.pid, signal)
        } else {
          process.exit(code)
        }
      })
    })
  }

  function backupCart(): void {
    const cartPath = `${cTic['cartsDirectory']}/${cGame['cart']}`
    if (fs.existsSync(cartPath)) {
      if (fs.existsSync(cGame['cart'])) {
        fs.unlinkSync(cGame['cart'])
      }
      fs.copySync(cartPath, cGame['cart'])
      console.log(`Backuped ${cGame['cart']} into current dir`)
    } else {
      console.error(`Unable to copy ${cartPath}`)
      console.error(`Did you save your game at least once in TIC-80?`)
    }
  }

  compile()
}

function showHelp() {
  console.log()
  console.log('  Usage: tsc80 [command]')
  console.log()
  console.log('  Commands:')
  console.log('')
  console.log('    help  Copy the required files inside current directory. If a file already exists, it will be skipped.')
  console.log('    run   Compile, compress, and launch your TIC-80 game')
}