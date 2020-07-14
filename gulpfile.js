/* eslint-disable no-undef */
'use strict';



const gulp = require( `gulp` );

const plumber = require( `gulp-plumber` );
const pug = require( `gulp-pug` );
const pugLinter = require( `gulp-pug-linter` );
const htmlValidator = require( `gulp-w3c-html-validator` );
const terser = require( `gulp-terser` );
const sass = require( `gulp-sass` );
const autoprefixer = require( `gulp-autoprefixer` );
const shorthand = require( `gulp-shorthand` );
const cleanCss = require( `gulp-clean-css` );
const sourcemaps = require( `gulp-sourcemaps` );
const rename = require( `gulp-rename` );
const del = require( `del` );





gulp.task( `clean`, () => {
  return del( `build` );
} );



gulp.task( `images:copy`, () => {
  return gulp.src( `source/images/**/*.*` )
    .pipe( gulp.dest( `build/images` ) );
} );



gulp.task( `fonts:copy`, () => {
  return gulp.src( `source/fonts/**/*.*` )
    .pipe( gulp.dest( `build/fonts` ) );
} );



gulp.task( `pug:compile`, () => {
  return gulp.src( `source/popup/*.pug` )
    .pipe( plumber() )
    .pipe( pugLinter( { reporter: `default` } ) )
    .pipe( pug() )
    .pipe( htmlValidator() )
    .pipe( gulp.dest( `build/popup` ) );
} );



gulp.task( `pageStyles:compile`, () => {
  return gulp.src( `source/page/scss/*.scss` )
    .pipe( sourcemaps.init() )
    .pipe( sass() )
    .pipe( cleanCss() )
    .pipe( shorthand() )
    .pipe( autoprefixer() )
    .pipe( sourcemaps.write() )
    .pipe( rename( { suffix: `.min` } ) )
    .pipe( gulp.dest( `build/page/css` ) );
} );



gulp.task( `popupStyles:compile`, () => {
  return gulp.src( `source/popup/*.scss` )
    .pipe( sourcemaps.init() )
    .pipe( sass() )
    .pipe( cleanCss() )
    .pipe( shorthand() )
    .pipe( autoprefixer() )
    .pipe( sourcemaps.write() )
    .pipe( rename( { suffix: `.min` } ) )
    .pipe( gulp.dest( `build/popup` ) );
} );



gulp.task( `scripts:compile`, () => {
  return gulp.src( `source/**/*.js` )
    .pipe( sourcemaps.init() )
    .pipe( terser() )
    .pipe( sourcemaps.write() )
    .pipe( rename( { suffix: `.min` } ) )
    .pipe( gulp.dest( `build` ) );
} );



gulp.task( `manifest:copy`, () => {
  return gulp.src( `source/manifest.json` )
    .pipe( gulp.dest( `build/` ) );
} );



gulp.task( `build`, gulp.series( `images:copy`, `fonts:copy`, `pug:compile`, `pageStyles:compile`, `popupStyles:compile`, `scripts:compile`, `manifest:copy` ) );



gulp.task( `watch`, () => {
  gulp.watch( `source/images/**/*.*`, gulp.series( `images:copy` ) );
  gulp.watch( `source/fonts/**/*.*`, gulp.series( `fonts:copy` ) );
  gulp.watch( `source/popup/*.pug`, gulp.series( `pug:compile` ) );
  gulp.watch( `source/page/scss/*.scss`, gulp.series( `pageStyles:compile` ) );
  gulp.watch( `source/popup/*.scss`, gulp.series( `popupStyles:compile` ) );
  gulp.watch( `source/**/*.js`, gulp.series( `scripts:compile` ) );
  gulp.watch( `source/manifest.json`, gulp.series( `manifest:copy` ) );
} );



gulp.task( `default`, gulp.series( `clean`, gulp.parallel( `build`, `watch` ) ) );
