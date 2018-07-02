function Game(props){
  var self=this;  

  self.delay=props.delay || 100;

  self.container = (typeof props.antContainer.$el !== undefined ? props.antContainer.$el :null);

  self.antCount = (typeof props.antCount !== undefined ? props.antCount : null);

  
  //  console.log(self.antCount);
  var isRunning=false;
  self.intervalRef=null;

  self.__constructor=function() {
      self.container=new Container({
        $el:self.container,
        antCount: self.antCount,
      });
  };  

//this start function will be called from the main.js file 
self.start=function(){
  if(!isRunning){
    console.log("Game is starting ....");
    isRunning=true;
      self.intervalRef=setInterval(function(){
      //main game loop here
      self.container.checkCollisionWithAllWalls();
      self.container.checkInterAntsCollision();
      self.container.moveAllAnts();
      self.container.renderAllAnts();

      },self.delay);
  }//end of if
};//end of start loop 

self.__constructor();
}//end of game 