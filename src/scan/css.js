var utils = require('../utils')
var config = require('./config')
var fs = require("fs")
var path = require('path');

var cssEXP = config.cssEXP


/**
 * css文件扫描
 * 理论上就只是外链的image图片了
 * 不再做处理
*/
module.exports = function(key, file){
    var item,
    countNum = 0,
    content = fs.readFileSync(file, 'utf-8'),
    baseurl = path.dirname(file)
    
    while(item = cssEXP.exec(content)){
        var m = item[2];
        if(m.indexOf("data:")!==0){
            result = utils.cutUrl.call(this, m, baseurl);
            if(result && m.length>2){
                countNum++;
                this.mapfile.static.push(m);
                this.mapfile.staticCount++;
                this.mapfile._[`${m}`] = {
                    url:result,
                    count:0,
                };
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
}