function Mycar(props) {
    // console.log("props in mycar",props);
    var self=this;

    self.parent=(typeof props.parent !== 'undefined' ? props.parent : null);
    self.height=100;
    self.width=100;

    self.top=500;
    self.left=150;

    self.space=25;//space maintained between

    self.$elem=null;

    self.bullets=null;

    var bulletTriggered=false;

    var test={};

    self.__construct=function(){
        self.alloc();
        self.keyDownCheck();
        self.render();

    };//end of construct function

    self.alloc=function () {
        self.$elem=document.createElement('div');
        self.$elem.className='my-car';
        self.$elem.id='my-car';
        self.parent.$el.appendChild(self.$elem);
    };//end of alloc function

    self.render=function(){
        self.$elem.style.left=self.left +"px";
        self.$elem.style.top=self.top +"px";
    };//end of render
    
    self.eventKeyDown=function(){
        // console.log(self.$elem);

    }
    
    self.keyDownCheck=function(test){
        document.addEventListener('keydown', function(event){
                const keyName = event.key;
                if (keyName === 'ArrowLeft') {
                    // console.log("on left", self.left);
                    self.left -= (self.width + self.space);
                }
                if (keyName === 'ArrowRight') {
                    // console.log("on Right", self.left);
                    self.left += (self.width + self.space);
                }
                if(self.left > 0 && self.left < self.parent.width){
                      self.render();
                }
                // console.log("left in Event",self.left);
                if(keyName === ' '){
                    // self.bullet=new Bullet({
                    //     parent:self.parent,
                    //     mycar: self,
                    //     left: self.left,
                    // });

                //  test.bulletTriggered=true;
                }
            });
            
    }

    
    self.__construct();

}//end of Mycar