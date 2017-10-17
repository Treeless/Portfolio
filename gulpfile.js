(function() {
  var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer'),
    webserver = require('gulp-webserver'),
    del = require('del');

  //Compiles scss files to css
  gulp.task('style', function() {
    del.sync('./css/main.css');

    gulp.src('**/*.scss', {
        cwd: './src'
      })
      .pipe(concat('main.scss'))
      .pipe(sass().on('error', function(err) {
        console.log("SASS ERROR: " + err.message);
      }))
      .pipe(cssnano())
      .pipe(autoprefix())
      .pipe(gulp.dest('./css'));
  });

  //Watch my scss files for changes
  gulp.task('watch-sass', function() {
    gulp.watch('**/*.scss', {
      cwd: "./src/"
    }, ['style']);
  });

  //Local webserver
  gulp.task('webserver', function() {
    gulp.src('./')
      .pipe(webserver({
        livereload: {
          enable: true
        },
        fallback: 'index.html',
        open: true,
        port: 8082
      }));
  });

  //Default task
  gulp.task('default', ['style', 'watch-sass', 'webserver']);
}());
