"use strict"

const gulp = require("gulp");

gulp.task("default", function(cb) {
	return gulp.src("source/**/*.*")
		.on("data", (data) => {
			//console.log(data.toString())
		})
		//.pipe(gulp.dest("dest"));
		.pipe(gulp.dest(function(file) {
			console.log(file.extname)
			return file.extname === '.js' ? 'js' :
				file.extname === '.css' ? 'css' : 'dest';
		}))
});

gulp.task("default:selected", function(cb) {
	return gulp.src("source/**/*.{js,css}")
		.on("data", (data) => {
			//console.log(data.toString())
		})
		//.pipe(gulp.dest("dest"));
		.pipe(gulp.dest('yo'))
});

gulp.task("default:stack", function(cb) {
	return gulp.src(["source/**/*.js", "source/**/*.css"])
		.on("data", (data) => {
			//console.log(data.toString())
		})
		//.pipe(gulp.dest("dest"));
		.pipe(gulp.dest('yo'))
});

gulp.task("default:ignore", function(cb) {
	return gulp.src(["source/**/*.js", "!source/**/*.css"])
		.on("data", (data) => {
			//console.log(data.toString())
		})
		//.pipe(gulp.dest("dest"));
		.pipe(gulp.dest('ignore'))
});