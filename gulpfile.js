(function() {
  const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer'),
    webserver = require('gulp-webserver'),
    del = require('del');

  // Remove the css file
  gulp.task("clean-css", () => del(["./css/main.css"]));

  //Compiles scss files to css
  gulp.task('style', gulp.series("clean-css", function convertSassToCss() {
    return gulp.src('**/*.scss', {
        cwd: './src'
      })
      .pipe(concat('main.scss'))
      .pipe(sass().on('error', function sassError(err) {
        console.log("SASS ERROR: " + err.message);
      }))
      .pipe(cssnano())
      .pipe(autoprefix())
      .pipe(gulp.dest('./css'));
  }));

  //Local webserver
  gulp.task('webserver', gulp.series(function setupWebserver() {
    return gulp.src('./')
      .pipe(webserver({
        livereload: {
          enable: true
        },
        fallback: 'index.html',
        open: true,
        port: 8082
      }));
  }));

  //Default task
  gulp.task('default', gulp.series('style', 'webserver', (done) => {

    //Watch sass
    gulp.watch("**/*.scss", { cwd: "./src/" }, gulp.series("style"))

    done();
  }));
}()); 