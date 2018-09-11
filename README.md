# 静床push工具

## 规范
> "chunk.js" 为保留关键词，用来搜索 chunk文件依赖
> `src` `dist` 需要绝对路径
> `sourceMappingURL` 暂不支持
> `chunkFilename` 规范 必须是 `[name].chunk.js`
```

this.options = Object.assign({
        root: process.cwd(),
        iwantcdn:false,
        uploadUrl: "XXXX",
        sourceMappingURL:true,
        chunk: false,
    }, options)


var publisher = require('../index.js')

new publisher({
    src:path.resolve('./demo1/*.html'), // 改写HTML路径 glob 规范
    dist:path.resolve('./demo1/dist'),  // 输出 html 路径  
    iwantcdn:false,  // 是否支持 iwantcdn 后缀 (false)
    sourceMappingURL:false,  // 是否支持 sourceMappingURL  (true)
    chunk: true,   // 是否支持 chunk 异步加载  (false)  chunk 匹配 " chunk.js"
    chunkFilename: '/static/js/[name].chunk.js',
    uploadUrl: "XXXX", // 上传图地址
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

```

