var sliderImages = document.querySelectorAll(".image-wrapper"),
    btnLeft = document.querySelector("#pre"),
    btnRight = document.querySelector("#nxt");

var images=[
    'images/1.jpeg',
    'images/2.jpg',
    'images/3.jpeg',
    'images/4.jpeg',
    'images/1.jpeg',
];
var imgSize=640;
var cIndex=0;
var margin=0;
function loadImage(){
    for(var i=0;i<images.length;i++){
        var newElement=document.createElement("img");
        newElement.src=images[i];
        sliderImages[0].appendChild(newElement);
    }
}

btnLeft.addEventListener('click',function() {
    cIndex=(cIndex-=1)%images.length;
    if(cIndex<0){
        cIndex=images.length-1;
    }
    console.log(cIndex);
    // sliderImages[0].style.marginLeft=changeLeftMargin(cInde28;
    changeLeftMargin(cIndex);
});

btnRight.addEventListener('click', function () {
    cIndex = (cIndex += 1) % images.length;
    if (cIndex >=images.length-1) {
        cIndex = 0;
    }
    console.log(cIndex);
    changeRightMargin(cIndex);
})

function getLeftMargin(index){
    return (index*-imgSize);
}

function getRightMargin(index){
    return(index*imgSize);
}

function changeLeftMargin(index){
    var leftMargin=getLeftMargin(index);
    var counter=0;
    var id1= setInterval(function(){
        if (counter === 640){
            counter = 0;
            clearInterval(id1);
        }
        sliderImages[0].style.marginLeft=margin+'px';
        margin+=32;
        counter+=32;
    },100);
    
}
function changeRightMargin(index) {
    var rightMargin=getRightMargin(index);
    var counter = 0;
    var id = setInterval(function () {
        if (counter === 640) {
            counter = 0;
            clearInterval(id)
        }

        if ((5 * (-640)) === margin) {
            margin = 0;
            //alert(margin);
        }

        sliderImages[0].style.marginLeft = margin + 'px';
        margin -=32;
        counter += 32;
    }, 100);

}



loadImage();


