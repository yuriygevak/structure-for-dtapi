var gulp = require('gulp');
var args = require('yargs').argv;
var minify = require('gulp-minify');

var $ = require('gulp-load-plugins')({lazy: true});

/*var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util');
var gulpprint = require('gulp-print');
var gulpif = require('gulp-if');*/


gulp.task('vet', function() {
	log ('Analyzing source with JSHint and ASCS')
	return gulp
		.src([
			'./src/**/*js',
			'./*.js'
		])
		.pipe($if(args.verbose, gulpprint()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
	log('Compyling Sass to CSS');

	return gulp
	.src([
			'./src/**/*sass',
			'./*.sass'
		])
	.pipe($.plumber)
	.pipe($.sass())
	.pipe($.autoprefixer({browsers: ['last 2 version', '>5%']}))
	.pipe(gulp.dest('./.tmp/'))
})

//gulp.task('clean-styles', function() {
//	var files = ./.tmp + '**.css';
//	del(files);
//});

gulp.task('sass-watcher', function() {
	gulp.watch(['./src/**/*.scss',
			'./*.sass'],
			['styles']);
});

gulp.task('wiredep', function() {
	//var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(['./src/**/*.html',
			'./*.html'])
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src([
			'./src/**/*js',
			'./*.js'
		])))
		.pipe(gulp.dest(........))
});

/*
gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});
*/

/////

function log(message) {
	if (typeof(message) === 'object') {
		for (var item in message) {
			if (message.hasOwnProperty(item)) {
				$.util.log(util.colors.blue(message[item]));
			}
		}
	} else {
		$.util.log(util.colors.blue(message));
	}
}