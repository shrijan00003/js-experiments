function Bullet(props){
    // console.log("in Bullet",props);
    var self=this;

    self.parent=(typeof props.parent !== 'undefined' ? props.parent : null);
    self.mycar=(typeof props.mycar !== 'undefined' ? props.mycar : null);

    // console.log(self.mycar.left);

    self.width=10;
    self.height=10;
    self.bgcolor='white';

    // console.log('props left', props.left);

    self.left = parseInt(((self.mycar.left*2 + self.mycar.width)/2)-(self.width/2));
    self.top = self.mycar.top - self.width;

    self.dx=0;
    self.dy=-1;
    self.speed=49;

     self.distanceY=0;


    self.$elem=null;

    self.__constructor=function(){
        self.alloc();
        self.render();
        // self.render();
    };//end of constructor function


    var handle=setInterval(function(){
        // self.alloc();
        self.distanceY++;
        self.move();
        self.render();
        if(self.distanceY >= 10){
            clearInterval(handle);
        }

    },100);

    self.alloc=function(){

        self.$elem=document.createElement('div');
        self.$elem.className='bullet';
        self.$elem.style.backgroundColor=self.bgcolor;
        self.parent.$el.appendChild(self.$elem);

    };//end of alloc funciton

    self.render=function(){

        // console.log("top",self.top);

        self.$elem.style.left=self.left + "px";
        self.$elem.style.top=self.top + "px";

        self.checkCollisionWithWall();
        self.checkCollisionWithEnemy();

    };//end of render function

    self.move=function(){ 

        self.left += self.dx*self.speed;
        self.top += self.dy*self.speed;

    };//end of move function 



    self.checkCollisionWithWall=function() {
        if(self.top <= 0){
            self.destroyBullet(self);
        }
    };//

    self.removeBullet=function() {
        self.parent.$el.removeChild(self.$elem);
    };//

    //for destroying Bullet
    self.destroyBullet = function () {
        // console.log("here");
        var index = self.parent.bullets.indexOf(self);
        // console.log(index);
        var x = self.$elem;
        self.parent.bullets.splice(index, 1);
        x.remove();
    };// end of destrying Bullet


    self.checkCollisionWithEnemy=function(){
        for(var i = 0; i < self.parent.enemys.length; i++) {
            // console.log(self.parent.enemys.length);
                var bulletY = self.top,
                    enemy=self.parent.enemys[i],
                    enemyY = enemy.top + enemy.height,
                    bulletX = self.left,
                    enemyX = enemy.left,
                    enemyMaxX = enemy.left + enemy.width;

            // console.log('collide');
            if ((bulletX >= enemyX && bulletX <= enemyMaxX) && (bulletY <= enemyY)) {
                self.destroyBullet();
                // console.log(enemy);
                enemy.reduceHealth();
                break;
            }   


        }
    }



    self.__constructor();
}//end of Bullet