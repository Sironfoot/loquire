var path = require('path');

module.exports = function(options) {

    options = options || {};
    var rootDir = options.rootDir || '/';
    
    var cachedDir = null;
    var numDirectories = 0;

    return function(modulePath) {

        // deal with root paths (start with slash/)
        if (modulePath.search(/^~?\/.+$/) === 0) {
            modulePath = path.join(rootDir, modulePath.replace(/^~?(\/.+)$/, '$1')); // remove ~ char
            return require(modulePath);
        }
        // deal with local paths (no slash)
        else {
            return module.parent.require('./' + modulePath);
        }
    };
};