#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require("child_process");
var fs = require("fs-extra");
var path = require("path");
var stripJsonComments = require("strip-json-comments");
var uglifyJS = require("uglify-js");
var yesno = require("yesno");
var commander_1 = require("commander");
var chokidar = require("chokidar");
var version = require("../package.json").version;
var program = new commander_1.Command();
program.version(version);
program
    .command("init")
    .description("Copy the required files inside current directory. If a file already exists, it will be skipped.")
    .action(init);
program
    .command("build")
    .description(" Compile and compress your game")
    // .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
    .action(function (option, command) {
    build({ run: false });
});
program
    .command("run")
    .description(" Build, watch, and launch your TIC-80 game")
    // .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
    .action(function (option, command) {
    build({ run: true });
});
program.parse();
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
function init() {
    var toCopyDir = path.join(__dirname, "../tocopy");
    console.log("The following files will be added to the current directory:");
    // Fetch all files to copy
    fs.readdirSync(toCopyDir).forEach(function (file) {
        console.log(file);
    });
    yesno({ question: "Proceed to copy? (y/n)" }).then(function (ok) {
        if (!ok) {
            console.log("Stopping installation");
            process.exit(0);
        }
        console.log();
        fs.readdirSync(toCopyDir).forEach(function (file) {
            var from = path.join(toCopyDir, file);
            var to = path.join(process.cwd(), file);
            fs.copySync(from, to, {
                filter: function () {
                    if (fs.existsSync(to)) {
                        console.log("/!\\ ".concat(file, " already exists in directory, skipping"));
                        return false;
                    }
                    return true;
                },
            });
        });
        console.log('\nAll files copied. Edit the tsc80-config.json, then type "tsc80 run"');
        process.exit(0);
    });
}
/**
 * Compile, compress, run
 */
function build(_a) {
    var _b = _a.run, run = _b === void 0 ? false : _b;
    var config = JSON.parse(stripJsonComments(fs.readFileSync("tsc80-config.json", "utf8")));
    var tsconfig = JSON.parse(stripJsonComments(fs.readFileSync("tsconfig.json", "utf8")));
    var cTic = config["tic"];
    var cCompress = config["compression"];
    var outFile = tsconfig["compilerOptions"]["outFile"];
    var toWatch = path.join(process.cwd(), "**/*.ts");
    if (run) {
        // Watch changes
        chokidar.watch(toWatch).on("change", function () {
            try {
                compileAndRun(false);
            }
            catch (e) {
                console.error(e);
            }
        }).on("ready", function () { return compileAndRun(); });
    }
    else {
        // Build once
        compileAndRun(false);
    }
    function compileAndRun(launch) {
        if (launch === void 0) { launch = true; }
        compile();
        makeGameFile();
        launch && launchTIC();
    }
    function compile() {
        console.log("Compiling TypeScript...");
        child_process.execSync("tsc", { encoding: "utf-8" });
    }
    function makeGameFile() {
        console.log("Building game file...");
        var buildStr = fs.readFileSync(outFile, "utf8");
        // Explicit strict mode breaks the global TIC scope
        buildStr = buildStr.replace('"use strict";', "");
        var result = uglifyJS.minify(buildStr, {
            compress: cCompress.compress
                ? {
                    join_vars: false,
                }
                : false,
            mangle: cCompress.mangle
                ? {
                    toplevel: false,
                    keep_fnames: true,
                }
                : false,
            output: {
                semicolons: false,
                beautify: !(cCompress.mangle || cCompress.compress),
                indent_level: cCompress.indentLevel,
                // Always keep the significant comments: https://github.com/nesbox/TIC-80/wiki/The-Code
                comments: cCompress.compress || cCompress.mangle
                    ? RegExp(/title|author|desc|script|input|saveid|menu/)
                    : true,
            },
        });
        if (result.code.length < 10) {
            console.log("empty code");
            console.log(buildStr);
        }
        fs.writeFileSync(cCompress.compressedFile, result.code);
        if (!cTic.ticExecutable) {
            console.log('Missing "ticExecutable" in tsc80-config.json');
            process.exit(0);
        }
        console.log("Build complete");
    }
    function launchTIC() {
        var child = child_process.spawn(cTic.ticExecutable, [
            "--skip",
            "--keepcmd",
            "--fs=".concat(process.cwd()),
            "--cmd",
            "load game.js & load ".concat(cCompress.compressedFile, " code & run"),
        ], {
            stdio: "inherit",
        });
        child.on("exit", function (code, signal) {
            process.exit(code !== null && code !== void 0 ? code : 0);
        });
    }
}
