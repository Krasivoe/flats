import gulp from 'gulp';

//Конфигурация
import app from '../config/app.js';

//Плагины
import newer from 'gulp-newer';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import fonter from 'gulp-fonter';
import ttf2woof2 from 'gulp-ttf2woff2';

//Обработка Font
export default () => {
  return gulp.src('./src/font/*.{eot,ttf,otf,ttc,woff,woff2}')
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: 'Font',
      message: error.message,
    })),
  }))
  .pipe(newer('./docs/font'))
  .pipe(fonter(app.fonts))
  .pipe(gulp.dest('./docs/font'))
  .pipe(ttf2woof2())
  .pipe(gulp.dest('./docs/font'));
}
