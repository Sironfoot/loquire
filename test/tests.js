var assert = require('assert');

var loquire = require('..');
global.local = loquire({ rootDir: __dirname });

describe('root paths', function() {
    it('should require a module at root (/module)', function() {
        var module = local('/module');

        assert(module);
        assert.equal(module.testValue, 10);
    });

    it('should require a module in a directory (/lib/module)', function() {
        var module = local('/lib/module');

        assert(module);
        assert.equal(module.testValue, 11);
    });

    it('should require a module in a sub directory (/lib/sub/module)', function() {
        var module = local('/lib/sub/module');

        assert(module);
        assert.equal(module.testValue, 12);
    });

    it('should require a folder module, loading the default index.js (/lib)', function() {
        var module = local('/lib');

        assert(module);
        assert.equal(module.testValue, 13);
    });
});



describe('local paths', function() {
    var localFile = local('module');
    var localFolder = local('lib');

    it('should require a local file (module)', function() {
        assert(localFile);
        assert.equal(localFile.testValue, 10);
    });

    it('should require a local folder, loading the default index.js (lib)', function() {
        assert(localFolder);
        assert.equal(localFolder.testValue, 13);
    });

    // here we identified a problem where the caller module could not be determined
    // if the local-require was called from within an executing function
    describe('called from executing function', function() {

        it('should require a local file (module)', function() {
            var module = local('module');
            assert(module);
            assert.equal(module.testValue, 10);
        });

        it('should require a local folder (lib)', function() {
            var module = local('lib');
            assert(module);
            assert.equal(module.testValue, 13);
        });
    });
});
