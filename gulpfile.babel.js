import gulp from 'gulp';
import del from 'del';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import glob from 'glob';
import es from 'event-stream';

const paths = {
  scriptsJs: 'src/js/**/*.js',
  dist: 'dist/',
  distJs: 'dist/js'
};

gulp.task('clean', fn => del(paths.dist, fn));

gulp.task('scripts', ['clean'], done => {
  glob(paths.scriptsJs, function(err, files) {
    if (err) done(err);

    var tasks = files.map(function(entry) {
      return browserify({ entries: [entry] })
        .transform(babelify)
        .bundle()
        .pipe(source(entry))
        .pipe(gulp.dest(paths.dist));
    });
    es.merge(tasks).on('end', done);
  });
});

gulp.task('default', ['scripts']);
