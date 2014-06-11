var path = require('path');
var fs = require('fs');


var getScriptFilesSync = function(dir) {
    var foundFiles = [];
    
    var contents = fs.readdirSync(dir);
    
    contents.forEach(function(dirItem) {
        var fullPath = path.join(dir, dirItem);
        
        var stats = fs.statSync(fullPath);
        
        if (stats) {
            if (stats.isDirectory() && dirItem !== 'node_modules') {
                foundFiles = foundFiles.concat(getScriptFilesSync(fullPath));
            }
            else if (stats.isFile() && path.extname(fullPath) === '.js') {
                foundFiles.push({ filename: dirItem, path: fullPath });
            }
        }
    });
    
    return foundFiles;
};

var hasJsExt = /^.+\.js$/ig;

module.exports = function(options) {

    options = options || {};
    var rootDir = options.rootDir || '/';
    
    var cachedDir = null;
    var numDirectories = 0;

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
                if (!cachedDir) {
                    cachedDir = getScriptFilesSync(rootDir);
                    numDirectories = cachedDir.length;
                }
                
                var matches = [];
                
                if (modulePath.indexOf('/') === -1) {
                
                    // e.g. local('example.js');
                    if (hasJsExt.test(modulePath)) {
                        for (var i = 0; i < numDirectories; i++) {
                            var dir = cachedDir[i];
                            
                            if (dir.filename === modulePath) {
                                matches.push(dir);
                            }
                        }
                    }
                    // e.g. local('example');
                    else {
                        var testModulePath = modulePath + '.js';
                    
                        for (var i = 0; i < numDirectories; i++) {
                            var dir = cachedDir[i];
                            
                            // /path/example.js
                            if (dir.filename === testModulePath) {
                                matches.push(dir);
                            }
                            // /path/example/index.js
                            else {
                                var isIndexModule = new RegExp('^(.+)?\/' + modulePath + '\/index\.js$', 'ig');
                                
                                if (isIndexModule.test(dir.path)) {
                                    matches.push(dir);
                                }
                            }
                        }
                    }
                }
                
                if (matches.length === 1) {
                    modulePath = matches[0].path;
                }
                else {
                    console.log(matches);
                    throw new Error('Unable to determine the caller');
                }
            }
            else {
                var callerPath = path.dirname(caller.filename);
                modulePath = path.join(callerPath, modulePath);
            }
        }

        return require(modulePath);
    };
};



