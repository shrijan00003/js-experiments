'use strick'

$canvas = document.getElementById('my-canvas');
$canvas.width   =   window.innerWidth;
$canvas.height = window.innerHeight;

// console.log($canvas.width);
// console.log($canvas.height);

let boxWidth  =  600;
let boxHeight   =   600;
let  pBox = 80;

let canvas =  null;

let game =  null;

let isGameOver = false;

let turn =1; //turn of goat

let msg = 'lets play game';
let gameOverMsg ='';


// Padding

let context = $canvas.getContext("2d");
let ctx = $canvas.getContext("2d");

context.fillStyle   =   "lightblue";


let propsGame = {
    $canvas: $canvas,
    $ctx : ctx,
    context: context,

    boxWidth : boxWidth,
    boxHeight : boxHeight,

    pBox: pBox,
};

game = new Game(propsGame);

// for showing in the playground
let goatEaten = game.getGoatEaten();
if(goatEaten > 5 ){
    isGameOver = true;
    gameOverMsg = 'Game Over More than 5 Goat are eaten '
}


$canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event) {
    event.preventDefault();
    event.stopPropagation();
    
    // console.log(canvas);
    let x = event.x;
    let y = event.y;
    
    x -= $canvas.offsetLeft;
    y -= $canvas.offsetTop;

    // console.log(x,y);
    game.calculateIndex(x,y);

    let goatAvailable = game.getGoatReady();
    let isValidForGoat = game.isPointIndexValid();
    let goatInCanvas    =game.getGoatInCanvas();
    let goatEaten   =   game.getGoatEaten();
    // console.log(isValidForGoat);
    
    
    // console.log("here");
    if((goatAvailable >= 0 && goatAvailable <= 5 ) && isValidForGoat){
            if(turn === 1){
                let s = game.createGoat();
                console.log(s);
               if(s){
                   turn =2;
                  }
            }
        
    }else if( goatInCanvas > 0 && goatEaten < 5){
        if(turn === 2){
            let s= game.moveTigerIfPossible();
            if(s){
                turn = 1;
            }else{
                turn = 2;
            }
            // console.log(s, turn +" turn");
        }
        if( game.getGoatReady() === 0 ){
            if(turn === 1){
                let s= game.moveGoatIfPossible();
                if(s){
                    turn = 2;
                }else{
                    turn = 1;
                }
            }
        }
        //move goat
    }else{
        console.log("click in another location");
    }

    
    
};




