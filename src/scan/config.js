/**
 * 这个正正则检测“ ‘ 中间，结尾为?iwantcdn=1的字符串
 * 后边会以html 的同级目录处理
 * ps: 需要识别 spa 的 异步文件作上传CDN处理
*/
exports.cdnEXP = /[\'\"]([^\'\"]*.[swf|js|css|png|jpg|ico|icon|gif].*[\?|&]iwantcdn=1).*[\'\"]/gi

// html中引入的css
exports.srcSourceCss = /href=[\'\"]?([^\'\"]*.[css|ico|icon|png])[\'\"]?/gi; 

// html 中 的 img js 外部资源
exports.srcSource = /(src)=[\'\"]?([^\'\">]*)[\'\"]?/gi; 

//css中的url() 引入
exports.cssEXP = /(url\(|src=)\s*\s*["']?([^"'\)]+)\s*["']?\s*[\),]/gi; 

// css js 文件中的map引用
exports.mapEXP = /(sourceMappingURL)=[\'\"]?([^\'\">]*)[\'\"]?/gi; 
////# sourceMappingURL=0.1a8a77f1486b1dd0274f.js.map

