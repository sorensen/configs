'use strict';

var config = require('../../index')
  , assert = require('assert')

describe('Single file based', function() {
  it('should have an exact config', function() {
    assert.deepEqual(config, {
      version: '0.0.1',
      debug: false,
      something: 'else',
      database: {
        host: 'prod.domain.net',
        port: '3306'
      },
      dev: {
        database: {
          host: 'dev.domain.net'
        }
      },
      production: {
        debug: false,
        database: {
          host: 'prod.domain.net'
        }
      }
    })
  })
})
