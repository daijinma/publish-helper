
var utils = require('./utils')


module.exports = function(){

    return new Promise((resolve, reject)=>{
        let starttime = new Date().getTime();
        console.log(`[${global.npm_name}]:迁移临时文件 - start`)
        
        /**
         * 建立临时文件文件夹
        */
        utils.mkdir(this.options.temporary);

        // /**
        //  * copy html 到临时目录
        // */
        // this.files.forEach((file)=>{
        //     utils.copy(file, path.resolve(this.options.temporary, path.basename(file)));
        // })

        /**
         * copy map 依赖文件到临时目录
        */
        utils.move(this.mapfile._, {
            temporary: this.options.temporary,
            rename: true,
            onCopyed: (key, value)=>{
                this.mapfile._[key].url = value;
            }
        });


        let endtime = new Date().getTime();
        console.log(`[${global.npm_name}]:迁移临时文件 - end (${endtime-starttime}ms)`)
        resolve();
    });
}