var {src, dest} = require('gulp'),
	gulp = require("gulp"),
	sass = require("gulp-sass"),
	postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
	sourcemaps = require("gulp-sourcemaps"),
	rename = require('gulp-rename'),
	browserSync = require("browser-sync").create();

function style() {
	return (
		gulp
			.src('src/scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass())
			.on("error", sass.logError)
			.pipe(dest('css'))
			.pipe(postcss([autoprefixer(), cssnano()]))
			.pipe(sourcemaps.write())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(dest('css'))
	);
}

function reload(done) {
	browserSync.reload();
	done();
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch("src/scss/*.scss", style);
	gulp.watch("*.html", reload);
}

exports.default = style;
exports.watch = watch;