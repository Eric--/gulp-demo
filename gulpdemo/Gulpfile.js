// 载入外挂
var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	del = require('del'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	//cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	replace = require('gulp-url-replace'),
	browserSync = require('browser-sync').create();

// 样式
gulp.task('styles', function() {
	return gulp.src('src/css/**/*.css')
		.pipe(concat('slider.min.css'))
		.pipe(gulp.dest('src/css'))
//		.pipe(rename({
//			suffix: '.min'
//		}))
		.pipe(minifycss())
		.pipe(gulp.dest('output/asset/css'))
		.pipe(notify({
			message: 'Styles task complete'
		}));
});

// 脚本
gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint.reporter('default'))
		.pipe(concat('slider.min.js'))
		.pipe(gulp.dest('src/js'))
//		.pipe(rename({
//			suffix: '.min'
//		}))
		.pipe(uglify())
		.pipe(gulp.dest('output/asset/js'))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});

//模版
gulp.task('tpls', function() {
	return gulp.src('src/tpl/*.html')
		.pipe(replace({
			'src/': 'output/asset/'
		}))
		.pipe(gulp.dest('output/asset'))
		.pipe(notify({
			message: 'Tpls task complete'
		}));
});

// 清理
gulp.task('clean', function() {
	return gulp.src(['output/asset/css/*', 'output/asset/js/*', 'output/asset/*.html'], {
		read: false
	}).pipe(clean());
	//del(['output/asset/css/*', 'output/asset/js/*'],cb)
});

// 看守
gulp.task('watch', function() {

	// 建立浏览器自动刷新服务器
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	// 看守所有.css档
	gulp.watch('src/css/**/*.css', ['styles']);

	// 看守所有.js档
	gulp.watch('src/js/**/*.js', ['scripts']);

	// 看守所有.html档
	gulp.watch('src/tpl/**/*.html', ['tpls']);

	//刷新
	//gulp.watch(['output/**'], ['refresh']);
	gulp.watch(['output/**'], function() {
		browserSync.reload();
	});


	// 建立即时重整伺服器
	//var server = livereload();
	//livereload.listen();

	// 看守所有位在 output/  目录下的档案，一旦有更动，便进行重整
	//gulp.watch(['output/**']).on('change', function(file) {
	//server.changed(file.path);
	//livereload.changed(file.path);
	//});

});

//刷新任务
gulp.task('refresh', function() {
	gulp.src('output/asset/*.html')
		.pipe(connect.reload())
		.pipe(gulp.dest('output/asset'))
		.pipe(notify({
			message: 'refresh task complete'
		}));
});

//使用connect启动一个Web服务器  
gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});

// 预设任务
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'tpls');
});

gulp.task('mydef', ['watch']);

