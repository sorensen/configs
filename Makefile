SHELL := /bin/bash

test:
	@NODE_ENV=dev mocha -R spec test/dir-based/index.js && \
	NODE_ENV=test mocha -R spec test/file-based/index.js && \
	NODE_ENV=production mocha -R spec test/single-file-based/index.js && \
	NODE_ENV=test mocha -R spec test/target-based/index.js

hint:
	@jshint index.js package.json

.PHONY: test hint test2
