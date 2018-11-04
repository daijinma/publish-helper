
var publisher = require('../index.js')
var path = require('path');
var fs = require('fs');
var stripJsonComments = require('strip-json-comments');

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
    src:path.resolve(__dirname, './demo1/*.html'),
    dist: path.resolve(__dirname, './demo1/build'),
    iwantcdn:false,
    uploadUrl: "XXXX",// 上传文件 ajax 路径，必填
    hostname:function(type, data){
        return 'http://cdn.inyuapp.com/';
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