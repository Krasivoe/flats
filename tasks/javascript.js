import gulp from 'gulp';

//Конфигурация
import app from '../config/app.js';

//Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';

//Обработка JavaScript
export default () => {
  return gulp.src('./src/js/**/*.js', {sourcemaps: app.isDev})
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: 'JS',
      message: error.message,
    })),
  }))
  .pipe(babel())
  .pipe(webpack(app.webpack))
  .pipe(gulp.dest('./docs/js', {sourcemaps: app.isDev}));
}
