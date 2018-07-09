'use strick'
class Goat {
  constructor(props) {
    this.$canvas = props.$canvas;
    this.context = props.context;
    this.parent = props.parent;
    this.xIndex = props.xIndex;
    this.yIndex = props.yIndex;

    // console.log(this.xIndex , this.yIndex);
    // this.renderGoat(this.xIndex , this.yIndex);

      this.spawnGoat();
  }

  /**
   * @param {null}
   * @description CREATING GOAT FOR THE FIRST TIME
   */
  spawnGoat() {
      let xIndex = this.parent.getXIndex();
      let yIndex = this.parent.getYIndex();
      let goatAvalilable = this.parent.getGoatReady();

      if(this.parent.gameArray[xIndex][yIndex] === 0 && goatAvalilable > 0){
          this.parent.gameArray[xIndex][yIndex]= 'G';
      }

      this.parent.updateGoatReady();
  }//end of drqwPlayGround

  updateGoatInArray(prev, cur) {
    this.parent.clearGoatFromArray(prev);
    this.parent.updateGoat(cur);
  }

//   renderGoat(x, y) {

//           this.context.beginPath();
//           this.context.fillStyle = "blue";
//           this.context.strokeStyle = "gray";
//           this.context.rect(x, y, 10, 10);
//           this.context.fill();
//           this.context.closePath();

//   }
  /////////////////////////////////////////////////
  renderGoat(x, y) {
    // console.log("render");
    this.goat = {
      x: x,
      y: y,
      r: 20,
      isDragging: false
    };
    this.clear();
    this.draw();
  }

  draw() {
    this.clear();
    this.context.fillStyle = "blue";
    this.makeCircle(this.goat.x, this.goat.y, this.goat.r);
  }

  clear() {
    this.context.clearRect(
      this.goat.x,
      this.goat.y,
      this.goat.width,
      this.goat.height
    );
  }

  makeCircle(x, y, r) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI);
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.closePath();
  }

  selectGoat(mx, my) {
    //this event is called on mouse down

    this.prev = this.parent.getCurrentIndex();

    this.dragOk = true;
    this.goat.isDragging = true;

    this.startX = mx;
    this.startY = my;
    return true;
  } //end of checIfgoatSelected

  onMouseUp() {
    document.addEventListener(
      "mouseup",
      function(e) {
        e.preventDefault();
        e.stopPropagation();

        this.dragOk = false;
        this.goat.isDragging = false;

        this.clear();

        //check condition here and place goat then

        this.next = this.parent.calculateIndex(this.x, this.y);
        let dis = this.parent.calculateDistance(this.prev, this.next);

        if (dis > 0) {
          if (dis === 1 || dis === 2) {
            this.step = 1;

            this.moves = this.parent.findPossiblePath(this.prev, this.step);

            this.next = this.parent.calculateIndex(this.x, this.y);
            // let move = this.parent.findPossiblePath(prev, step);
            let issEmpty = this.parent.checkIfEmpty(this.next);

            let ifMatch = this.parent.findIfMatch(this.next, this.moves);

            let isPreviousGoat = this.parent.isPreviousGoat(this.prev);

            if (issEmpty && ifMatch && isPreviousGoat) {
              this.updateGoatInArray(this.prev, this.next);
              this.successMove = true;
            } else {
              console.log("not matched");
              this.successMove = false;
            }
          }
        }
      }.bind(this)
    );

    //  return this.successMove;
    return true;
  } // end of onMouseUp

  onMouseMove() {
    document.addEventListener(
      "mousemove",
      function(e) {
        if (this.dragOk) {
          this.clear();
          e.preventDefault();
          e.stopPropagation();

          this.x = e.x;
          this.y = e.y;

          this.x -= this.$canvas.offsetLeft;
          this.y -= this.$canvas.offsetTop;

          let dx = this.x - this.startX;
          let dy = this.y - this.startY;

          if (this.goat.isDragging) {
            this.goat.x += dx;
            this.goat.y += dy;
          }
          //  this.updategoatInArray();
          this.draw();

          this.startX = this.x;
          this.starty = this.y;
        }
      }.bind(this)
    );
  }
};//end of canvas class