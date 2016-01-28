//init modules
var gulp = require('gulp')
var gutil = require('gulp-util')
var uglify = require('gulp-uglify')
var jshint = require('gulp-jshint')
var watch = require('gulp-watch')
var concat = require('gulp-concat');
var rename = require('gulp-rename');

//tasks
gulp.task('dist', function(){
  return gulp
    .src('app/**/*.js')
    .pipe(concat('dist/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .src('app/**/*.css')
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
    .src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', function(){
  gulp.run('dist','test');
  gulp.watch('app/**',function(){
    gutil.log('File '+event.path+' was '+event.type+', running tasks...');
    gulp.run('dist','test');
  });
});
