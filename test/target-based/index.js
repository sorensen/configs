'use strict';

var config = require('../../index')
  , assert = require('assert')

describe('Target dir config from `package.json`', function() {
  it('should have an exact config', function() {
    assert.deepEqual(config, {
      version: '0.0.1',
      jsconfig: true,
      test: 'one',
      database: {
        host: 'localhost',
        port: '6379',
        user: 'paul'
      },
      some: {
        hey: 'there',
        nested: {
          foo: 'bar'
        }
      },
      debug: false
    })
  })
})
