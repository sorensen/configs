'use strict';

/*!
 * Module dependencies.
 */

var fs = require('fs')
  , exists = fs.existsSync
  , path = require('path')
  , env = process.env.NODE_ENV
  , toString = Object.prototype.toString
  , infoPath
  , config = {}
  , exts = ['.js', '.json']
  , base = getParent()
  , info = getInfo(base) || {}
  , configPath = getPath()
  , loaded = []
  , dirPattern = ['default', env, 'local']
  , filePattern = ['', env, 'local']

/**
 * Recursive extend for overriding nested properties
 *
 * @param {Object} destination
 * @param {Object} source
 * @returns {Object} combined result
 */

function extend(obj, source) {
  for (var prop in source) {
    var val = source[prop]
    obj[prop] = obj[prop] || {}
    obj[prop] = toString.call(val) === '[object Object]' && val !== null
      ? extend(obj[prop], val)
      : val
  }
  return obj
}

/**
 * Find the parent app directory
 *
 * @returns {String} directory
 */

function getParent() {
  if (!!~__dirname.indexOf('node_modules')) {
    var dir = module.id

    while (path.basename(dir) !== 'node_modules') {
      dir = path.dirname(dir)
    }
    return path.dirname(dir)
  }
  var dir = module
    , ok = false

  while (dir.parent && !ok) {
    dir = dir.parent
    ok = getInfo(path.dirname(dir.filename))
  }
  return path.dirname(dir.filename)
}

/**
 * Find and load the `package.json` of the parent
 *
 * @param {String} target directory
 * @returns {Object} package info
 */

function getInfo(d) {
  var p = path.join(d, 'package.json')
  return exists(p) ? require(p) : false
}

/**
 * Determine the directory config from `package.info`, can 
 * be relative to the project base or an absolute path
 *
 * @returns {String} directory
 */

function getPath() {
  var p = info && info.config ? info.config : './config'
  if (p.charAt(0) === '/') return p
  return path.join(base, p)
}

/**
 * Check if a path exists and extend the config if so
 *
 * @param {String} path
 * @returns {Object} extened config
 */

function pathExtend(p) {
  if (!exists(p)) return false
  loaded.push(p)
  return extend(config, require(p))
}

// Check for a `package.json` file for version
info.version && (config.version = info.version)

// Check for directory based config
if (exists(configPath)) {
  exts.forEach(function(ext) {
    dirPattern.forEach(function(type) {
      pathExtend(path.join(configPath, type + ext))
    })
  })
} else {
  // Look for file based config
  exts.forEach(function(ext) {
    filePattern.forEach(function(type) {
      type = type ? '.' + type : type
      pathExtend(path.join(base, 'config' + type + ext))
    })
  })
}

// Check for env level settings within a single config file
if (loaded.length === 1 && config[env]) {
  extend(config, config[env])
}

// Check for `debug` prop and report loaded config files
if (config.debug) {
  console.log('Config loaded: [' + loaded.join(', ') + ']')
}

/*!
 * Module exports.
 */

module.exports = config
