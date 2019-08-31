var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

/**
 * complile scss to css
 * 
 * 1. where is my scss file
 * 2. pass that file through sass compiler
 * 3. where do I save the compiled css?
 * 4. stream changes to all browsers
 */
function style(){
    return gulp.src(['./src/sass/**/*.scss'])
    .pipe(sass())  // pipe to the sass compiler declaret in line 3
    .pipe(gulp.dest('./src/css'))               // pipe again to gulp and define the destination
    .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './src',
            index: 'index.html'
        }
    });
    gulp.watch('./src/sass/**/*.scss', style);  // if anything changes in this dir it will call style function
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/*.js').on('change', browserSync.reload);
}

// this alows you to run the function in gulp after
exports.style = style;                    
exports.watch = watch;
