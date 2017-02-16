var gulp = require('gulp');
var clean = require('gulp-clean');
var rm = require('gulp-rimraf');
var print = require('gulp-print');

var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

//Local variables
var build_location = '../build';
var sandbox_location = 'D:/DevDesktop/Sites/Anelma';
//var sandbox_location = 'D:/Projects/Anelma';

gulp.task('clean_build_location', function(){
  return gulp.src(build_location+'/*', {read: false})
        .pipe(rm({force:true}))
        .pipe(print());
});

gulp.task('build_sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(build_location + '/themes/custom/anelma/css'))
        .pipe(print());
});

gulp.task('build_js', function() {
  return gulp.src('./lib/*')
    .pipe(gulp.dest(build_location + '/themes/custom/anelma/js'))
    .pipe(print());
});

gulp.task('build', ['clean_build_location'], function(){
    gulp.start('build_sass');
    gulp.start('build_js');

      return gulp.src('./Theme/*')
        .pipe(gulp.dest(build_location + '/themes/custom/anelma')); 
});

gulp.task('deploy_to_sandbox', ['build'], function(){
    return gulp.src(build_location + '/**')
        .pipe(gulp.dest(sandbox_location + '/'));
});

gulp.task('default', ['deploy_to_sandbox']);


//gulp.task('auto-deploy', function(){
// gulp.watch('./theme/*', function (){
//    gulp.start('deploy');
// });
//});


//gulp.task('watch', function(){
//    livereload.listen();
//
//    gulp.watch('./themes/custom/anelma/sass/**/*.scss', ['sass']);
//    gulp.watch('./themes/custom/anelma/lib/*.js', ['uglify']);
//    gulp.watch(['./themes/custom/anelma/css/style.css', './themes/custom/anelma/**/*.twig', './themes/custom/anelma/js/*.js'], function (files){
//        livereload.changed(files)
//    });
//});
