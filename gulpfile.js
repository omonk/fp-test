var gp = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    scss = require('postcss-scss'),
    reporter = require('postcss-reporter'),
    stylelint = require('stylelint')

// Nice to have but not necessary for a small project like this
gulp.task('scsslint', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(gp.plumber({
            errorHandler: gp.notify.onError('Error: <%= error.message %>')
        }))
        .pipe(postcss([
            stylelint(),
            reporter({
                clearMessages: true
            })
        ], {
            syntax: scss
        }))
})

gulp.task('sass', function() {
    return gulp.src('./scss/style.scss')
        .pipe(gp.plumber({
            errorHandler: gp.notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gp.sass({
            errLogToConsole: true
        }))
        .pipe(gp.autoprefixer())
        .pipe(gulp.dest('./css/'))
})

gulp.task('default', function(callback) {

    watching = true
    gulp.watch("./scss/**/*.scss", ['sass'])
    gulp.watch('./fonts/**/*', ['fonts'])
    gulp.watch('./img/**/*', ['images'])
})
