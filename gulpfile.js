const 	gulp           = require('gulp'),
        sass           = require('gulp-sass'),
        cleanCSS       = require('gulp-clean-css'),
        autoprefixer   = require('gulp-autoprefixer'),
        removeComments = require('gulp-strip-css-comments'),
        uglify         = require('gulp-uglify'),
        browserSync    = require('browser-sync').create(),
        sourcemaps 	   = require('gulp-sourcemaps'),
        multipipe      = require('multipipe'),
        rename         = require('gulp-rename'),
        pug            = require('gulp-pug'),
        imagemin       = require('gulp-imagemin'),
        plumber        = require("gulp-plumber"),
        cheerio        = require("gulp-cheerio"),
        replace        = require("gulp-replace"),
        rimraf         = require("rimraf"),
        svgSprite      = require("gulp-svg-sprite");


gulp.task('sass', function() {
    return multipipe(
        gulp.src('dev/sass/**/*.sass'),
        (plumber()),
        // (sourcemaps.init()),
        (sass()),
        (autoprefixer(['last 5 versions'])),
        (gulp.dest('dist/css')),
        (rename({suffix: '.min', prefix : ''})),
        (cleanCSS()),
        // (sourcemaps.write()),
        (gulp.dest('dist/css')),
        (browserSync.reload({stream: true})),
    );
});

gulp.task('js', function() {
    return multipipe(
        gulp.src('dev/js/*.js'),
        (plumber()),
        (gulp.dest('dist/js')),
        (rename({suffix: '.min', prefix : ''})),
        (uglify()),
        (removeComments()),
        (gulp.dest('dist/js')),
        (browserSync.reload({stream: true})),
    );
});

gulp.task('image', function() {
    return multipipe(
        gulp.src('dev/img/**/*'),
        (plumber()),
        (imagemin([
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])),
        (gulp.dest('dist/img')),
    );
});

gulp.task('sprite-svg', function() {
    return multipipe(
        gulp.src('dev/img/sprite/*.svg'),
        (cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
        })),
        (replace('&gt;', '>')),
        (svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                    }
                },
            }
        )),
        (gulp.dest('dist/img/')),
    );
});

gulp.task('fonts', function() {
    return multipipe(
        gulp.src('dev/fonts/**/*.*'),
        (gulp.dest('dist/fonts')),
    );
});

gulp.task('gulp-pug', function gulpPug() {
    return multipipe(
        gulp.src('dev/pug/*.pug'),
        (plumber()),
        (pug({
            pretty: true
        })),
        (gulp.dest('dist/')),
    );
});

gulp.task('clean', function (cb) {
    rimraf('dist', cb);
});

gulp.task('serve', function(done) {
  browserSync.init({
      server: "dist"
  });

  gulp.watch("dev/sass/**/*.sass", gulp.series('sass'));
  gulp.watch('dev/pug/**/*.pug', gulp.series('gulp-pug'));
  gulp.watch('dev/img/**/*.*', gulp.series('image'));
  gulp.watch('dev/img/sprite.svg', gulp.series('sprite-svg'));
  gulp.watch("dist/*.html").on('change', () => {
    browserSync.reload();
    done();
  });
  gulp.watch('dev/js/**/*.js', gulp.series('js'));


  done();
});

gulp.task('default', gulp.series('clean', 'sass', 'js', 'image', 'sprite-svg', 'fonts', 'gulp-pug', 'serve'));
