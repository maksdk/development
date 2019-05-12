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
   return gulp.src("frontend/styles/**/*.styl")
      .pipe(stylus())
      .pipe(gulp.dest("public"));
});

gulp.task("styles:base1", function(cb) {
   return gulp.src("frontend/styles/**/*.styl", {base: "frontend"})
      .pipe(stylus())
      .pipe(gulp.dest("public"));
});

gulp.task("styles:base2", function(cb) {
   return gulp.src("frontend/**/*.styl")
      .pipe(stylus())
      .pipe(gulp.dest("public"));
});

gulp.task("styles:concat", function(cb) {
   return gulp.src("frontend/**/*.styl")
      .pipe(stylus())
      .pipe(concat("all.css"))
      .pipe(gulp.dest("public"));
});

gulp.task("styles:debug", function(cb) {
   return gulp.src("frontend/**/*.styl")
      .pipe(debug({title:'src'}))
      .pipe(stylus())
      .pipe(debug({title:'stylus'}))
      .pipe(concat("all.css"))
      .pipe(debug({title:'concat'}))
      .pipe(gulp.dest("public"));
});

gulp.task("styles:import", function(cb) {
   return gulp.src("frontend/styles/main.styl")
      .pipe(stylus())
      .pipe(gulp.dest("public"));
});

gulp.task("styles:sourcemap", function(cb) {
   return gulp.src("frontend/styles/main.styl")
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("public"));
});

gulp.task("styles:sourcemapCurrentDirectory", function(cb) {
   return gulp.src("frontend/styles/main.styl")
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest("public"));
});

/*copy all assets to publick*/
gulp.task('assets', function(cb) {
   return gulp.src("frontend/assets/**")
      .pipe(gulp.dest('public'));
});


/*NODE_ENV=production gulp style:if*/
gulp.task("styles:if", function(cb) {
   return gulp.src("frontend/styles/main.styl")
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(stylus())
      .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
      .pipe(gulp.dest("public"));
});

/*Delete folder 'public'*/
gulp.task('clean', function(cb) {
   return del("public");
});


/*unite tasks*/
gulp.task("build", 
   gulp.series(
      /*first clear*/
      "clean", 
      /*than paralle styles and assets*/
      gulp.parallel("styles", "assets")
   ));