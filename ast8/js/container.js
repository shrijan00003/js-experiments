function Container(props){
    // console.log("element",props.$el);
    var self=this;

    self.$el=(typeof props.$el !== 'undefined' ? props.$el : null);

    self.parent=(typeof props.parent !== 'undefined' ? props.parent : null);

    self.$score=props.$score;

    self.width=self.$el.clientWidth;

    self.height=self.$el.clientHeight;

    // console.log(self.width, self.height);

    self.enemys = [];//enemys collection

    self.bullets = [];

    self.enemy=null;

    self.mycar = null;//my car object

    self.ENEMY_COUNT = 3;//THIS WILL BE TAKEN FROM OUTSIDE

    self.bullet = null;

    self.hitCount = 0;

    self.score=0;

  

    self.makeEnemies = function(){    
        // for(var i=0; i<self.ENEMY_COUNT ; i++){
        var enemy = new Enemy({
            parent : self,
        });
                    
        self.enemys.push(enemy);
                    // console.log(enemy);
        };


    self.__construct=function() {
                
               //creating my car object
                self.mycar = new Mycar({
                    parent: self,
                });
                // console.log(mycar);
            };//end of construct class

    self.__construct();
            
    
            
    self.moveAllEnimies=function(){
        self.enemys.forEach(element => {
        //    console.log(element);
            element.move();
        });

    };//end of moveAllEnimies

    self.renderAllEnimies=function(){
        self.enemys.forEach(enemy=>{
            enemy.render();
        });
        // console.log("hello");

    };//end of render all elements

    document.addEventListener('keydown',function(event){
        const keyName=event.key;
        if(keyName === ' '){
            var bullet = new Bullet({
                parent: self,
                mycar: self.mycar,
            });
           self.bullets.push(bullet); 
           if(self.bullets.length === -1)
                debugger;
        }
    });


    //this function is called from the bullet update method

    // self.checkCollisionWithBullet=function(){

    //     // console.log("bullet length",self.bullets.length);
    //     for(var j = 0; j < self.enemys.length; j++){
    //         for(var i=self.bullets.length-1; i >=0 ; i--){
    //                 var bulletY = self.bullets[i].top,
    //                     enemyY =  self.enemys[j].top + self.enemys[j].height,
    //                     bulletX = self.bullets[i].left,
    //                     enemyX =  self.enemys[j].left,
    //                     enemyMaxX =self.enemys[j].left + self.enemys[j].width;
                        
    //                     // console.log('collide');
    //                  if((bulletX >= enemyX && bulletX <= enemyMaxX) && (bulletY <= enemyY)){
    //                      self.bullets[i].destroyBullet();
    //                      self.enemys[j].reduceHealth(self.enemys[j]);
    //                     //  break;
    //                  }   

    //                 // console.log(self.bullets[i].top);
    //             }
    //         }
    //     }; //end of collision



    self.checkCollisionWithMyCar=function(){
        for (var i = self.enemys.length - 1; i >= 0; i--) {
            var enemyY = self.enemys[i].top+ self.enemys[i].height,
                enemyXMIn = self.enemys[i].left,
                enemyXMax = self.enemys[i].left + self.enemys[i].width;
            
            var mycarY = self.mycar.top,
                mycarXMin = self.mycar.left,
                mycarXMax = self.mycar.left + self.mycar.width;

            if( enemyY >= self.height ){
                self.enemys[i].destroy(self.enemys[i]);
                return false;
            }
            if (enemyY >= mycarY && (enemyXMIn === mycarXMin || enemyXMax === mycarXMax )){
                self.enemys[i].destroy(self.enemys[i]);
                alert("game over");
                return true;
            }

            // return false;


        }
    };//end of checkcollision with my car

    self.updateScore=function(){
        self.score++;
        self.$score.innerHTML=self.score;
    }

}//end of Container class