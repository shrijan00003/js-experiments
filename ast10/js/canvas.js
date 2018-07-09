'use strick'
class Canvas {

    constructor(props) {
        // this.drawPlayGround =   this.drawPlayGround.bind(this);
        
        this.$canvas = props.$canvas;
        this.context    =   props.context;
        
        this.boxWidth   =  props.boxWidth;
        this.boxHeight  =  props.boxHeight;
        
        this.pBox   =   props.pBox;

        this.width   =   150;


        this.x = null;
        this.y = null;
        
        this.drawPlayGround();   
        this.drawText();  
        // this.drawDiagonal();   
    }

    drawPlayGround() {
        // console.log(this.gameArray);


        //pbox acts as margin left in this loop 
        for (let x = 0; x <= this.boxWidth; x += 150) {
            this.context.moveTo(0.5 + x + this.pBox, this.pBox);
            this.context.lineTo(0.5 + x + this.pBox, this.boxHeight + this.pBox);
            // console.log(0.5 + x + this.pBox, this.boxHeight + this.pBox);
        }


        for (let x = 0; x <= this.boxHeight; x += 150) {
            this.context.moveTo(this.pBox, 0.5 + x + this.pBox);
            this.context.lineTo(this.boxWidth + this.pBox, 0.5 + x + this.pBox);
            // console.log(this.boxWidth + this.pBox, 0.5 + x + this.pBox);
        }

        //draw left to right diagonal
        this.context.moveTo(this.pBox + 0.5,this.pBox);
        this.context.lineTo(this.boxHeight + this.pBox, this.boxHeight + this.pBox);

        //draw right to left diagonal
        this.context.moveTo(this.pBox + 0.5, this.boxHeight + this.pBox);
        this.context.lineTo(this.boxWidth + this.pBox , this.pBox + 0.5);
        
        //getting variable for making diagonal 
        let maxVal = this.boxHeight + this.pBox; //since height and width is same
        let minVal  = this.pBox;
        //first line left to right top
        this.context.moveTo(minVal + 0.5, (minVal + maxVal)/2);
        this.context.lineTo((minVal + maxVal) / 2, minVal + 0.5) ;
        
        //second botth to right middle
        this.context.moveTo((minVal + maxVal) / 2, maxVal);
        this.context.lineTo(maxVal, (minVal + maxVal) / 2) ;
        //left middle to bottom middle
        this.context.moveTo(minVal + 0.5, (minVal + maxVal)/2);
        this.context.lineTo((minVal + maxVal) / 2, maxVal);
        
        //middle top to right middle
        this.context.lineTo((minVal + maxVal) / 2, minVal + 0.5) ;
        this.context.lineTo(maxVal, (minVal + maxVal) / 2) ;


        
        this.context.strokeStyle = "black";
        this.context.stroke();
    };//end of drawPlayGround
    
    drawText(){
        this.context.beginPath();
        this.context.font = '48px serif';
        this.context.textAlign ='center';
        this.context.fillStyle = 'blue';
        this.context.fillText('THE BAAG CHAAL ', 1200, 200);
        this.context.fillStyle = 'purple';
        this.context.fillText('TURN : ' + (turn ===1 ? 'Goat' : 'Tiger'), 1200, 250);
        
        this.context.fillStyle = 'darkred';
        this.context.fillText('Message : '+ msg, 1200, 300);
        
        this.context.fillStyle = 'black';
        
        this.context.fillStyle = 'darkred';
        this.context.fillText(gameOverMsg, 1200, 800);
        
        this.context.closePath();
    }

};//end of canvas class

