'use strict';


var assert = require('assert')
  , info = require('./package.json')

describe('Configs', function() {
  it('should have an exact config', function() {
    process.env.NODE_ENV = 'dev'
    var config = require('./index')
    delete require.cache[require.resolve('./index')]

    // console.log('DEV: ', JSON.stringify(config, null, 2))

    assert(typeof config, 'object')
    assert.deepEqual(config, {
      "version": info.version,
      "name": info.name,
      "test": "one",
      "database": {
        "host": "db.somehost.net",
        "port": "6379",
        "user": "coffee"
      },
      "dev": true,
      "some": {
        "nested": {
          "thing": "hi",
          "foo": "bar"
        },
        "hey": "there"
      },
      "debug": false
    })

    process.env.NODE_ENV = 'test'
    var config = require('./index')
    delete require.cache[require.resolve('./index')]
    
    // console.log('DEV: ', JSON.stringify(config, null, 2))

    assert(typeof config, 'object')
    assert.deepEqual(config, {
      "version": info.version,
      "name": info.name,
      "jsconfig": true,
      "test": "one",
      "database": {
        "host": "localhost",
        "port": "6379",
        "user": "paul"
      },
      "some": {
        "hey": "there",
        "nested": {
          "foo": "bar"
        }
      },
      "debug": false
    })
  })
})
