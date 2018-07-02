function Ant(props){
    var self=this;

    
    self.__constructor=function(){
        self.parent=(typeof props.parent !== undefined ? props.parent :null);
        
        self.bgColor=(typeof props.bgColor==='string'? props.bgColor: self.createRandomColor() );
        
        self.dx=1;
        self.dy=1;
        
        self.alloc();

        self.width=50;
        self.height=50;

        var randomXY=self.getRandomXY();

        self.x=(typeof props.x=== 'number' ? props.x : randomXY.x);
        self.y=(typeof props.y=== 'number' ? props.y : randomXY.y);

        // console.log(self.x,self.y);

        self.render();

    };//end of constructor

    self.alloc=function(){
        self.$elem=document.createElement("div");
        self.$elem.className='ant';
        self.$elem.style.backgroundColor=self.bgColor;
        self.parent.$el.appendChild(self.$elem);
    };

    self.render=function(){
        self.$elem.style.left=self.x + "px";
        self.$elem.style.top=self.y + "px";
    };

    self.move=function(){
        self.x +=self.dx;
        self.y +=self.dy;
    }

    self.createRandomColor=function(){
        var maxColor=255;
            r=parseInt(Math.random() * maxColor),
            g=parseInt(Math.random() * maxColor),
            b=parseInt(Math.random() * maxColor),
            color='rgb('+r+','+g+','+b+')';

            return color;
    };//end of createRandomcolor


    /**
     * THIS FUNCTION WILL HAVE PROBLEM IF WE HAVE MORE THAN 
     * CERTAIN NUMBER OF ANTS SO THIS NEED TO MODIFIED
     */
    self.getRandomXY=function(){
        var pos={};
        do{
            pos={
                x:self.getRandomX(),
                y:self.getRandomY(),
                height: self.height,
                width: self.width,
            };
            isOverlapWithOthers=self.parent.checkIfOverlapWithOthers(pos);
            // console.log("from random xy",isOverlapWithOthers);

        }while(isOverlapWithOthers);
        //checking if another particle created as same position
        return pos;
    };//end of getRandomXY

    self.getRandomX=function(){
        // console.log(self.parent.width);
        var x=parseInt(Math.random()*(self.parent.width-self.width));
        return x;
    };
    self.getRandomY = function () {
        // console.log(self.parent.height);
        var y = parseInt(Math.random() * (self.parent.height - self.height));
        return y;
    };

    // remember ! this function is called from container to check if 
    // it is collide with others 
    self.isOverlapWith=function(ant){
        // console.log("ant",ant);
        var x1Min=self.x;
        var x1Max=self.x+self.width;
        var y1Min=self.y;
        var y1Max=self.y+self.height;

        var x2Min=ant.x;
        var x2Max=ant.x+ant.width;
        var y2Min=ant.y;
        var y2Max=ant.y+ant.height;

        // console.log("this",y1Min,y1Max);
        // console.log("ant",y2Min,y2Max);

        if (x1Max < x2Min || x1Min > x2Max || y1Max < y2Min || y1Min > y2Max ){
            // console.log("not collide")
            return false;
        }else{
            // // console.log("collide");
            // if(x1Max> x2Min || x1Min < x2Max){
            //     console.log("x-collide")
            // }
            // if(y1Max > y2Min || y1Min < y2Max){
            //     console.log("y-collide")
            // }
            return true;
        }


    };

    self.checkCollisionWithBoundry=function (){
        if(self.x <= 0 || self.x + self.width >= self.parent.width){
            self.dx=-self.dx;
        }

        if(self.y <= 0 || self.y + self.height >= self.parent.height){
            self.dy=-self.dy;
        }
    };//end of checkCollisionWithBoundry


    self.checkCollisionWith=function(ant){
        if(self.isOverlapWith(ant)){
            var tempX=self.dx;
            self.dx=ant.dx;
            ant.dx=tempX;

            var tempY=self.dy;
            self.dy=ant.dy;
            ant.dy=tempY;


        }
    }

    self.__constructor();
}//end of class