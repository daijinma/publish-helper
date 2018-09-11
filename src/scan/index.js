
var utils = require('../utils')
var htmlScan = require('./html')
var path = require('path')
var glob = require('glob')

let files = null;
let mainfile = {};

module.exports = function(){
    let starttime = new Date().getTime();
    console.log(`[${global.npm_name}]:扫面页面文件依赖 - start`)

    files = JSON.parse(JSON.stringify(this.mapfile.html));
    this.mapfile.html = [];

    if(typeof files == 'string'){
        files = [files];
    }


    /***
     * 如果扫描chunk的话，将会直接将chunk加入静态资源文件
     * 然后通过改写 app.js 的 append方法，实现src的替换
     */

    return new Promise((resolve, reject)=>{
        if(this.options.chunk){
            this.chunkMap = {};
            glob(this.chunkPath,{}, (err, files)=>{
                files.forEach(element => {
                    let name = path.basename(element);
                    this.mapfile.static.push(name);
                    this.mapfile.staticCount++;
                    this.mapfile._[name] = {
                        url:element,
                        count:0,
                    }
                    this.chunkMap[name.split(".")[0]] = element;

                });

                resolve();
            })
        }else{
            resolve()
        }
    })
    .then(()=>{
        return new Promise((resolve, reject)=>{
            /**
             * 遍历 filelist
            */
            doScanOne.call(this, files.shift(), ()=>{
                let endtime = new Date().getTime();
    
                /**
                 * 单独给static文件排序
                 * 将 ./e.png 保证在 e.png 之前
                 * 防止 replace e.png 的过程中 命中 ./e.png
                 */
                this.mapfile.static.sort((a,b)=>{
                    return a.length<b.length
                })
    
                console.log(`[${global.npm_name}]:扫面页面文件依赖 - end (${endtime-starttime}ms)`)
            }, function(){
                resolve();
            });
        })
    })
 }

 /**
  * 递归扫描HTML文件
 */
function doScanOne(ele, onend, callback){
    var eleFileName = path.basename(ele);
    var temporaryUrl = path.resolve(this.options.temporary, eleFileName);

    utils.copy(ele, temporaryUrl);
    this.mapfile.html.push(temporaryUrl)

    // this.files.push(eleFileName);

    htmlScan.call(this, ele, temporaryUrl)

    if(files.length){
        doScanOne.call(this, files.shift(), onend, callback)
    }else{
        onend();
        callback()
    }
}
    