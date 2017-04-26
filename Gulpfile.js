var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify')
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var runSequence = require('run-sequence');

gulp.task('bundle', function () {
  return gulp.src('./app/js/*.js', {
    read: false
  })
  .pipe(tap(function (file) {
    gutil.log('bundling ' + file.path);
    file.contents = browserify(file.path, {
      debug: true
    })
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle();
  }))
  .pipe(gulp.dest('dist/js'))
});

gulp.task('copy', function () {
  return gulp.src('./app/**/*.{png,gif,jpg,jpeg,svg,woff,eot,ttf,woff2,html}')
  .pipe(gulp.dest('./dist'))
});


gulp.task('sass', function () {
  return gulp.src("./app/scss/*.scss")
  .pipe(sass()).on('error', sass.logError)
  .pipe(gulp.dest("./dist/css"))
  .pipe(autoprefixer({
    browsers: [
      'last 2 versions',
      'iOS >= 8',
      'Android >= 4'
    ],
    cascade: false
  }))
  .pipe(csscomb('./csscomb.json'))
  .pipe(gulp.dest("./dist/css"))
  .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp.src([
    './app/js/**/*.js', 
    '!node_modules/**'
  ])
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('comb', function () {
  return gulp.src(['./app/scss/*.scss'])
  .pipe(csscomb('./csscomb.json'))
  .pipe(gulp.dest('./app/scss'));
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['copy', 'lint', 'comb', 'bundle'], function () {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('./app/scss/*.scss', ['sass']);
  gulp.watch('./app/**/*.js', ['lint', 'bundle', 'reload']);
  gulp.watch('./app/**/*.html', ['copy', 'reload']);
});