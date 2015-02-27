
Configs
=======

[![Build Status](https://secure.travis-ci.org/sorensen/configs.png)](http://travis-ci.org/sorensen/configs) 
[![devDependency Status](https://david-dm.org/sorensen/configs.png)](https://david-dm.org/sorensen/configs#info=dependencies)
[![NPM version](https://badge.fury.io/js/configs.png)](http://badge.fury.io/js/configs)

Zero configuration config module. Simply require the module and your project's
config files will be loaded and merged together.

A `default` configuration file is looked for and loaded first, followed by an 
environment level config file, based on `NODE_ENV`. Lastly a `local` config file
is loaded. All configuration files are recursively extended into any previously
loaded file.

Both `.js` and `.json` extentions will be loaded.

The `local` file is the last on the list to give you the flexibility of having per 
user configs, this file is generally included in your `.gitignore` to provide 
flexibility on the end developer.  This could also be used as part of a deployment 
strategy if you don't want to rely on `NODE_ENV` based settings.  Simply copy or  
move the file you want, lets say `config/production.json`, into `config/local.json` 
to ensure the correct app configuration reguardless of your environment variables.

Why?
----

There are plenty of other configuration modules out there, so why another one? 
I wanted a config module that I didn't have to configure, with many others you 
will end up including the module, telling it where your files live, and / or 
providing it defaults. You might just end up with a `config.js` file as a wrapper 
to the module of your choosing, too much work I say! This is meant to be an 
extremely simple way of configuring your app, all while having a `local` config 
in mind, which can be very useful when a team is working on the same project.


Usage
-----

``` js
var config = require('configs')
```

Config files will be be loaded with the following pattern, pathing is relative
to the project root directory. The project root directory is found by following 
the `module.parent` recursively until there either is no more parents or a 
`package.json` file is found.

Directory based:

* ./config/default.json
* ./config/{NODE_ENV}.json
* ./config/local.json

File based:

* ./config.json
* ./config.local.json
* ./config.{NODE_ENV}.json


Example
-------

### Seperate file configurations

In `./config/default.json`:

```js
{
  "debug": false
, "database": {
    "host": "localhost"
  , "port": 6379
  , "user": "paul"
  }
}
```

In `./config/local.json`:

```js
{
  "debug": true
, "database": {
    "port": 11212
  }
}
```

End result: `require('configs')`

```js
{
  "debug": true
, "database": {
    "host": "localhost"
  , "port": 11212
  , "user": "paul"
  }
}
```

### Single file configuration

If only a single configuration file is found, the module will check for a property 
matching the current `NODE_ENV` and extend it into the base config.

In `./config.json`

```js
{
  "something": true
, "sea": {
    "lab": 2021
  }
, "production": {
    "something": false
  , "hey": "there"
  }
}
```

With `NODE_ENV=production`, `require('configs')`

```js
  "something": false
, "hey": "there"
, "sea": {
    "lab": 2021
  }
, "production": {
    "something": false
  , "hey": "there"
  }
}
```

### Debug

If a `debug` property is found after all files have been loaded, the module
will output the file paths of everything that was loaded.

### package.json

If a `package.json` is found within the root directory, the `version` property 
will be added to the config. The module will also check for a `config` property 
that can be used to specify the directory in which the files are located. Defaults 
to `./config`


Install
-------

With [npm](https://npmjs.org)

```
npm install configs
```


License
-------

(The MIT License)

Copyright (c) 2011-2012 Beau Sorensen <mail@beausorensen.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
