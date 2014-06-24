var path = require('path');

module.exports = function(options) {

    options = options || {};
    var rootDir = options.rootDir || '/';

    return function(modulePath) {
        if (modulePath.indexOf('/') !== 0) {
            throw new Error('local module paths must start with a slash');
        }

        modulePath = path.join(rootDir, modulePath.replace(/^~?(\/.+)$/, '$1')); // remove ~ char
        return require(modulePath);
    };
};