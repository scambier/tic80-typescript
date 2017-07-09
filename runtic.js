'use strict';

const
  uglifyJS = require('uglify-js'),
  stripJsonComments = require('strip-json-comments'),
  fs = require('fs'),
  child_process = require('child_process');
const
  config = JSON.parse(stripJsonComments(fs.readFileSync('config.json', 'utf8'))),
  tsconfig = JSON.parse(stripJsonComments(fs.readFileSync('tsconfig.json', 'utf8'))),
  cGame = config['game'],
  cTic = config['tic'],
  cCompress = config['compression'],
  outFile = tsconfig['compilerOptions']['outFile'];

// Try to execute the compiled script
try {
  require('./' + outFile);
} catch(e) {
  console.error(e.stack);
  return;
}

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
      preamble: `// author: ${cGame['author']}\n// desc: ${cGame['desc']}\n// script: js\n`
    }
  });


fs.writeFileSync(cCompress['compressedFile'], result.code);

const cmd = `"${cTic['ticPath']}" "${cTic['cartsPath']}/${cGame['cart']}" -code ${cCompress['compressedFile']}`;
console.log(`Launch TIC: ${cmd}`);

child_process.exec(cmd, function (error, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
})

