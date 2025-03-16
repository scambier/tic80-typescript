#!/usr/bin/env node

import * as child_process from "child_process"
import * as fs from "fs-extra"
import * as path from "path"
import * as stripJsonComments from "strip-json-comments"
import * as uglifyJS from "uglify-js"
import * as yesno from "yesno"
import { Command } from "commander"
import * as chokidar from "chokidar"
import * as esbuild from "esbuild"

const version: string = require("../package.json").version

const program = new Command()
program.version(version)

program
  .command("init")
  .description(
    "Copy the required files inside current directory. If a file already exists, it will be skipped."
  )
  .action(init)

program
  .command("build")
  .description(" Compile and compress your game")
  // .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
  .action((option, command) => {
    build({ run: false })
  })

program
  .command("run")
  .description(" Build, watch, and launch your TIC-80 game")
  // .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
  .action((option, command) => {
    build({ run: true })
  })

program.parse()

/**
 * Initialization code
 * Copy required files to working dir
 */
function init(): void {
  const toCopyDir = path.join(__dirname, "../tocopy")

  console.log("The following files will be added to the current directory:")

  // Fetch all files to copy
  fs.readdirSync(toCopyDir).forEach((file) => {
    console.log(file)
  })

  yesno({ question: "Proceed to copy? (y/n)" }).then((ok) => {
    if (!ok) {
      console.log("Stopping installation")
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
        },
      })
    })

    console.log(
      '\nAll files copied. Edit the tsc80-config.json, then type "tsc80 run"'
    )
    process.exit(0)
  })
}

/**
 * Compile, compress, run
 */
function build({ run = false }): void {
  const config: {
    ticExecutable: string
    entry: string
    outfile: string
    minify: boolean
    /** 
     * This option is not officially supported 
     * because you need to make sure that
     * top-level functions like TIC() are not removed
     */
    treeShaking: boolean
  } = JSON.parse(
    stripJsonComments(fs.readFileSync("tsc80-config.json", "utf8"))
  )
  const tsConfig = JSON.parse(stripJsonComments(fs.readFileSync("tsconfig.json", "utf-8")))
  
  const toWatch = path.join(process.cwd(), "**/*.ts")

  if (run) {
    // Watch changes
    chokidar
      .watch(toWatch)
      .on("change", () => {
        try {
          compileAndRun(false)
        } catch (e) {
          console.error(e)
        }
      })
      .on("ready", () => compileAndRun())
  } else {
    // Build once
    compileAndRun(false)
  }

  function compileAndRun(launch = true) {
    const metadata = extractMetadata()
    compile()
    makeGameFile(metadata)
    launch && launchTIC()
  }

  function extractMetadata(): string {
    const keys = [
      "title",
      "author",
      "desc",
      "site",
      "license",
      "version",
      "script",
      "input",
      "saveid",
    ]
    let metadata = ""
    const code = fs.readFileSync(config.entry, "utf8")
    const lines = code.split("\n")
    for (const line of lines) {
      if (keys.find((k) => line.startsWith(`// ${k}:`))) {
        metadata += line + "\n"
      }
    }
    return metadata
  }

  function compile(): void {
    const target = tsConfig?.compilerOptions?.target ?? "es2020"
    console.log(`Building ${config.outfile} to ${target}...`)
    if (!!config.treeShaking) console.log("Tree shaking enabled")
    esbuild.buildSync({
      entryPoints: [config.entry],
      bundle: true,
      format: "esm",
      outfile: config.outfile,
      loader: { ".ts": "ts" },
      keepNames: true,
      treeShaking: !!config.treeShaking,
      charset: "utf8",
      minifyIdentifiers: false, // Or else global functions will be mangled https://esbuild.github.io/api/#minify-considerations
      minifyWhitespace: config.minify,
      minifySyntax: config.minify,
      target,
    })
  }

  function makeGameFile(metadata: string): void {
    const buildStr = fs
      .readFileSync(config.outfile, "utf8")
      // Explicit strict mode breaks the global TIC scope
      .replace('"use strict";', "")

    if (buildStr.length < 10) {
      console.log("empty code")
      console.log(buildStr)
    }

    if (!config.ticExecutable) {
      console.log('Missing "ticExecutable" in tsc80-config.json')
      process.exit(0)
    }

    fs.writeFileSync(config.outfile, metadata + buildStr)

    console.log("Build complete.")
  }

  function launchTIC() {
    let child = child_process.spawn(
      config.ticExecutable,
      [
        "--skip",
        "--keepcmd",
        `--fs=${process.cwd()}`,
        "--cmd",
        `load game.js & load ${config.outfile} code & run`,
      ],
      {
        stdio: "inherit",
      }
    )

    child.on("exit", (code, signal) => {
      process.exit(code ?? 0)
    })
  }
}
