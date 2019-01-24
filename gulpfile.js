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

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});



// gulp.task('sass', function () {
//     var stream = gulp.src([config.sassPath + '/style.scss'])
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(minifycss({ compatibility: 'ie8' }))
//         .pipe(rename('style.min.css'))
//         .pipe(gulp.dest(config.destPath + '/css'));
//     return stream;
// });

// gulp.task('js', function() {
//     var stream = gulp.src([config.bowerDir + '/jquery/dist/jquery.js', config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js', config.jsPath + '/*.js'])
//         .pipe(concat('script.js'))
//         .pipe(uglify())
//         .pipe(rename('script.min.js'))
//         .pipe(gulp.dest(config.destPath)); 
//     return stream;
// });

// gulp.task('doStuff', function (done) {
//     done();
// });
// gulp.task('watch', function () {
//     gulp.watch(['dist/**'], 'doStuff')
//         .on('change', function (file) {
//             fileChanged(file.path);
//         });
// });

// gulp.task('watch', function () {
//     watch([config.sassPath + '/*.scss'], (event, cb) => {
//         gulp.start('sass');
//     });
// watch([config.jsPath + '/*.js'], function (event, cb) {
//     gulp.start('js');
// });
// });

