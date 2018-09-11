var fs = require('fs');
var path = require('path');

function stripscript(s) { 
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]");
	var rs = "";  
	for (var i = 0; i < s.length; i++) {   
	     rs = rs + s.substr(i, 1).replace(pattern, '');  
	  }  
	return rs;
}

var utils =  {
	url2name:function(a){
		a = stripscript(a);
		return a.replace(/:|\\|\//g,"");
	},
	move : function(obj, option){
		
		utils.mkdir(option.temporary);

		for (key in obj) {
			var that = obj[key];
			var name  = (option.rename)?utils.url2name(that.url):path.basename(that.url);

			if(fs.existsSync(that.url)){
				let fullurl = path.resolve(option.temporary, name);
				utils.copy(that.url, fullurl);
				if(option.onCopyed){
					option.onCopyed(key, fullurl)
				}
			}
		}
	},
	mkdir:function(dirname){
		if(!fs.existsSync(dirname)){
			fs.mkdirSync(dirname,0777);
		}
	},
	copy: function(src,dist){
		let format = 'utf8';
		let type = path.extname(src);
		let isImage = /(png|jpg|gif|jpge|icon|ico)/i.test(type);
		if(isImage){format = "binary"};

		let content = fs.readFileSync(src, format);
		fs.writeFileSync(dist, content, format);
    },
    isHttpUrl: function(url){
        var ishttp = /^(http[s]?:)?\/\//.test(url);
        var data = url.indexOf("data:image")===0;
    
        return ishttp || data;
    },
    /**
     * 获取文件后缀
    */
    getType: function(url){
        return path.extname(url).toLowerCase().replace('.','');
    },
    /**
     * 截断出绝对路径的url
    */
    cutUrl:function cutUrl(m, root){
		if(m.indexOf("<?php")>-1){
			return "";
		}else if(this.mapfile._[m] || utils.isHttpUrl(m)){
            return false;
        }else if(m.indexOf('/')==0){
			return path.resolve(this.htmlpath, "."+m).split('?')[0];
        }else{
			return path.resolve(root || this.htmlpath, m).split('?')[0];
        }
        
    }


}

module.exports = utils;