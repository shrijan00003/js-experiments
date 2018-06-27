var $container=document.getElementById("container");
// var $movingBall=document.createElement("div");
// $movingBall.className="ball";
// $container.appendChild($movingBall);

// var $userBall= document.createElement("div");
// $userBall.className = "ball ball-blue";
// $container.appendChild($userBall);

function createBall(container,ballName,ballClass,id=null){
    var $ballName=ballName;
    var $container = container;
    var $ballClass=ballClass;
    var $ballId=id;
    // console.log($ballName);
    $ballName=document.createElement("div");
    $ballName.className=$ballClass;
    $ballName.id=$ballId;
    $container.appendChild($ballName);
    return $ballName;
}

$movingBall=createBall($container,'movingBall','ball red');
$userBall=createBall($container,'userBall','ball blue','userBall');

var ballWidth=50;
var speed=25;
var movingBall={
    x:10,
    y:10,
    dx:1,
    dy:1,
    $elem:$movingBall
};
var userBall = {
    x: 200,
    y: 200,
    dx: 1,
    dy: 1,
    $elem: $userBall
};


updateBall(movingBall,userBall);




// function moveAndCheck(ball){
    // setInterval(function(ball){
        // ball.x = ball.x + ball.dx * speed;
        // ball.y = ball.y + ball.dy * speed;
        // var hasCollide = checkBoundryCollision(ball)
        // updateBall(ball);
        // console.log(ball);
        // },100);
// }
// moveAndCheck(movingBall);
// moveAndCheck(userBall);



setInterval(function(){
    movingBall.x=movingBall.x+movingBall.dx*speed;
    movingBall.y=movingBall.y+movingBall.dy*speed;
    
    userBall.x = userBall.x + userBall.dx * 10;
    userBall.y = userBall.y + userBall.dy * 10;
    interCollision(movingBall,userBall);
    var hasCollide=checkCollision(movingBall,userBall); //it is not so necessary for passing it by value because it will be updated each time.
    updateBall(movingBall,userBall);
},100);

// function updateBall(ball){
//     movingBall.$elem.style.top=movingBall.y+"px";
//     movingBall.$elem.style.left=movingBall.x+"px";
// }

function updateBall(movingBall,userBall) {
    movingBall.$elem.style.top = movingBall.y + "px";
    movingBall.$elem.style.left = movingBall.x + "px";

    userBall.$elem.style.top = userBall.y + "px";
    userBall.$elem.style.left = userBall.x + "px";
}


function checkCollision(){
    checkBoundryCollision(movingBall);
    checkBoundryCollision(userBall);
    // interCollision(movingBall,userBall);
}


function interCollision(b1,b2){
    var x1Min = b1.x,
    x1Max = b1.x+ballWidth,
       y1Min = b1.y,
       y1Max = b1.y+ballWidth,
       x2Min = b2.x,
       x2Max = b2.x + ballWidth,
       y2Min = b2.y,
       y2Max = b2.y + ballWidth;
       
    if (!(x1Max < x2Min || x1Min > x2Max || y1Max < y2Min || y1Min > y2Max)){
        console.log("collide");
        
        if (!(x1Max < x2Min || x1Min > x2Max )){
            if (x1Max >= x2Min){
                b1.dx=-1;
                b2.dx=-1;
        
            }
            if (x1Min <= x2Max){
                b2.dx=-1;
                b1.dx=-1;
             }
             // b1.dx=1;b2.dx=-1;
            
        }else{
            console.log("y-collide");
        }

        if(y1Max >= y2Min || y1Min <= y2Max ){
            b1.dy=-1;
            b2.dy=1;
        }
    }

    // if(x1Max >= x2Min){
        //     b1.dx=-1;
    //     b2.dx=1;
    // }
    // if (x2Max >= x1Min) {
    //     b1.dx = -1;
    //     b2.dx = 1;
    // }

}
function checkBoundryCollision(ball){
    // console.log(ball);
    var ballLeft = ball.x;
    var ballRight = ballLeft + 20;
    var ballTop = ball.y;
    var ballBottom = ballTop + 20;
    var containerTop = 0;
    var containerLeft = 0;
    var containerRight = 800-35;
    var containerBottom = 500-35;
    if (ballRight > containerRight) {
        // TODO
        ball.dx = -1;
        return true;
       
    }
    if (ballBottom > containerBottom) {
        // TODO
        ball.dy = -1;
        return true;
    }
    if (ballTop < containerTop) {
        // TODO
        ball.dy = 1;
        return true;
        // ball.dy = -1;
    }
    if (ballLeft < containerLeft) {
        // TODO
        ball.dx = 1;
        return true;
    }
}

/**
 * 
 * @param {*} e
 * FOR CHECKING KEY INPUT 
 */
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
            userBall.dx=-1;
            break;
            case 38:
            // alert('up');
            userBall.dy=-1;
            break;
            case 39:
            // alert('right');
            userBall.dx=1;
            break;
        case 40:
            // alert('down');
            userBall.dy=1;
            break;
    }
};


