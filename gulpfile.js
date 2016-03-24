/**
 * 前端自动化工具
 * 翻译es2015,翻译sass
 */

var gulp = require('gulp'),
		babel = require('gulp-babel'), 	// babel-preset-es2015
		// sass = require('gulp-sass'),
		webpack = require('gulp-webpack'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps');


var path = {
	babel: {
		src: './assets/babel/**/*.js',
		dest: './build/js/'
	},
	sass: {
		src: './assets/sass/**/*.scss',
		dest: './build/css/'
	},
	webpack: {
		src: './build/js/test.js',
		dest: './build/webpack/'
	}
};

// 编译es2015
gulp.task('babel', () => {
	gulp.src(path.babel.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.babel.dest));
});

// 编译sass
gulp.task('sass', () => {
	gulp.src(path.sass.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.sass.dest));
});

// 打包
gulp.task('webpack', () => {
	gulp.src(path.webpack.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(webpack({ output: { filename: 'test.js' } }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.webpack.dest));
});



gulp.task('babel:watch', () => gulp.watch(path.babel.src, ['babel']));
gulp.task('sass:watch', () => gulp.watch(path.sass.src, ['sass']));
gulp.task('webpack:watch', () => gulp.watch(path.webpack.src, ['webpack']));

gulp.task('watch', ['babel:watch', /*'sass:watch', */'webpack:watch']);

gulp.task('default', ['babel', /*'sass', */'webpack', 'watch']);