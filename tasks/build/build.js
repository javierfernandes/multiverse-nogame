'use strict'

const Q = require('q')
const gulp = require('gulp')
const less = require('gulp-less')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const plumber = require('gulp-plumber')
const jetpack = require('fs-jetpack')

const bundle = require('./bundle')
const generateSpecImportsFile = require('./generate_spec_imports')
const utils = require('../utils')

const projectDir = jetpack
const srcDir = projectDir.cwd('./app')
const destDir = projectDir.cwd('./build')

const paths = {
  copyFromAppDir: [
    './node_modules/**',
    './libs/**',
    './assets/**',
    './helpers/**',
    './**/*.html',
    './**/*.+(jpg|png|svg)'
  ]
}

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', () => destDir.dirAsync('.', { empty: true }))

const copyTask = () => projectDir.copyAsync('app', destDir.path(), {
  overwrite: true,
  matching: paths.copyFromAppDir
})

gulp.task('copy', ['clean'], copyTask)
gulp.task('copy-watch', copyTask)

const bundleApplication = () => Q.all([
  bundle(srcDir.path('background.js'), destDir.path('background.js')),
  bundle(srcDir.path('app.js'), destDir.path('app.js'))
])

const bundleSpecs = () => generateSpecImportsFile()
  .then(specEntryPointPath =>
    bundle(specEntryPointPath, destDir.path('spec.js'))
  )

const bundleTask = () => utils.getEnvName() === 'test' ? bundleSpecs() : bundleApplication()

gulp.task('bundle', ['clean'], bundleTask)
gulp.task('bundle-watch', bundleTask)

const lessTask = () => gulp.src('app/stylesheets/main.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(gulp.dest(destDir.path('stylesheets')))

gulp.task('less', ['clean'], lessTask)
gulp.task('less-watch', lessTask)

gulp.task('environment', ['clean'], () => {
  const configFile = `config/env_${utils.getEnvName()}.json`
  projectDir.copy(configFile, destDir.path('env.json'))
})

gulp.task('package-json', ['clean'], () => {
  const manifest = srcDir.read('package.json', 'json')

  // Add "dev" suffix to name, so Electron will write all data like cookies
  // and localStorage in separate places for production and development.
  if (utils.getEnvName() === 'development') {
    manifest.name += '-dev'
    manifest.productName += ' Dev'
  }

  destDir.write('package.json', manifest)
})

gulp.task('watch', () => {
  watch('app/**/*.js', batch((events, done) => {
    gulp.start('bundle-watch', done)
  }))
  watch(paths.copyFromAppDir, { cwd: 'app' }, batch((events, done) => {
    gulp.start('copy-watch', done)
  }))
  watch('app/**/*.less', batch((events, done) => {
    gulp.start('less-watch', done)
  }))
})

gulp.task('build', ['bundle', 'less', 'copy', 'environment', 'package-json'])
