'use strict'

var gulp = require('gulp')
var utils = require('../utils')

var releaseForOs = {
  osx: require('./osx'),
  linux: require('./linux'),
  windows: require('./windows')
}

gulp.task('release', ['build'], () => {
  return releaseForOs[utils.os()]()
})
