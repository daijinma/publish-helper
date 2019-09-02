var utils = require('../utils')
var config = require('./config')
var fs = require("fs")
var path = require('path');

/**
 * 这个正正则检测“ ‘ 中间，结尾为?iwantcdn的字符串
 * 后边会以html 的同级目录处理
 * ps: 需要识别 spa 的 异步文件作上传CDN处理
*/
var iwantcdnREGEXPINJS = config.cdnEXP
var mapEXP = config.mapEXP


module.exports = function(key, file){
    var item,
    countNum = 0,
    shuldInjectChunk = false,
    content = fs.readFileSync(file, 'utf-8');
    var currentPath = path.dirname(file);


    /**
     * 依赖map表上传，现在也还没传呢
     * //# sourceMappingURL=manifest.18206a74ee31a4ef4abd.js.map"
    */

    if(this.options.sourceMappingURL){
        let starLen = content.lastIndexOf("sourceMappingURL");
        if(starLen>0){
            var m = content.substr(starLen+17);
            if(m.indexOf("data:")!=0){
                result = path.resolve(currentPath, m);
            
                if(result && m.length>2){
                    this.mapfile._[`${m}`] = {
                        url:result,
                        count:0,
                    };
                    countNum++;
                    /**
                     * 此次循环的正则，识别js中的map引用 认static 文件
                    */
                    this.mapfile.static.push(m);
                    this.mapfile.staticCount++;
                }
            }
        }
    }

    /**
     * chunk 依赖上传
    */
    if(this.options.chunk){
        let starLen = content.lastIndexOf(/chunk\.js[^\.map]/);
        if(starLen>0){
            shuldInjectChunk = true;
        }

    }

    if(this.options.iwantcdn){
        while(item = iwantcdnREGEXPINJS.exec(content)){
            var m = item[1];
            result = utils.cutUrl.call(this, m);
            if(result && m.length>2){
                this.mapfile._[`${m}`] = {
                    url:result,
                    count:0,
                };
                countNum++;
                /**
                 * 此次循环的正则，识别js中的引用，认为可能是 js，img
                 * 所以只判断是js文件再进行循环
                */
                if(utils.getType(result)=='js'){
                    this.mapfile.js.push(m);
                    this.mapfile.jsCount++;
                    jsScan.call(this, m, result)
                }
            }
        }
    }
    

    if(!this.mapfile._[key]){
        this.mapfile._[key] = {
            url:file,
            count:0,
        }
    }

    this.mapfile._[key].count = countNum;
    this.mapfile._[key].shuldInjectChunk = shuldInjectChunk;
}


