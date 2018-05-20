'use strict'

const childProcess = require('child_process')
const electron = require('electron-prebuilt')
const gulp = require('gulp')

gulp.task('start', ['build', 'watch'], () => {
  childProcess.spawn(electron, ['./build'], {
    stdio: 'inherit'
  }).on('close', () => { process.exit() })
})
