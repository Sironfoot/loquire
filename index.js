var path = require('path');

module.exports = function(options) {

    options = options || {};
    var rootDir = options.rootDir || '/';

    return function(modulePath) {
        // deal with root paths (start with slash/)
        if (modulePath.search(/^~?\/.+$/) === 0) {
            modulePath = path.join(rootDir, modulePath.replace(/^~?(\/.+)$/, '$1')); // remove ~ char
        }
        // deal with local paths (no slash)
        else {
            var origPrepareStackTrace = Error.prepareStackTrace;

            Error.prepareStackTrace = function (_, stack) { return stack; };
            var stack = new Error().stack;
            Error.prepareStackTrace = origPrepareStackTrace;

            var caller = null;

            for (var i = 0; i < stack.length; i++) {
                var receiver = stack[i].receiver;
                if (receiver) {
                    var isModule = receiver.exports && receiver.filename;
                    if (isModule) {
                        caller = receiver;
                        break;
                    }
                }
            }

            if (!caller) {
                throw new Error('Unable to determine the caller');
            }

            var callerPath = path.dirname(caller.filename);
            modulePath = path.join(callerPath, modulePath);
        }

        return require(modulePath);
    };
};
