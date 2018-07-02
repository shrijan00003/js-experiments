$container=document.getElementById('container');
var game=new Game({
    delay:25,
    antCount: 10, //number of ants to create
    antContainer : {
        $el: $container,
    }
});//end of game

//game start
game.start();

//keydown event