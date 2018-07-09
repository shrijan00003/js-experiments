// 'use strick'
class Game {
  constructor(props) {
    this.renderGame = this.renderGame.bind(this);
    this.$canvas = props.$canvas;
    this.context = props.context;
    this.ctx = props.$ctx;

    // console.log(this.context);

    this.boxWidth = props.boxWidth;
    this.boxHeight = props.boxHeight;

    this.pBox = props.pBox;

    this.width = 150;

    this.handle = null;

    this.goatReady = 20;

    this.goatInCanvas = 0;
    this.isGoatLeft = true;
    this.goatEaten = 0;

    this.xIndex = null;
    this.yIndex = null;

    this.gameArray = [
      ["T", 0, 0, 0, "T"],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      ["T", 0, 0, 0, "T"]
    ];

    this.tileMap = [
      [1, 5, 9, 5, 2],
      [7, 14, 13, 14, 8],
      [10, 13, 14, 13, 12],
      [7, 14, 13, 14, 8],
      [3, 6, 11, 6, 4]
    ];

    this.goats = [];
    this.tigers = [];

    this.tiger = null;
    this.goat = null;
    this.canvas = null;

    this.createTiger();
    // this.createGoat();
    this.createCanvas();

    // this.drawPlayGround();

    this.renderGame();
  } //end of constructor

  /**
   * @function    GETTER
   */
  getGoatReady() {
    return this.goatReady;
  }

  getXIndex() {
    return this.xIndex;
  }

  getYIndex() {
    return this.yIndex;
  }

  getGoatInCanvas() {
    return this.goatInCanvas;
  }

  getGoatEaten() {
    return this.goatEaten;
  }

  getCurrentIndex() {
    return {
      x: this.xIndex,
      y: this.yIndex
    };
  }

  getCurrentCoordinate() {
    return {
      x: this.xOrdinate,
      y: this.yOrdinate
    };
  }

  isPointIndexValid() {
    if (
      this.xIndex >= 0 &&
      this.xIndex < 5 &&
      (this.yIndex >= 0 && this.yIndex <= 5)
    ) {
      if (this.gameArray[this.xIndex][this.yIndex] === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * @function    CREATER
   */
  createTiger() {
    // console.log(     'here');
    if (!(this.tigers.length > 4)) {
      this.tiger = new Tiger({
        $canvas: this.$canvas,
        context: this.context,
        ctx: this.ctx,
        parent: this
      });
    }
    this.tigers.push(this.tiger);
    // console.log(this.tiger);
  }

  createGoat() {
    this.goat = new Goat({
      $canvas: this.$canvas,
      context: this.context,
      parent: this,
      xIndex: this.xIndex,
      yIndex: this.yIndex,
    });

    this.goats.push(this.goat);
    this.goatInCanvas += 1;
    return true;
    // console.log("in game",this.goatReady);
  }

  createCanvas() {
    this.canvas = new Canvas({
      $canvas: this.$canvas,
      context: this.context,

      boxWidth: this.boxWidth,
      boxHeight: this.boxHeight,

      pBox: this.pBox
    });
  }

  /**
   * @param NULL
   * @function MAIN GAME LOOP
   */
  renderGame() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.canvas.drawPlayGround();
    this.canvas.drawText();

    this.updateGoatAndTiger();
    if(isGameOver === false){
      this.handle = requestAnimationFrame(this.renderGame);
    }
  } //end of render

  /**
   * @function CALCULATE
   */

  calculateIndex(x, y) {
    if (x < this.pBox || x > this.boxWidth + this.pBox) {
      this.xIndex = null;
      this.xOrdinate = null;
      return false;
    } else if (y < this.pBox || y > this.boxHeight + this.pBox) {
      this.yIndex = null;
      this.yOrdiante = null;
      return false;
    } else {
      // this.xOrdinate = x;
      // this.yOrdiante = y;
      this.xIndex = this.makeRoundOff((y - this.pBox) / this.width);
      this.yIndex = this.makeRoundOff((x - this.pBox) / this.width);

      // console.log(this.xIndex , this.yIndex);

      this.calculateExactCoordinate(this.xIndex, this.yIndex); //for placing in exact location

      let index = {
        x: this.xIndex,
        y: this.yIndex
      };

      return index;
    }
  } //end of calculateIndex

  /**
   * @param {X} DECIMAL_NUMBER
   *
   */
  makeRoundOff(x) {
    if (x % 1 > 0.5) {
      return Math.abs(Math.ceil(x));
    } else {
      return Math.abs(Math.floor(x));
    }
  } //end make RoundOff

  /**
   * @function updateGoatAndTiger
   * @param null
   *
   */
  updateGoatAndTiger() {
    for (let i = 0; i < this.gameArray.length; i++) {
      for (let j = 0; j < this.gameArray[0].length; j++) {
        if (this.gameArray[i][j] === "T") {
          this.tiger.renderTiger(
            j * this.width + this.pBox,// - 5,
            i * this.width + this.pBox,// - 5
          );
        }
        if (this.gameArray[i][j] === "G") {
          this.goat.renderGoat(
            j * this.width + this.pBox,// - 5,
            i * this.width + this.pBox,// - 5
          );
        }
      }
    }
  } //end of updateGoatAnd Tiger

  /**
   * @param {NULL}
   * @description UPDATING goatReady VARIABLE
   */
  updateGoatReady() {
    this.goatReady -= 1;

    //this is to prevent goat ready to -1
    if (this.goatReady < 0) {
      this.goatReady = 0;
    }
  }

  /**
   * @function moveGoatIfPossible
   * @param {NULL}
   */
  moveGoatIfPossible() {
    let test = this.goat.selectGoat(this.xOrdinate, this.yOrdinate);
    if (test) {
      this.goat.onMouseMove();
      let success = this.goat.onMouseUp();

      if (success) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } //moveGoatIfPossible

  /**
   * @param {NULL}
   * @description FINDING POSSIBLE MOVE AND MOVE THE TIGER ACCORDINGLY
   */
  moveTigerIfPossible() {
    let test = this.tiger.selectTiger(this.xOrdinate, this.yOrdinate);
    if (test) {
      this.tiger.onMouseMove();
      let success = this.tiger.onMouseUp();

      if (success) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

    //get the desired index with its coordinate   (extact)
  } //end of Move Tiger If Possible

  /**
   *
   * @param {ELEMENT} xIndex
   * @param {ELEMENT} yIndex
   * @description FOR FINDING EXACT COORDINATE ACCORDING TO INDEX
   */
  calculateExactCoordinate(xIndex, yIndex) {
    this.xOrdinate = yIndex * this.width + this.pBox;// - 5;
    this.yOrdinate = xIndex * this.width + this.pBox;// - 5;
  }

  /**
   * @param {OBJ} OBJ
   * @description FUNCTION TO CLEAR TIGER FROM ARRAY AND CANVAS
   */
  clearTigerFromArray(obj) {
    this.calculateExactCoordinate(obj.x, obj.y);

    if (this.gameArray[obj.x][obj.y] === "T") {
      this.ctx.clearRect(this.xOrdinate, this.yOrdinate, 10, 10);
      this.gameArray[obj.x][obj.y] = 0;
    }
  }

  /**
   * @param {OBJ} CUR
   * @description FOR UPDATING TIGER IN ARRAY
   */
  updateTiger(cur) {
    this.gameArray[cur.x][cur.y] = "T";
  }

  /**
   * @param {OBJ} CUR
   * @description FOR UPDATING GOAT IN ARRAY
   */
  updateGoat(cur) {
    this.gameArray[cur.x][cur.y] = "G";
  }

  /**
   *
   * @param {OBJ} obj1
   * @param {OBJ} obj2
   * @description FOR CALCULATING DISTANCE BETWEEN TWO INDEX
   */
  calculateDistance(obj1, obj2) {
    if (
      obj1.x === null ||
      obj1.y === null ||
      obj2.x === null ||
      obj2.y === null
    ) {
      return 0;
    } else {
      return this.squareOf(obj2.x - obj1.x) + this.squareOf(obj2.y - obj1.y);
    }
  } //end of calculate Distance funciton

  squareOf(x) {
    return x * x;
  }

  /**
   * @param {OBJ | OBJ}
   * @description FINDING MID POINT OF TWO INDEX
   */
  midPointOf(obj1, obj2) {
    return {
      x: (obj1.x + obj2.x) / 2,
      y: (obj1.y + obj2.y) / 2
    };
  }

  /**
   *
   * @param {OBJ} obj
   * @description FOR FINDING WHETHER THE INDEX IS EMPTY OR NOT
   */
  checkIfEmpty(obj) {
    if (this.gameArray[obj.x][obj.y] === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * @param {OBJ} cur
   * @description FOR FINDING POSSIBLE PATH FOR SINGLE STEP
   * @augments {PRE ,STEP}
   *
   */
  findPossiblePath(pre, step = 1) {
    let tileVal = this.tileMap[pre.x][pre.y];

    let moves = [];
    let dx, dy;
    if (step === 1) {
      dx = 1;
      dy = 1;
    }
    if (step === 2) {
      dx = 2;
      dy = 2;
    }

    if (tileVal === 1) {
      moves = [
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        },
        {
          //RB
          x: pre.x + dx,
          y: pre.y + dy
        }
      ];
    } //if 1

    if (tileVal === 2) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        },
        {
          //LB
          x: pre.x + dx,
          y: pre.y - dy
        }
      ];
    } //end of two

    if (tileVal === 3) {
      moves = [
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //RT
          x: pre.x - dx,
          y: pre.y + dy
        }
      ];
    } // end of 3

    if (tileVal === 4) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //LT
          x: pre.x - dx,
          y: pre.y - dy
        }
      ];
    } //end of 4

    if (tileVal === 5) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        }
      ];
    } // end of 5

    if (tileVal === 6) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        }
      ];
    }

    if (tileVal === 7) {
      moves = [
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        }
      ];
    } //end of 7

    if (tileVal === 8) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        }
      ];
    } // end of 8
    if (tileVal === 9) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        },
        {
          //LB
          x: pre.x + dx,
          y: pre.y - dy
        },
        {
          //RB
          x: pre.x + dx,
          y: pre.y + dy
        }
      ];
    } //end of 9

    if (tileVal === 10) {
      moves = [
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        },
        {
          //RT
          x: pre.x - dx,
          y: pre.y + dy
        },
        {
          //RB
          x: pre.x + dx,
          y: pre.y + dy
        }
      ];
    } //end of 10

    if (tileVal === 11) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //LT
          x: pre.x - dx,
          y: pre.y - dy
        },
        {
          //RT
          x: pre.x - dx,
          y: pre.y + dy
        }
      ];
    } // end of 11

    if (tileVal === 12) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        },
        {
          //LT
          x: pre.x - dx,
          y: pre.y - dy
        },
        {
          //LB
          x: pre.x + dx,
          y: pre.y - dy
        }
      ];
    }

    if (tileVal === 13) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        }
      ];
    } // end of 13

    if (tileVal === 14) {
      moves = [
        {
          //L
          x: pre.x,
          y: pre.y - dy
        },
        {
          //R
          x: pre.x,
          y: pre.y + dy
        },
        {
          //T
          x: pre.x - dx,
          y: pre.y
        },
        {
          //B
          x: pre.x + dx,
          y: pre.y
        },
        {
          //LT
          x: pre.x - dx,
          y: pre.y - dy
        },
        {
          //RT
          x: pre.x - dx,
          y: pre.y + dy
        },
        {
          //LB
          x: pre.x + dx,
          y: pre.y - dy
        },
        {
          //RB
          x: pre.x + dx,
          y: pre.y + dy
        }
      ];
    }

    return moves;
  }

  /**
   * @param {next ,moves}
   * @description FUNCTION TO CHECK IF NEXT INDEX MATCH THE POSSIBLE MOVE ARRAY
   */
  findIfMatch(next, moves) {
    let isTrue = false;
    for (let i = 0; i < moves.length; i++) {
      if (next.x === moves[i].x && next.y === moves[i].y) {
        // console.log("matches in move array")
        isTrue = true;
        break;
      } else {
        isTrue = false;
      }
    }

    return isTrue;
  }

  /**
   *
   * @param {obj} pre
   * @description FINDING IF PREVIOUS WAS TIGER FOR MOVE
   */
  isPreviousTiger(pre) {
    if (this.gameArray[pre.x][pre.y] === "T") {
      return true;
    } else {
      return false;
    }
  } // end of isPreviousTiger

  /**
   *
   * @param {OBJ} mid
   * @description IF MIDDLE INDEX HAVE GOAT
   * @returns BOOLEAN VALUE
   */
  findIsMiddleIndexHaveGoat(mid) {
    if (this.gameArray[mid.x][mid.y] === "G") {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param obj
   * @function updateGoatInArray
   * @description for updating goat in array and other number in case of eaten
   */
  updateGoatInArray(obj) {
    this.calculateExactCoordinate(obj.x, obj.y);

    if (this.gameArray[obj.x][obj.y] === "G") {
      this.ctx.clearRect(this.xOrdinate, this.yOrdinate, 10, 10);
      this.gameArray[obj.x][obj.y] = 0;

      //decrease the goatIncanvas
      this.goatInCanvas -= 1;

      //increase goat eaten

      this.goatEaten += 1;
    }
  } //end of updateGoatInArray

  /**
   * @param {obj} prev
   */
  isPreviousGoat(obj) {
    if (this.gameArray[obj.x][obj.y] === "G") {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param {obj}
   * @description CLEARING CANVAS WHILE MOVING GOAT
   */
  clearGoatFromArray(obj) {
    this.calculateExactCoordinate(obj.x, obj.y);

    if (this.gameArray[obj.x][obj.y] === "G") {
      this.ctx.clearRect(this.xOrdinate, this.yOrdinate, 10, 10);
      this.gameArray[obj.x][obj.y] = 0;
    }
  }
};//end of game class
