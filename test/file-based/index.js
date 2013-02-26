'use strict';

var config = require('../../index')
  , assert = require('assert')

describe('Multiple file based', function() {
  it('should have an exact config', function() {
    assert.deepEqual(config, {
      default: true,
      nested: {
        one: 1,
        two: true
      },
      test: true,
      local: true
    })
  })
})
