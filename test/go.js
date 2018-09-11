
var publisher = require('../index.js')
var path = require('path');

// new publisher({
//     src:path.resolve(__dirname, '../../../2018/pc.xingxiu/dist/*.html'),
//     dist:path.resolve(__dirname, '../../../2018/pc.xingxiu/phpview'),
//     iwantcdn:false,
//     sourceMappingURL:false,
//     chunk: true,
//     chunkFilename: '/js/[name].chunk.js',
//     onScand: function(map, next){
//         console.log('onScand');
//         next();
//     },
//     onMoved: function(map, next){
//         console.log('onMoved')
//         next();
//     },
//     onDone: function(map){
//         console.log('onDone')
//     },
// });



new publisher({
    src:path.resolve(__dirname, 'path/src/*.html'),
    dist: path.resolve(__dirname, 'path/build'),
    iwantcdn:false,
    uploadUrl: "XXXX",// 上传文件 ajax 路径，必填
    hostname:function(type, data){
        let num = (data.hash).replace(/[^0-9]/ig,"");
        num = num%5;
        if(type="img"){
            return 'xxi'+num+".cdn.test.com";
        }else{
            return 'xxs' + num +".cdn.test.com";
        }
    },
    sourceMappingURL:false,
    chunk: false,
    chunkFilename: '/js/[name].chunk.js',
    onScand: function(map, next){
        console.log('onScand');
        next();
    },
    onMoved: function(map, next){
        console.log('onMoved')
        next();
    },
    onDone: function(map){
        console.log('onDone')
    },
});