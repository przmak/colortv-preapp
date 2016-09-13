const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');

gulp.task('build',['build-js','build-html'],function(){
    
});

gulp.task('build-js',function(){
    return gulp.src('dev/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('release'));    
});
gulp.task('build-html',function(){
    return  gulp.src('dev/**/*.html')
                .pipe(sourcemaps.init())
                .pipe(gulp.dest('release'));
})