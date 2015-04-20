/**
 * Created by roberto on 4/6/15.
 */

var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('inject-dev', ['inject-dev-css'], function () {

    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./app/**/*.js']).pipe(angularFilesort());
    return target.pipe(inject(sources))
        .pipe(wiredep({}))
        .pipe(gulp.dest('./app'));
});

gulp.task('inject-dev-css', function () {

    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./app/**/*.css'], {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./app'));
});

gulp.task('lint', function() {
   return gulp.src('./app/**/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

gulp.task('watch-linter', function() {
    gulp.watch('app/**/*.js').on('change', function(file) {
        gulp.src([file.path])
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(notify('jshint complete'));
    });
});