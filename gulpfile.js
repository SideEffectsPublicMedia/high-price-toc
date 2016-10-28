var gulp = require('gulp'),
	gutil = require('gulp-util'),
	shell = require('gulp-shell'),
	sass = require('gulp-sass');

gulp.task('js', function(){
	return gulp.src('components/js/**/*.js')
	.pipe(gulp.dest('build/js'));
});

gulp.task('sass', function (){
	return gulp.src('components/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

gulp.task('html', function(){
	return gulp.src('components/**/*.html')
	.pipe(gulp.dest('build'));
});

// This task will only work for KBIA.
gulp.task('upload', shell.task([
	'aws s3 cp build s3://apps.nathanlawrence.org/sfx/high-price/toc --recursive --profile nl'
]));

gulp.task('watch',function(){
	gutil.log('Gulp will say that this task has finished, but don\'t believe its dirty lies.');
	gutil.log('Hit \^c to actually exit watch mode.');
	gulp.watch('components/sass/**/*.scss',['sass']);
	gulp.watch('components/**/*.js',['js']);
	gulp.watch('components/**/*.html',['html']);
	gulp.watch('components/**/*.jpg',['img']);
});