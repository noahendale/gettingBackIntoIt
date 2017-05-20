'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// const uglify = require('gulp-uglify');
// const pump = require('pump');

//Straight up compile
gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles/'))
		.pipe(reload({stream: true}));
});

//Watch for changes
gulp.task('watch', () => {
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/main.js', ['scripts']);
	gulp.watch('*.html', reload);
});

//Convert ES6 to browser-friendly ES5
gulp.task('scripts', () => {
	gulp.src('dev/scripts/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/scripts'))
		.pipe(reload({stream: true}));
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: '.'
	})
});

//Minify JS
// gulp.task('compress', function (cb) {
//   pump([
//         gulp.src('./dev/scripts/main.js'),
//         uglify(),
//         gulp.dest('./public/scripts')
//     ],
//     cb
//   );
// });

//Combine all tasks together
gulp.task('default', ['browser-sync', 'styles', 'scripts', 'watch']);