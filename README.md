# vanilla_boilerplate
A boilerplate for a frameworkless ES6 site build using Gulp, Babel and Browserify

# Installation
A simple `npm install` will download and install all needed components.  All working files are located in the /app directory.  Compiled and bundle files will be placed in /dist which is not a part of the repository

# Running
There are multiple individual gulp tasks that can be run on their own:
* `gulp sass`  -  Compile SASS
* `gulp lint`  -  Lint javascript based on provided eslint JSON rules
* `gulp comb`  -  Comb and style SASS based on rules provided in csscomb.json
* `gulp copy`  -  Copy static HTML, image, and font files from /app to /dist
* `gulp bundle`  -  Transpile javascript from ES6 into bundles

Watchers for each of these tasks can be set up by running `gulp watch`
