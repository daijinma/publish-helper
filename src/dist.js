var rimraf = require('rimraf');
var path = require('path');
var utils = require('./utils');

module.exports = function(){

    /**
     * copy 文件到输出目录
     */
    utils.mkdir(this.options.dist);

    this.mapfile.html.forEach((element, index) => {
        let basename = path.basename(element);
        utils.copy(element, path.resolve(this.options.dist, basename));
    });
    console.log(`[${global.npm_name}]:输出HTML文件`);

    
    rimraf(this.options.temporary,{},()=>{
        console.log(`[${global.npm_name}]:清处临时文件夹`);
    })
}