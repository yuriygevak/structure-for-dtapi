var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var cssMinify = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', ['lint', 'html', 'templates', 'js', 'sass', 'watch']);

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(jshint.reporter('fail'));
});

gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
   .pipe(sass())
   .pipe(concat('style.css'))
   .pipe(gulp.dest('build'))
   .pipe(browserSync.stream());
});

gulp.task('js', function() {
  var jsSrcFiles = [
    'src/**/*.js'
  ];

  return gulp.src(jsSrcFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('templates', function() {
  return gulp.src('src/pages/**/*.html')
    .pipe(gulp.dest('build/pages'))
    .pipe(browserSync.stream());
});


gulp.task('watch', function() {
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['js']);

    gulp.watch('build').on('change', browserSync.reload);
});

gulp.task('cssMinify', function() {
    return gulp.src('src/**/*.scss')
        .pipe(cssMinify())
        .pipe(gulp.dest('build'));
});

gulp.task('uglify', function() {
  pump([
        gulp.src('src/**/*.js'),
        uglify(),
        gulp.dest('build')
    ]);
});