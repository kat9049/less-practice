//gulp gulp-less gulp-sourcemaps gulp-concat gulp-autoprefixer gulp-if browser-sync gulp-clean-css

const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

const config = {
    paths:{
        less: './src/less/*.less',
        html: './public/index.html'
    },
    output: {
        path: './public',
        cssName: 'bundle.min.css'
    },
    isDevelop: true
}

gulp.task('less', function () {
    return gulp.src(config.paths.less)
        .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(gulpIf(!config.isDevelop, cleanCss()))
        .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream())
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['less', 'serve']);