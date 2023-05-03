import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true }) //style.scss

    .pipe(plumber()) //обработка ошибок
    .pipe(sass().on('error', sass.logError)) //scss в css
    .pipe(postcss([ //style.css
      autoprefixer(), // stule.css(c префиксами)
      csso() //style.css(c префиксами + min)
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' })) //положи в папку
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  styles, server, watcher
);
