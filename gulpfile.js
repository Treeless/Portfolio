import gulp from 'gulp';
import { deleteSync } from 'del';
import gulpSass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import connect from 'gulp-connect';
import * as sassCompiler from 'sass';
import open from 'gulp-open';

const sass = gulpSass(sassCompiler);
const port = 8082;
const uri = `http://localhost:${port}/`;

// Remove the CSS file
gulp.task("clean-css", (done) => {
  deleteSync(["./css/main.css"]);
  done();
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
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload()); // Reload the server when CSS changes
}));

// Local webserver
gulp.task('webserver', (done) => {
  connect.server({
    root: './',
    livereload: true,
    fallback: 'index.html',
    port: port
  });
  done();
});

// Open browser
gulp.task('open-browser', (done) => {
  gulp.src('index.html')
    .pipe(open({ uri }));
  done();
});

// Default task
gulp.task('default', gulp.series('style', 'webserver', 'open-browser', (done) => {
  // Watch Sass files
  gulp.watch("**/*.scss", { cwd: "./src/" }, gulp.series("style"));
  done();
}));