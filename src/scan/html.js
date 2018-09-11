var cssScan = require('./css')
var jsScan = require('./js')
var utils = require('../utils')
var fs = require("fs")
var path = require('path');
var config = require('./config')


var srcSource = config.srcSource
var srcSourceCss = config.srcSourceCss
var iwantcdnREGEXPINHTML = config.cdnEXP


module.exports = function(key, file){
    var item,
    countNum = 0,
    content = fs.readFileSync(file, 'utf-8');

    // src file url
    // src=""
    while(item = srcSource.exec(content)){
        var m = item[2];
        result  = utils.cutUrl.call(this, m);
        if(result && m.length>2){
            countNum++;
            this.mapfile._[`${m}`] = {
                url:result,
                count:0,
            };

            /**
             * 此次循环的正则，只能识别到js, img
             * 所以只判断是js文件再进行循环
            */
            if(utils.getType(result)=='js'){
                this.mapfile.js.push(m);
                this.mapfile.jsCount++;
                jsScan.call(this, m, result)
            }else{
                this.mapfile.static.push(m);
                this.mapfile.staticCount++;
            }
        }
    }
    // href file url
    // 这里=就简单的理解为css引用了
    // href=""
    while(item = srcSourceCss.exec(content)){
        var m = item[1];
        result = utils.cutUrl.call(this, m);
        if(result && m.length>2){
            countNum++;
            this.mapfile._[`${m}`] ={
                url:result,
                count:0,
            };;
            /**
             * 这里应该完全是css样式了
             * 依然做个判断，执行css的img背景扫描
            */
            let type= utils.getType(result);
            if(type=='css'){
                this.mapfile.css.push(m);
                this.mapfile.cssCount++;
                cssScan.call(this, m, result)
            }else if(type=='ico' || type=='icon' || type=='png'){
                this.mapfile.static.push(m);
                this.mapfile.staticCount++;
            }
        }
    }

    /**
     * iwantcdn tag search
     * 比如 页面上 字符串
     * require("./a/b.c.js?iwantcdn=1")
     * */ 
    if(this.options.iwantcdn){
        while(item = iwantcdnREGEXPINHTML.exec(content)){
            var m = item[1];
            result = utils.cutUrl.call(this, m);
            if(result && m.length>2){
                countNum++;
                this.mapfile._[`${m}`] = {
                    url:result,
                    count:0,
                };;
                let type = utils.getType(result);
    
                /**
                 * 自定义类型强制上传
                 * 支持 css js
                */
                if(type=='js'){
                    this.mapfile.js.push(m);
                    this.mapfile.jsCount++;
                    jsScan.call(this, result)
                }else if(type=='css'){
                    this.mapfile.css.push(m);
                    this.mapfile.cssCount++;
                    cssScan.call(this, result)
                }
            }
        }
    }

}


