
var publisher = require('../index.js')

new publisher({
    root:__dirname,
    src:'./*.html',
    dist:'./dist',
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