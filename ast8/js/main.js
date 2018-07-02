
$container = document.getElementById("bg-container");
$homescreen=document.getElementById('home-screen');
$btnStart=document.getElementById('btn-play');
$btnreStart=document.getElementById('btn-replay');
$overscreen=document.getElementById('game-over');
$score=document.getElementById('score');



const DELAY=10;

var game=new Game({
    delay:DELAY,
    $el:$container,
    $homescreen:$homescreen,
    $overscreen:$overscreen,
    $score:$score,
});

$btnStart.addEventListener('click',function(){
    $homescreen.style.display='none';
    game.start();
});


document.addEventListener('keydown',function(e){
    if(e.key === 'Escape'){
        game.pause();
    }
    if(e.key === 'R' || e.key === 'r'){
        game.resume();
    }
})

//keydown events 