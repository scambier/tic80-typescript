#!/usr/bin/env node

'use strict'

const
  uglifyJS = require('uglify-js'),
  stripJsonComments = require('strip-json-comments'),
  fs = require('fs-extra'),
  path = require('path'),
  child_process = require('child_process'),
  program = require('commander'),
  yesno = require('yesno'),
  toCopyDir = path.join(__dirname, '../tocopy')

program
  .version(require('../package.json').version)
  .option('-i, --init', 'Create required files in the current repository')
  .option('-r, --run', 'Compile, compress, and launch your TIC-80 game')
  .option('--sample', 'Do you need a sample file to start with? We have it.')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(0)
}

if (program.init) {
  init()
}

if (program.run) {
  run()
}

if (program.sample) {
  copySample()
}

/**
 * Initialization code
 * Copy required files to working dir
 */
function init(): void {
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
function run(): void {

  const
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

    child_process.exec(cmd, function (error, stdout, stderr) {
      if (stdout) console.log(stdout)
      if (stderr) console.log(stderr)
      if (cGame['backup'] === true) {
        backupCart()
      }
    })
  }

  function backupCart(): void {
    const cartPath = `${cTic['cartsDirectory']}/${cGame['cart']}`
    if (fs.existsSync(cartPath)) {
      if (fs.existsSync(cGame['cart'])) {
        fs.unlinkSync(cGame['cart'])
      }
      fs.createReadStream(cartPath).pipe(fs.createWriteStream(cGame['cart']))
    } else {
      console.error(`Unable to copy ${cartPath}`)
      console.error(`Did you save your game at least once in TIC-80?`)
    }
  }

  compile()
}

function copySample(): void {
  const
    file = 'tsc80-sample.ts',
    from = path.join(__dirname, '../sample', file),
    to = path.join(process.cwd(), file)
  fs.copySync(from, to, {
    filter: () => {
      if (fs.existsSync(to)) {
        console.log(`/!\\ ${file} already exists in directory, skipping`)
        return false
      }
      console.log(`/!\\ ${file} created`)
      return true
    }
  })
}