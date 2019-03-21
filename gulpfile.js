const gulp = require('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const autoprefixer_obj = {
   browsers: ['last 2 versions'],
   cascade: false
 }

gulp.task('scss',() => {
  return gulp.src('./src/scss/main.scss')
             .pipe(scss())
             .pipe(autoprefixer(autoprefixer_obj))
             .pipe(gulp.dest('./src/css'))
});

gulp.task('default', gulp.series('scss'));
