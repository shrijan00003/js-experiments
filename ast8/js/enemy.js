function Enemy(props) {
    var self=this;

    self.$elem=null;

    self.life=20;

    self.__constructor=function (){

        self.parent=(typeof props.parent !== 'undefined' ? props.parent : null);
    
        self.dx=0;
        self.dy=1;
    
        self.width=100;//we can take it from parent as well
        self.height=100;

        self.alloc(); //creating and adding element to container
        
        self.top=-self.height; //height
        self.left=self.initPosition();
        
        // self.parent.checkCollisionWithMyCar();
        // self.parent.checkCollisionWithBullet();
        
        self.render();

        // console.log(self.$elem);


    };//end of constructor function

    
    self.alloc=function(){
        self.$elem=document.createElement("div");
        self.$elem.className ='enemy-car';
        self.parent.$el.appendChild(self.$elem);
    };//end of alloc function
   
    self.render=function(){
        self.$elem.style.left = self.left + "px";
        self.$elem.style.top = self.top + "px";


    };//end fo render functon

    self.move=function(){
        self.left += self.dx;
        self.top += self.dy;
    };//end of move funciton

    self.initPosition=function () {
        var posibleLeftPosition=[25,150,275];
        return posibleLeftPosition[Math.floor(Math.random() * posibleLeftPosition.length )];
    };


    self.reduceHealth = function(enemy){
        self.life -= 1;
        if(self.life === 0){
           self.destroy(enemy);
           self.parent.updateScore();
        }
    }


    self.destroy = function () {
        var index = self.parent.enemys.indexOf(self);
        var x = self.$elem;
        self.parent.enemys.splice(index, 1);
        x.remove();
    }

    self.__constructor();
}//end of enemy class