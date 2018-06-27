/**
 * SECOND ASSIGNMENT GIVEN IN JS CLASS ON 25 JUNE
 * CREATING SCATTER POINT INTO SMASHER GAME 
 */

var deletedObj={};
 
function getRandomInt(max=500) {
    return Math.floor(Math.random() * Math.floor(max));
}

//creates x cordinate and y cordinate 
var dataPoint=function(n=10){
    var arr=[];
    for(var i=0;i<n;i++){
        var obj={
            x:getRandomInt(),
            y:getRandomInt()
        }
        arr[i]=obj;
    }
    return arr;
}

var data = dataPoint();
// console.log(data);
//give some style to main-wrapper

var mainWrapper=document.getElementById("main-wrapper");
mainWrapper.style.margin="0px auto";
mainWrapper.style.width="500px";
mainWrapper.style.height="500px";
mainWrapper.style.background="lightblue";
mainWrapper.style.position = "relative";

//fill points to main wrapper
var deletedPoints=[];
function fillWrapper(x,y){
    var newElement=document.createElement('div');
    newElement.style.width = "10px";
    newElement.style.height = "10px";
    newElement.style.left = x + "px";
    newElement.style.top = y + "px";
    newElement.style.position = "absolute";
    newElement.style.background = "red";
    mainWrapper.appendChild(newElement);

    //click event

    newElement.addEventListener('click',function() {
        deletedObj={'x':x+"px",'y':y+"px"}
        mainWrapper.removeChild(newElement);
        deletedPoints.push(deletedObj)

        //for deisplaying deleted points
        console.log("deleted points",deletedPoints);
    })
}


data.forEach(function(element){
    // console.log(element.x);
    fillWrapper(element.x,element.y);
});

/**
 * INITIALLY WE HAVE FILLED BY FOLLOWING PROCESS
 * GOT GOOD REFERENCE FROM IT
 */


// var mainWrapper = document.getElementById("main-wrapper");
// for (var i = 0; i < data.length; i++) {
//     var newElement = document.createElement("div");
//     newElement.style.width = "5px";
//     newElement.style.height = "5px";
//     newElement.style.left = data[i].x + "px";
//     newElement.style.top = data[i].y + "px";
//     newElement.style.position = "absolute";
//     newElement.style.background = "red";
//     mainWrapper.appendChild(newElement);
// }

