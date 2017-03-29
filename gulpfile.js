var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var twig = require('gulp-twig');
var stylus = require('gulp-stylus');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var replace = require('gulp-replace');
var htmlreplace = require('gulp-html-replace');
var php = require('gulp-connect-php');

// Source paths, we watch and compile/compress
// files from these directories
var paths = {
  templates: [
    'source/site/**/*.php', 
    'source/snippets/**/*.php'
  ],
  stylus: 'source/stylus/**/*.styl',
  images: 'source/images/**/*'
}

// This is where our compiled and Compressed
// files are outputted / "piped" to
var dest = {
  build: {
    css: './assets/css',
    templates: './site'
  },
  images: './assets/images'
}

// Let's compile our html, you can work with
// Twig if you prefer or just go vanilla
gulp.task('compile-templates', function() {
  return gulp.src(paths.templates)
    .pipe(plumber()) // plumber handles errors for us
    .pipe(twig())
    .pipe(gulpif(argv.prod, htmlmin({ collapseWhitespace: true })))
    .pipe(gulpif(argv.dev, replace('images/', 'source/images/')))
    .pipe(gulpif(argv.prod, replace('images/', 'assets/img/')))
    .pipe(gulpif(argv.prod, replace('style.css', 'style.min.css')))
    .pipe(rename({ extname: '.php' }))
    .pipe(gulp.dest(dest.build.templates))

  .on('end', function() {
    log('🏄 Template Files: Done!');
    if (argv.prod) log('🐳 Template Files: Minified!');
  });
});

// Compile our stylsheets, you can use stylus
// if you prefer or just go vanilla
gulp.task('compile-stylus', function() {
  var options = {
    use: [rupture(), autoprefixer()],
    compress: argv.prod ? true : false
  };

  return gulp.src('./source/stylus/style.styl')
    .pipe(plumber())
    .pipe(stylus(options))
    .pipe(gulpif(argv.prod, rename('style.min.css')))
    .pipe(gulpif(argv.dev, replace('images/', 'source/images/')))
    .pipe(gulpif(argv.prod, replace('images/', 'assets/img/')))
    .pipe(gulp.dest(dest.build.css))

  .on('end', function() {
    log('🍒 Style: Done!');
    if (argv.prod) log('🍭 Style: Minified!');
  });
});

// Compress and optimise images (only in prod)
gulp.task('compress-images', function() {
  return gulp.src(paths.images)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(dest.images))

  .on('end', function() {
    log('📸 Images: Compressed!')
  });
});

// Watch our files for changes
gulp.task('watch', function() {
  gulp.watch(paths.templates, ['compile-templates']);
  gulp.watch(paths.stylus, ['compile-stylus']);
});

// Create a php server
gulp.task('php', function() {
  php.server({ base: './', port: 8080, keepalive: true });
});


gulp.task('dev', [
  'compile-templates',
  'compile-stylus',
  'watch',
  'php'
]);

gulp.task('prod', [
  'compress-images',
  'compile-templates',
  'compile-stylus'
]);


function log(message) {
  gutil.log(gutil.colors.bold.green(message));
}