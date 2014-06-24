var loquire = require('..');
global.local = loquire({ rootDir: __dirname });

var assert = require('assert');
var path = require('path');

describe('local paths', function() {
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
    
    it('should throw an Error when first forward slash is missing', function() {
        assert.throws(
            function() {
                var module = local('module');
            },
            Error
        );
    });
    
    it('should throw an Error with invalid/missing module that is identical to native require function', function() {
        var requireError = null;
        var loquireError = null;
        
        var fullpath = path.join(__dirname, 'nonsense')
        
        try {
            require(fullpath);
        }
        catch(err) {
            requireError = err;
        }
        
        try {
            local('/nonsense');
        }
        catch(err) {
            loquireError = err;
        }
        
        assert.equal(requireError.toString(), loquireError.toString());
        assert.equal(requireError.code, loquireError.code);
    });
});