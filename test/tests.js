var assert = require('assert');

var loquire = require('..');

before(function() {
    global.local = loquire({ rootDir: __dirname });
});

describe('root paths', function() {
    it('should require a module at root', function() {
        var utils = local('/module');

        assert(utils);
        assert.equal(utils.testValue, 10);
    });

    it('should require a module in a directory', function() {
        var utils = local('/lib/module');

        assert(utils);
        assert.equal(utils.testValue, 11);
    });

    it('should require a module in a sub directory', function() {
        var utils = local('/lib/sub/module');

        assert(utils);
        assert.equal(utils.testValue, 12);
    });

    it('should require a folder module (loading the default index.js)', function() {
        var utils = local('/lib');

        assert(utils);
        assert.equal(utils.testValue, 13);
    });
});

describe('local paths', function() {

});
