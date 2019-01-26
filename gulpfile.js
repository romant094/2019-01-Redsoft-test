const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin');

const config = {
    destPath: './dist',
    saasPath: './src/scss',
    imgPath: './src/img'
}

gulp.task('sass', function () {
    const stream = watch(`${config.saasPath}/**/style.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('style.min.css'))
        .pipe(minifycss({ compatibility: 'ie8' }))
        .pipe(gulp.dest(`${config.destPath}/css`));
    return stream;
});

gulp.task('img', () => {
    const stream = gulp.src(`${config.imgPath}/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${config.destPath}/img`));
    return stream;
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('./src/index.html', browserSync.reload);
    gulp.watch('./src/scss/style.css', browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});