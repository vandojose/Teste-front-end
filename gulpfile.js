const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const terser = require('gulp-terser');

sass.compiler = require('node-sass');

gulp.task('sass', gulp.series(() => gulp
  .src('src/sass/**/*.sass')
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('src/css'))));

gulp.task('terser', gulp.series(() => gulp
  .src('src/sass/js/*.js')

  .pipe(terser())

  .pipe(gulp.dest('src/js'))));

gulp.task('watch', gulp.series(() => {
  gulp.watch('src/sass/**/*.sass', gulp.parallel(['sass']));
  gulp.watch('src/sass/js/*.js', gulp.parallel(['terser']));
}));

gulp.task('default', gulp.series(['sass', 'watch']));
