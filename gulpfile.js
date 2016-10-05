var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    browserSync = require('browser-sync').create(),
    mixins = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function(errInfo) {
       console.log(errInfo.toString());
       this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    injectChanges: true,
    server: {
      baseDir: "app"
    }
});

  watch('./app/index.html', function() {
     browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
     gulp.start('styles');
  });
});
