//init modules
var gulp = require('gulp')
var gutil = require('gulp-util')
var uglify = require('gulp-uglifycss')
var jshint = require('gulp-jshint')
var watch = require('gulp-watch')
var concat = require('gulp-concat');
var rename = require('gulp-rename');

//tasks
gulp.task('distjs', function(){
  return gulp
    .src('./app/js/*.js')
    .pipe(concat('dist/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('distcss', function(){
  return gulp
    .src('app/css/*.css')
    .pipe(concat('dist/css'))
    .pipe(rename('main.min.css'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/css'));
});

//IMPLEMENT this task!!!
// gulp.task('libs-dist', function(){
//   return gulp
//     .src('app/libraries/???')
//     .pipe(gulp.dest('dist/libraries/???'));
// });

gulp.task('test', function(){
  return gulp
    .src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
  gulp.watch('./app/js/*.js',['distjs','distcss','test']);
});

gulp.task('default', ['distjs','distcss','test','watch']);
