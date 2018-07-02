function Game(props) {
    var self=this;
    
    self.$el=(typeof props.$el !== 'undefined' ? props.$el : null);

    self.$homescreen=props.$homescreen;

    self.$overscreen=props.$overscreen;

    self.$score=props.$score;
    
    self.delay=props.delay;
    
    self.distance=0;
    
    self.distanceY=0;
    
    self.isGameOver=false;
    
    var isRunning=false;
    
    self.handle=null;
    
    var isBullet=true;
    
    
    //constructor funciton 
    self.__constructor=function(){
        self.container=new Container({
            $el:self.$el,
            $score:self.$score,
        });
    };//end of constructor
    
    
    self.start=function () {

        if(!isRunning){

        console.info("game is starting");
        isRunning=true;
        //main game loop resides here
        self.handle=setInterval(function(){

        self.distance++;
        self.distanceY++;
        
        self.moveBackgroundImage();
        self.container.moveAllEnimies();
        self.container.renderAllEnimies();

        var check=self.container.checkCollisionWithMyCar();
        // self.container.checkCollisionWithBullet();
        if(check){
            console.log(check);
            clearInterval(self.handle);
            self.$overscreen.style.display='block';
            self.$el.style.display='none';
        }

        
        
        if(self.distanceY >= 100){
            self.container.makeEnemies();
            self.distanceY=0;
        }
        if(self.distance >= 5000){
            self.isGameOver=true;
        }
        if(self.isGameOver === true ){
            clearInterval(self.handle);
        }
    },self.delay);
};
};//end of start function

self.moveBackgroundImage=function(){
    self.$el.style.backgroundPositionY=self.distanceY+"px";
};

self.pause=function(){
    if(isRunning){
        clearInterval(self.handle);
        isRunning=false;
    }
};//end of pause function 

self.resume = function(){
    self.start();
}

    self.__constructor();
}//end of Game