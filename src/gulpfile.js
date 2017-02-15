var gulp = require('gulp');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var build_location = '../build';
var sandbox_location = '../sandbox';


gulp.task('clean_build_location', function(){
  return gulp.src(build_location+'/*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(build_location + '/themes/custom/anelma/css'));
});

gulp.task('js', function() {
  gulp.src('./lib/*.js')
    //.pipe(uglify('main.js'))
    .pipe(gulp.dest(build_location + '/themes/custom/anelma/js'))
});

gulp.task('build', ['clean_build_location'], function(){
      gulp.src('./Theme/*')
        .pipe(gulp.dest(build_location + '/themes/custom/anelma/'));
      gulp.start('sass');
      gulp.start('js');    
});

gulp.task('deploy', ['build'], function(){
    gulp.src(build_location + '/**/*.*')
        .pipe(uglify('main.js'))
        .pipe(gulp.dest(sandbox_location))
});



gulp.task('auto-deploy', function(){
 //auto build and copy to sandbox
});




gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./themes/custom/anelma/sass/**/*.scss', ['sass']);
    gulp.watch('./themes/custom/anelma/lib/*.js', ['uglify']);
    gulp.watch(['./themes/custom/anelma/css/style.css', './themes/custom/anelma/**/*.twig', './themes/custom/anelma/js/*.js'], function (files){
        livereload.changed(files)
    });
});