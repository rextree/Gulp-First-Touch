const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const gulpuglify = require('gulp-uglify');
const sass = require('gulp-sass');
/* top level functions
gulp.task - define tasks
gulp.src - point to files to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders for chagnes
*/

// logs message

//copy all htnml files
gulp.task('copyHtml', function(done){
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});
//minifiy the js
gulp.task('minify',function(done){
    gulp.src('src/js/*.js')
    .pipe(gulpuglify())
    .pipe(gulp.dest('dist/js'));
    done();
});
//compile the css
gulp.task('sass', function(done){
    gulp.src('src/sass/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
    done();
});
//optimise the image file
gulp.task('compressImage',function(done){
    gulp.src('src/images/*')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/images'))
    done();
});

//gulp.task('default', gulp.series('copyHtml','minify','sass','compressImage'));
gulp.task('watch', function(){
    gulp.watch('src/js/*.js', gulp.series('minify'));
    gulp.watch('src/images/*', gulp.series('compressImage'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
});