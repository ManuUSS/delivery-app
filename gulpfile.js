const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        // .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( postcss([ autoprefixer()]))
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function images() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function webp_version() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}
function avif_version() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('build/img'))
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', images );
}


exports.css = css;
exports.dev = dev;
exports.images = images;
exports.webp_version = webp_version;
exports.avif_version = avif_version;
// exports.default = series( images, webp_version, avif_version, css, dev  );
exports.default = series( css, dev  );
