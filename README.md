loquire
=====

loquire lets you require modules using app root relative paths, e.g. ````local('/lib/utils')```` instead of ````require('../../../lib/utils')````. The latter is ugly, hard to maintain, hard to read, and will break when you try to re-organise your app's directory structure.

## Installation
	$ npm install loquire
## Usage

Add the following at or near the top of your Node app's entry point  (e.g. app.js)

````javascript
global.local = require('loquire')({ rootDir: __dirname });
````
This assumes your app.js entry point is in your apps root directory, otherwise you'll have to set the ````rootDir```` parameter accordingly.

To use in modules:

````javascript
// var utils = require('../../../lib/utils');
var utils = local('/lib/utils');
````

App root relative paths should always start with a forward slash (/lib/utils). If you want to omit the slash to access a module in the same directory, then just use Node's native require function:

````javascript
var utils = require('./utils');
````

## Run Tests
    $ npm test

## License 

(The MIT License)

Copyright (c) 2013 Dominic Pettifer &lt;sironfoot@gmail.com&gt;

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
