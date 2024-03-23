#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require("child_process");
var fs = require("fs-extra");
var path = require("path");
var stripJsonComments = require("strip-json-comments");
var yesno = require("yesno");
var commander_1 = require("commander");
var chokidar = require("chokidar");
var esbuild = require("esbuild");
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
    var toWatch = path.join(process.cwd(), "**/*.ts");
    if (run) {
        // Watch changes
        chokidar
            .watch(toWatch)
            .on("change", function () {
            try {
                compileAndRun(false);
            }
            catch (e) {
                console.error(e);
            }
        })
            .on("ready", function () { return compileAndRun(); });
    }
    else {
        // Build once
        compileAndRun(false);
    }
    function compileAndRun(launch) {
        if (launch === void 0) { launch = true; }
        var metadata = extractMetadata();
        compile();
        makeGameFile(metadata);
        launch && launchTIC();
    }
    function extractMetadata() {
        var keys = [
            "title",
            "author",
            "desc",
            "site",
            "license",
            "version",
            "script",
            "input",
            "saveid",
        ];
        var metadata = "";
        var code = fs.readFileSync(config.entry, "utf8");
        var lines = code.split("\n");
        var _loop_1 = function (line) {
            if (keys.find(function (k) { return line.startsWith("// ".concat(k, ":")); })) {
                metadata += line + "\n";
            }
        };
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            _loop_1(line);
        }
        return metadata;
    }
    function compile() {
        console.log("Building ".concat(config.outfile, "..."));
        if (!!config.treeShaking)
            console.log("Tree shaking enabled");
        esbuild.buildSync({
            entryPoints: [config.entry],
            bundle: true,
            format: "esm",
            outfile: config.outfile,
            loader: { ".ts": "ts" },
            keepNames: true,
            treeShaking: !!config.treeShaking,
            charset: "utf8",
            minifyIdentifiers: false,
            minifyWhitespace: config.minify,
            minifySyntax: config.minify,
            target: "es2020",
        });
    }
    function makeGameFile(metadata) {
        var buildStr = fs
            .readFileSync(config.outfile, "utf8")
            // Explicit strict mode breaks the global TIC scope
            .replace('"use strict";', "");
        if (buildStr.length < 10) {
            console.log("empty code");
            console.log(buildStr);
        }
        if (!config.ticExecutable) {
            console.log('Missing "ticExecutable" in tsc80-config.json');
            process.exit(0);
        }
        fs.writeFileSync(config.outfile, metadata + buildStr);
        console.log("Build complete.");
    }
    function launchTIC() {
        var child = child_process.spawn(config.ticExecutable, [
            "--skip",
            "--keepcmd",
            "--fs=".concat(process.cwd()),
            "--cmd",
            "load game.js & load ".concat(config.outfile, " code & run"),
        ], {
            stdio: "inherit",
        });
        child.on("exit", function (code, signal) {
            process.exit(code !== null && code !== void 0 ? code : 0);
        });
    }
}
