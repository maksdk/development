"use strict"

const gulp = require("gulp");

gulp.task("hello", function(cb) {
	//console.log('Hello')
	cb()
});

gulp.task("example:promise", function() {
	return new Promise((resolve, reject) => {
		resolve('result');
	});
	//console.log(p);
	//return p;
});

gulp.task("example:stream", function() {
	return  require("fs").createReadStream(__filename);
	//console.log(s);
	//console.log(__filename)
	//return s;
});

gulp.task("example:process", function() {
	return require("child_process").spawn("ls", ["."], {stdio: "inherit"});
	//console.log(p);
	//return p;
})

gulp.task("series", gulp.series("hello", "example:promise", "example:stream", "example:process"));

gulp.task("parallel", gulp.parallel("hello", "example:promise", "example:stream", "example:process"))