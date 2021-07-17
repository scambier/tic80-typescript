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
var version = require('../package.json').version;
var program = new commander_1.Command();
program.version(version);
program
    .command('init')
    .description('Copy the required files inside current directory. If a file already exists, it will be skipped.')
    .action(init);
program
    .command('run')
    .description(' Compile, compress, and launch your TIC-80 game')
    .option('-w, --watch', 'Will automatically recompile and refresh the TIC game')
    .action(function (option, command) {
    run(option.watch);
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
    var toCopyDir = path.join(__dirname, '../tocopy');
    console.log('The following files will be added to the current directory:');
    // Fetch all files to copy
    fs.readdirSync(toCopyDir).forEach(function (file) {
        console.log(file);
    });
    yesno({ question: 'Proceed to copy? (y/n)' }).then(function (ok) {
        if (!ok) {
            console.log('Stopping installation');
            process.exit(0);
        }
        console.log();
        fs.readdirSync(toCopyDir).forEach(function (file) {
            var from = path.join(toCopyDir, file);
            var to = path.join(process.cwd(), file);
            fs.copySync(from, to, {
                filter: function () {
                    if (fs.existsSync(to)) {
                        console.log("/!\\ " + file + " already exists in directory, skipping");
                        return false;
                    }
                    return true;
                }
            });
        });
        console.log('\nAll files copied. Edit the tsc80-config.json, then type "tsc80 run"');
        process.exit(0);
    });
}
/**
 * Compile, compress, run
 */
function run(watch) {
    if (watch === void 0) { watch = false; }
    var config = JSON.parse(stripJsonComments(fs.readFileSync('tsc80-config.json', 'utf8')));
    var tsconfig = JSON.parse(stripJsonComments(fs.readFileSync('tsconfig.json', 'utf8')));
    var cGame = config['game'];
    var cTic = config['tic'];
    var cCompress = config['compression'];
    var outFile = tsconfig['compilerOptions']['outFile'];
    function compile() {
        console.log('Compiling TypeScript...');
        // First run to at least have the file
        child_process.exec("tsc " + (watch ? '--watch' : ''), function (error, stdout, stderr) {
            if (stdout)
                console.log(stdout);
            if (stderr)
                console.log(stderr);
        });
        chokidar.watch(outFile).on('change', function (path, stats) {
            makeGameFile();
            launchTIC();
        });
    }
    var ticRunning = false;
    function makeGameFile() {
        console.log('Building game file');
        var buildStr = fs.readFileSync(outFile, 'utf8');
        var result = uglifyJS.minify(buildStr, {
            compress: cCompress.compress ? {} : false,
            mangle: cCompress.mangle ? { toplevel: false } : false,
            output: {
                semicolons: false,
                beautify: !(cCompress.mangle || cCompress.compress),
                indent_level: cCompress.indentLevel,
                comments: false,
                preamble: "// title: " + cGame.title + "\n// author: " + cGame.author + "\n// desc: " + cGame.desc + "\n// script: js\n" + (cGame.input ? "input: " + cGame.input + "\n" : '')
            }
        });
        // Global strict mode breaks the global scope
        result.code = result.code.replace('"use strict"', '');
        fs.writeFileSync(cCompress.compressedFile, result.code);
        if (!cTic.ticExecutable || !cTic.cartsDirectory) {
            console.log('Missing "ticExecutable" and/or "cartsDirectory" in tsc80-config.json');
            process.exit(0);
        }
    }
    function launchTIC() {
        if (ticRunning)
            return;
        var cmd = "\"" + cTic.ticExecutable + "\" \"" + cTic.cartsDirectory + "/" + cGame.cart + "\" -code " + cCompress.compressedFile;
        console.log("Launch TIC: " + cmd);
        ticRunning = true;
        var child = child_process.spawn(cTic.ticExecutable, [
            cTic.cartsDirectory + "/" + cGame.cart,
            watch ? '-code-watch' : '-code',
            cCompress.compressedFile
        ], {
            stdio: 'inherit'
        });
        child.on('exit', function (code, signal) {
            process.on('exit', function () {
                ticRunning = false;
                backupCart();
                // child = null
                if (signal) {
                    process.kill(process.pid, signal);
                }
                else {
                    process.exit(code !== null && code !== void 0 ? code : 0);
                }
            });
        });
    }
    function backupCart() {
        var cartPath = cTic.cartsDirectory + "/" + cGame.cart;
        if (fs.existsSync(cartPath)) {
            if (fs.existsSync(cGame.cart)) {
                fs.unlinkSync(cGame.cart);
            }
            fs.copySync(cartPath, cGame.cart);
            console.log("Copied " + cGame.cart + " into current dir");
        }
        else {
            console.error("Unable to copy " + cartPath);
            console.error("Did you save your game at least once in TIC-80?");
        }
    }
    compile();
}
function showHelp() {
    console.log('  v' + version);
    console.log();
    console.log('  Usage: tsc80 [command]');
    console.log();
    console.log('  Commands:');
    console.log('');
    console.log('    init  - Copy the required files inside current directory. If a file already exists, it will be skipped.');
    console.log('    run   - Compile, compress, and launch your TIC-80 game');
}
