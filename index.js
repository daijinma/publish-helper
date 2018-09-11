var glob = require('glob')
var main = require('./src/main.js')
var path = require('path');
var utils = require('./src/utils');

global.npm_name = 'publisher';

/**
 * 主业务入口
 * 接收外部参数option
*/
function controller(options){
    this.options = Object.assign({
        root: process.cwd(),
        iwantcdn:false,
        sourceMappingURL:true,
        chunk: false,
    }, options)
    
    this.options.hostname = options.hostname;
    this.options.uploadUrl = options.uploadUrl;

    if(!this.options.src){
        throw new Error("html src (string) is required");
        return
    }

    /**
     * 设置临时文件储存地址
    */
    this.options.temporary = path.resolve(this.options.dist, './__tmp')
    utils.mkdir(this.options.dist);
    utils.mkdir(this.options.temporary);


    this.mapfile = {
        js:[],
        css:[],
        html:[],
        static:[],
        jsCount:0,
        cssCount:0,
        staticCount:0,
        count:0,
        _:{},
    };

    this.init();
}



module.exports = controller;

/**
 * 初始化搜索
 * 依赖glob gulp的内部主要文件，作搜索入口
*/
controller.prototype.init = function(){
    glob(this.options.src, {
        cwd: path.resolve(this.options.root),
        realpath :true,
    }, (err, files)=>{
        this.files = files;
        if(err || this.files.length==0){
            throw new Error("glob can't find html in option.src");
            return
        }else{
            this.htmlpath = path.dirname(files[0])

            if(this.options.chunk){
                let chunkpath = this.options.chunkFilename;
                if(path.isAbsolute(chunkpath)){
                    chunkpath = "."+chunkpath;
                }
                this.chunkPath = path.resolve(this.htmlpath, chunkpath);
                this.chunkPath = this.chunkPath.replace(/\[.+\]/i,"*")
            }
        
            this.mapfile.html = files;
            main.scan.call(this)
            .then(()=>{
                return new Promise((resolve, reject)=>{
                    if(this.options.onScand){
                        this.options.onScand.call(this, this.mapfile, resolve)
                    }
                })
            })
            .then(()=>{
                this.move()
            })
        }
    })
}

/**
 * 做move处理
 * 将map表的对应文件拍平，copy出一份临时文件
 * 适应文件处理，例如压缩...
*/
controller.prototype.move = function(){
    main.move.call(this)
    .then(()=>{
        return new Promise((resolve, reject)=>{
            if(this.options.onMoved){
                this.options.onMoved.call(this, this.mapfile, resolve)
            }
        })
    })
    .then(()=>{
        this.uploader()
    })
}

/**
 * uploader
*/
controller.prototype.uploader = function(){
    main.uploader.call(this)
    .then(()=>{
        console.log("rewrite ok!")
        this.dist();
    })
    .then(()=>{
        if(this.options.onDone){
            this.options.onDone.call(this, this.mapfile)
        }
    })
    
}


/**
 * 输出最终的html文件
*/
controller.prototype.dist = function(){
    main.dist.call(this)
}


process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!');
    console.error(err.stack);
});
