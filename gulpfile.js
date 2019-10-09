//gulp gulp-less gulp-sourcemaps gulp-concat gulp-autoprefixer gulp-if browser-sync gulp-clean-css

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var config = {
    paths:{
        less: './src/less/**/*.less',
        html: './src/public/index.html'
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
            baseDir:config.output.path
        }
    });

    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['less', 'serve']);