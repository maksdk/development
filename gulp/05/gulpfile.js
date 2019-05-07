"use strict"

const gulp = require("gulp");
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task("styles", function(cb) {
   return gulp.src("frontend/styles/**/*.styl", {base: "frontend"})
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(stylus())
      .pipe(gulpIf(isDevelopment, sourcemaps.write()))
      .pipe(gulp.dest("public"));
});

gulp.task("assets", function(cb) {
   return gulp.src("frontend/assets/**", {since: gulp.lastRun('assets')})
      .pipe(debug({title: 'assets'}))
      .pipe(gulp.dest("public"));
});


gulp.task('clean', function(cb) {
   return del("public");
});

gulp.task("build", gulp.series( "clean", gulp.parallel("styles", "assets")));

gulp.task("watch", function() {
   gulp.watch("frontend/styles/**/*.*", gulp.series("styles"));
   gulp.watch("frontend/assets/**/*.*", gulp.series("assets"));
});

gulp.task("dev", gulp.series("build", "watch"));
