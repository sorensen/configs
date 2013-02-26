'use strict';

var config = require('../../index')
  , assert = require('assert')
  , something = require('./lib/something')

describe('Directory based', function() {
  it('should have an exact config', function() {
    assert.deepEqual(config, {
      version: '1.0.1',
      test: 'one',
      database: {
        host: 'db.somehost.net',
        port: '6379',
        user: 'coffee'
      },
      dev: true,
      some: {
        nested: {
          thing: 'hi',
          foo: 'bar'
        },
        hey: 'there'
      },
      debug: false
    })
  })
  it('should have the same config in other project files', function() {
    assert.deepEqual(config, something)
  })
})
