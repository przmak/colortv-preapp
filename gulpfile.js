const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const less = require('gulp-less');

gulp.task('build',['build-js-be','build-js-fe','build-ejs','build-html','build-less'],function(){
    
});
gulp.task('build-less',function(){
    return  gulp.src('dev/**/*.less')
                .pipe(less())
                .pipe(concat('styles.css'))
                .pipe(gulp.dest('release/front'));
});

gulp.task('build-js-be',function(){
    return gulp.src(["dev/**/*.js","!dev/front/**/*.js"])
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('release'));    
});
gulp.task('build-js-fe',function(){
    return gulp.src(["dev/front/controllers/**/*.js",
                "dev/front/app.js",
                "dev/front/directives/*.js",
                "dev/front/services/*.js",
                "dev/front/filters/*.js"])                
            .pipe(concat('app.js'))
            .pipe(gulp.dest('release/front'));    
});

gulp.task('build-ejs',function(){
    return  gulp.src('dev/**/*.ejs')
                .pipe(sourcemaps.init())
                .pipe(gulp.dest('release'));
});
gulp.task('build-html',function(){
    return  gulp.src('dev/**/*.html')
                .pipe(sourcemaps.init())
                .pipe(gulp.dest('release'));
})
gulp.task('watch',['build'],function(){
     gulp.watch('dev/**/*.js',['build-js-be','build-js-fe']);
     gulp.watch('dev/**/*.ejs',['build-ejs']);
     gulp.watch('dev/**/*.less',['build-less']);
     gulp.watch('dev/**/*.html',['build-html']);
});