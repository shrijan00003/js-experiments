'use strick'
class Tiger {
  constructor(props) {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.$canvas = props.$canvas;
    this.context = props.context;
    // this.context = props.context;
    this.parent = props.parent;

    this.tiger = {};
    this.dragOk = false;

    this.x = null;
    this.y = null;

    this.startX = null;
    this.startY = null; 

    this.prev;
    this.next;
    this.pMoves;
    this.cur;

    this.step = 1;

    this.successMove = false;

  }

  updateTigerInArray(prev, cur) {
      this.parent.clearTigerFromArray(prev);
      this.parent.updateTiger(cur); //update index
  }

  renderTiger(x, y) {
      this.tiger ={
          x : x,
          y : y,
          r: 20,
          isDragging : false
        // --------for rect----------

        //   width : 10,
        //   height : 10,
        //   fill : "#bbb",
        //   ctx.beginPath();
        //   ctx.arc(100, 75, 30, 0, 2 * Math.PI);
        //   ctx.fillStyle = "red";
        //   ctx.fill();
        //   ctx.closePath();
      }
      this.clear();
      this.draw();
  }
  
  draw(){
      this.clear();
      this.context.fillStyle = "red";
      this.makeCircle( this.tiger.x, this.tiger.y, this.tiger.r);
    }
    //   this.makeRect( this.tiger.x, this.tiger.y, this.tiger.width,  this.tiger.height);

  clear(){
      this.context.clearRect(this.tiger.x, this.tiger.y, this.tiger.width, this.tiger.height);
    
  }

//   makeRect( x, y, w, h ){
//     this.context.beginPath();
//     this.context.rect( x, y, w, h );
//     this.context.closePath();
//     this.context.fill();
//   }
  makeCircle( x, y, r ){
    this.context.beginPath();
    this.context.arc(x, y, r , 0, 2 * Math.PI);
    this.context.fillStyle = "red";
    this.context.fill();
    this.context.closePath();
  }

  selectTiger(mx,my){
      //this event is called on mouse down

    this.prev = this.parent.getCurrentIndex();

    this.dragOk = true;
    this.tiger.isDragging = true;
    
    this.startX = mx;
    this.startY =my;
    return true;
    

  }//end of checIfTigerSelected
  
  onMouseUp(){
      
      
      document.addEventListener('mouseup', function (e) {
          e.preventDefault();
          e.stopPropagation();
          
          this.dragOk = false;
          this.tiger.isDragging = false;
          
          this.clear();
          
          //check condition here and place tiger then
        
          this.next = this.parent.calculateIndex(this.x , this.y);
          let dis = this.parent.calculateDistance(this.prev, this.next);
         
          if( dis > 0 ){
              if(dis === 1 || dis === 2){
                  
                  //if current move matches in the possible move
                  //if current move is empty
                  this.step = 1;
                  
                  this.moves = this.parent.findPossiblePath(this.prev, this.step);
                  
                  this.next = this.parent.calculateIndex(this.x, this.y);
                  // let move = this.parent.findPossiblePath(prev, step);
                  let issEmpty = this.parent.checkIfEmpty(this.next)
                  
                  let ifMatch = this.parent. findIfMatch(this.next,this.moves);
                  
                  let isPreviousTiger = this.parent.isPreviousTiger(this.prev);
                  
                  
                if (issEmpty && ifMatch && isPreviousTiger) {
               
                    this.updateTigerInArray(this.prev,this.next);
                    this.successMove = true;
                    
                }else{
                    // console.log("not matched");
                    this.successMove = false;
                }
                

            }
            if(dis === 4 || dis === 8 ){
                
                this.step = 2;

                this.moves = this.parent.findPossiblePath(this.prev, this.step);

                this.next = this.parent.calculateIndex(this.x, this.y);
                // let move = this.parent.findPossiblePath(prev, step);
                let issEmpty = this.parent.checkIfEmpty(this.next)

                let ifMatch = this.parent.findIfMatch(this.next, this.moves);

                let isPreviousTiger = this.parent.isPreviousTiger(this.prev);

                let midIndex = this.parent.midPointOf(this.prev, this.next);

                let isMiddleGoat = this.parent.findIsMiddleIndexHaveGoat(midIndex);
            
                //if matches update the array
                //decrease the goat count in game
                //increase the goat eaten 
                //repaint the goat object

                if (issEmpty && ifMatch && isPreviousTiger && isMiddleGoat ){
                    this.updateTigerInArray(this.prev , this.next);
                    this.parent.updateGoatInArray(midIndex)
                    this.successMove = true;
                    // console.log(this.successMove);
                }else{
                    this.successMove = false;
                    // console.log(this.successMove);
                }

            }
            // console.log(this.successMove);

             
        }


    }.bind(this));
    // return this.successMove;
    // console.log(this.successMove);


    //   console.log(this.successMove);
      return true;
  };// end of onMouseUp

  onMouseMove(){
      document.addEventListener('mousemove',function(e) {
         if(this.dragOk){

             this.clear();
             e.preventDefault();
             e.stopPropagation();

              this.x = e.x;
              this.y = e.y;

             this.x -= this.$canvas.offsetLeft;
             this.y -= this.$canvas.offsetTop;

    

             let dx = this.x - this.startX;
             let dy = this.y - this.startY;

             if(this.tiger.isDragging){
                 this.tiger.x += dx;
                 this.tiger.y += dy;
             }
            //  this.updateTigerInArray();
             this.draw();

             this.startX = this.x;
             this.starty = this.y;

         }
      }.bind(this));
  }


};//end of canvas class
