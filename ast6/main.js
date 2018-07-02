/**
 * SIXTH ASSIGNMENT GIVEN IN JS CLASS ON 25 JUNE
 * CREATING SCATTER POINT INTO SMASHER GAME 
 */

var $container = document.getElementById("container");
var antCollection=[];


var deletedObj={};
var colors=['red','green','blue','yellow','purple'];
var speed=18;
var antWidth=20;


function getRandomInt(max=500) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

generateAnt(2);
function generateAnt(n){
for(var i=0;i<n;i++){
   var $ant=document.createElement('div');
   var antObj={
       x:getRandomInt(),
       y:getRandomInt(),
       dx:1,//getRandom(-1,1),
       dy:1,//getRandom(-1, 1),
       $ant:$ant
   };
   antCollection.push(antObj);
   antObj.$ant.className="ant";
   antObj.$ant.style.left=antObj.x+ "px";
   antObj.$ant.style.top=antObj.y+ "px";
   $container.appendChild(antObj.$ant);
 }
 console.log(antObj.$ant);``

}

console.log(antCollection);

//creates x cordinate and y cordinate 
// var dataPoint=function(n=4){
//     var arr=[];
//     for(var i=0;i<n;i++){
//        var x=getRandomInt();
//        var y=getRandomInt();
//        var obj={
//             x:x,
//             y:y,
//             dx:1,
//             dy:1,
//             $elem:createAnt(x,y)
//         }
//         arr.push(obj);
//     }
//     console.log(arr);
//     return arr;
// }



// var ants = dataPoint();
// console.log(ants);


// function createAnt(x,y,color) {
//     // console.log(x);
//     // console.log(y);
//     // console.log(color);
//     var $newElement = document.createElement('div');
//     $newElement.style.width = "50px";
//     $newElement.style.height = "50px";
//     $newElement.style.left = x + "px";
//     $newElement.style.top = y + "px";
//     $newElement.style.position = "absolute";
//     $newElement.style.borderRadius="50%";
//     $newElement.style.backgroundColor= 'red';
//     // console.log($newElement);
//     // console.log($container);
//     $container.appendChild($newElement);
//     return $newElement;
// }

// updateAnt(ants);
// function updateAnt(ants) {
//     for(var i=0;i <ants.length ;i++){
//         ants[i].$elem.style.top = ants[i].y + "px";
//         ants[i].$elem.style.left = ants[i].x + "px";
//     }

// }

// setInterval(function(){
//         updateAnt(ants);
//         moveAnts(ants);
//         interCollision(ants);
//         boundryCollision(ants);
//     },100);

// function moveAnts(ant){
//     for(var i=0;i<ant.length;i++){
//         ants[i].x = ants[i].x + ants[i].dx * speed;
//         ants[i].y = ants[i].y + ants[i].dy*speed;
//     }
// }

// function interCollision(ant) {
//     for(var i=0;i<ant.length;i++){
//         for(var j=1;j<ant.length;j++){
//             checkInterCollision(ant[i],ant[j]);
//         }
//     }
// }

// function boundryCollision(ant) {
//     for (var i = 0; i<ant.length; i++) {
//         // console.log(i, ant[i]);
//             checkBoundryCollision(ant[i]);
//     }
// }

// function checkInterCollision(b1,b2){
// var x1Min = b1.x,
//     x1Max = b1.x + antWidth,
//     y1Min = b1.y,
//     y1Max = b1.y + antWidth,
//     x2Min = b2.x,
//     x2Max = b2.x + antWidth,
//     y2Min = b2.y,
//     y2Max = b2.y + antWidth;
            
//     if (!(x1Max < x2Min || x1Min > x2Max || y1Max < y2Min || y1Min > y2Max)) {
//         // alert("collide");
//         if (!(x1Max < x2Min || x1Min > x2Max)) {
//                 b1.dx = -1;
//                 b2.dx = -1;
//          } else {
//             b1.dy = -1;
//             b2.dy = -1;
//         }

//     }

// }
// function checkBoundryCollision(ball){
//     // console.log(ball);
//     var ballLeft = ball.x;
//     var ballRight = ballLeft + antWidth;
//     var ballTop = ball.y;
//     var ballBottom = ballTop + antWidth;
//     var containerTop = 0;
//     var containerLeft = 0;
//     var containerRight = 800 - 35;
//     var containerBottom = 500 - 35;
//     if (ballRight > containerRight) {
//         // TODO
//         ball.dx = -1;
//         // return true;

//     }
//     if (ballBottom > containerBottom) {
//         // TODO
//         ball.dy = -1;
//         // return true;
//     }
//     if (ballTop < containerTop) {
//         // TODO
//         ball.dy = 1;
//         // return true;
//         // ball.dy = -1;
//     }
//     if (ballLeft <= containerLeft) {
//         // TODO
//         ball.dx = 1;
//         ball.x += antWidth;
//         // return true;
//     }
// }
           