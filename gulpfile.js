var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var minify = require('gulp-minify');
var bower = require('gulp-bower');

gulp.task('javascript', function() {
  return gulp.src('./assets/javascripts/**/*')
    .pipe(minify())
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('sass', function() {
  return gulp.src('./assets/sass/style.sass')
    .pipe(sass({
      style: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function(){
  gulp.watch('./assets/sass/*', ['sass']);
});

gulp.task('default', ['sass', 'javascript', 'watch']);
