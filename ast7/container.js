function Container(props) {
    var self = this;

    self.antCount=(typeof props.antCount==='number' ? props.antCount : 2 );

    self.$el=(typeof props.$el !== 'undefined' ? props.$el :null);

    self.height=self.$el.clientHeight;

    self.width=self.$el.clientWidth;

    self.ants=[]; //ants collection
 
    // console.log(self.height,self.width);
    // console.log(self.antCount);
    self.__constructor=function (){
        for(var i=0; i< self.antCount; i++){
            var ant=new Ant({
                parent:self
            });
            //add to the antCollection array
            self.ants.push(ant);
        }
    };//end of constructor 

    self.checkIfOverlapWithOthers=function(pos){
        //positioin will have number of objects position created
        //they will have identical amount of antCount as we have 
        //created here with
        
        // console.log("ants",self.ants);

        for(var i=0; i < self.ants.length; i++){
            //we will call a function in ant so that it can be 
            //compared with other created ants

            //ants[i] will call the function of ant object 
            
            if (self.ants[i].isOverlapWith(pos)){
                return true;
            }

        }
        return false;
    };//enf of checkIfOverlapWithOthers

    self.checkCollisionWithAllWalls=function (){
        self.ants.forEach(ant => {
            ant.checkCollisionWithBoundry();
        });
    };//end of checkCollisionWithAllWalls

    self.checkInterAntsCollision=function(){
       for(var i=0; i < self.ants.length; i++){
           for(var j=i; j < self.ants.length; j++){
              //If this is not working we have to add another code here
               self.ants[i].checkCollisionWith(self.ants[j]);
           }
       }
    };//end of checkInterParticleCollision

    self.moveAllAnts=function(){
        self.ants.forEach(function(ant){
            ant.move();
        });
    };//end of move all Ants

    self.renderAllAnts=function(){
        self.ants.forEach(function(ant){
            ant.render();
        });  
    }// end of renderAllAnts

    self.__constructor();

}//end of container class