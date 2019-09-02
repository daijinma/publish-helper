
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


  


// new publisher({
//     src:path.resolve(__dirname, '../../active-maker/dist/*.html'),
//     dist: path.resolve(__dirname, '../../active-maker/output'),
//     iwantcdn:false,
//     uploadUrl: "https://static.admin.inyuapp.com/upload",// 上传文件 ajax 路径，必填
//     hostname:function(type, data){
//         return 'http://image.inyuapp.com';
//     },
//     sourceMappingURL:false,
//     chunk: false,
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
    src:path.resolve(__dirname, '../../order-admin/output/*.html'),
    dist: path.resolve(__dirname, '../../order-admin/output'),
    iwantcdn:false,
    uploadUrl: "http://fe.inyuapp.com/upload/file",// 上传文件 ajax 路径，必填
    hostname:function(type, data){
        if (type == "img") {
            return "//image.inyuapp.com";
          } else {
            return "//static.inyuapp.com";
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