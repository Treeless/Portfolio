import gulp from 'gulp';
import { deleteSync } from 'del';
import gulpSass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import gulpWebserver from 'gulp-webserver';
import * as sassCompiler from 'sass';  // Updated to match the suggested import style

const sass = gulpSass(sassCompiler);

// Remove the CSS file
gulp.task("clean-css", (done) => {
  deleteSync(["./css/main.css"]);
  done(); // Signal task completion
});

// Compiles SCSS files to CSS
gulp.task('style', gulp.series("clean-css", function convertSassToCss() {
  return gulp.src('**/*.scss', { cwd: './src' })
    .pipe(concat('main.scss'))
    .pipe(sass().on('error', function sassError(err) {
      console.log("SASS ERROR: " + err.message);
    }))
    .pipe(cssnano())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'));
}));

// Local webserver
gulp.task('webserver', gulp.series(function setupWebserver(done) {
  gulp.src('./')
    .pipe(gulpWebserver({
      livereload: {
        enable: true
      },
      fallback: 'index.html',
      open: true,
      port: 8082
    }));
  done(); // Signal task completion
}));

// Default task
gulp.task('default', gulp.series('style', 'webserver', (done) => {
  // Watch Sass files
  gulp.watch("**/*.scss", { cwd: "./src/" }, gulp.series("style"));
  done(); // Signal task completion
}));