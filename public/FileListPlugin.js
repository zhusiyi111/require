function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
        // 创建一个头部字符串：
        var filelist = 'In this build:\n\n';

        var map = {};

        // 检查所有编译好的资源文件：
        // 为每个文件名新增一行
        for (var filename in compilation.assets) {
            var children = compilation.assets[filename].children;
            if(!children){
                continue;
            }
            let code = children[0]._value;

            let requireArr = getModuleRequire(code);
            let moduleName = getModuleName(code);
            if(moduleName){
                map[moduleName] = requireArr;
            }
        }


        // 把它作为一个新的文件资源插入到 webpack 构建中：
        compilation.assets['requireList.html'] = {
            source: function() {
                return JSON.stringify(map);
            },
            size: function() {
                return filelist.length;
            }
        };

        // 把它作为一个新的文件资源插入到 webpack 构建中：
        compilation.assets['requireList.js'] = {
            source: function() {
                var html = `
                window.J_Module.requireMap = ${JSON.stringify(map)}
                `
                return html;
            },
            size: function() {
                return filelist.length;
            }
        };

        callback();
    });
};


function getModuleRequire(code){
    var require = code.match(/\/\*require:([^*]+)\*\//);

    if(!require || !require.length){
        return [];
    }
    require = require[1];

    if(require){
        require = require.split(',');
    }else{
        require = [];
    }
    return require;
}

function getModuleName(code){
    var moduleName = code.match(/\/\*moduleName:([^\*]*)\*\//);

    if(moduleName){
        moduleName = moduleName[1]
    }else{
        moduleName = '';
    }
    return moduleName;
}


module.exports = FileListPlugin;