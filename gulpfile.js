const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync').create();

gulp.task('pugCompile', _ => {
  return gulp
    .src('src/layouts/**/*.pug')
    .pipe(pug({ pretty: true, basedir: __dirname + '/src/' }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scssCompile', _ => {
  return gulp
    .src('src/layouts/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', _ => {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
  });
  gulp.watch('src/**/*.pug', gulp.series('pugCompile', reloadBrowser));
  gulp.watch('src/**/*.scss', gulp.series('scssCompile', reloadBrowser));

  function reloadBrowser(done) {
    browserSync.reload();
    done();
  }
});

gulp.task(
  'default',
  gulp.series('pugCompile', 'scssCompile', gulp.parallel('browser-sync'))
);
