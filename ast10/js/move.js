        // let canvas = document.getElementById("canvas");
        // let ctx = canvas.getContext("2d");

        // let canvasOffset = $("#canvas").offset();
        // let offsetX = canvasOffset.left;
        // let offsetY = canvasOffset.top;

        // animation letiables
        // let currentX = 10;
        // let currentY = 10;
        // let frameCount = 60;
        // let timer;
        // let points;
        // let currentFrame;

        'use strick'

        class Move{
            constructor(props){
                this.$canvas = props.$canvas;
                this.context = props.context;

                this.offSet = props.offSet || 30;
                this.frameCount = props.frameCount || 60;

                this.currentX = props.currentX || null;
                this.currentY = props.currentY || null;

                this.boxHeight = props.boxHeight;
                this.boxWidth = props.boxWidth;

                this.timer = null;
                this.points;
                this.currentFrame = null;


                this.getAccurateXY(this.currentX,this.currentY);
                // this.point= {}
                
                // this.handleMouseDown();
                // this.draw(this.currentX,this.currentY);
            }
            getAccurateXY(x,y){
                if (x < this.offSet || x > (this.boxWidth + this.offSet)) {
                    this.currentX = null;
                }
                else if (y < this.offSet || y > (this.boxHeight + this.offSet)) {
                    this.currentY = null;
                } else {
                    console.log('xy',x,y);
                    this.currentX = Math.round(x/10)*10; //for rounding off to nearest 
                    this.currentY = Math.round(y/10)*10; //for rounding off to nearest 
                }
                console.log(this.currentX,this.currentY);
            }//end of getAccurateXY

            animate() {
                let point = this.points[this.currentFrame++];
                draw(point.x, point.y);

                // refire the timer until out-of-points
                if (this.currentFrame < this.points.length) {
                    this.timer = setTimeout(this.animate, 1000 / 60);
                }
            }//end of animate 

            handleMouseDown() {
                this.currentFrame = 0;
                this.points = linePoints(this.currentX, this.currentY, this.mouseX, this.mouseY, this.frameCount);
                this.currentY = this.mouseY;
                this.currentX = this.mouseX;
                
                animate();
            }//end of handleMouseDown

            linePoints(x1, y1, x2, y2, frames) {
                let dx = x2 - x1;
                let dy = y2 - y1;

                let length = Math.sqrt(dx * dx + dy * dy);

                let incrementX = dx / frames;
                let incrementY = dy / frames;

                let a = new Array();

                a.push({
                    x: x1,
                    y: y1
                });

                for (let frame = 0; frame < frames - 1; frame++) {
                    a.push({
                        x: x1 + (incrementX * frame),
                        y: y1 + (incrementY * frame)
                    });
                }

                a.push({
                    x: x2,
                    y: y2
                });
                return (a);
            }//end of line points

            draw(x, y) {
                ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
                ctx.beginPath();
                ctx.fillStyle = "skyblue";
                ctx.strokeStyle = "gray";
                ctx.rect(x, y, 10, 10);
                ctx.fill();
                ctx.stroke();
            }

        }//end of move class


        // function animate() {
        //     let point = points[currentFrame++];
        //     draw(point.x, point.y);

        //     // refire the timer until out-of-points
        //     if (currentFrame < points.length) {
        //         timer = setTimeout(animate, 1000 / 60);
        //     }
        // }

        // function linePoints(x1, y1, x2, y2, frames) {
        //     let dx = x2 - x1;
        //     let dy = y2 - y1;

        //     let length = Math.sqrt(dx * dx + dy * dy);

        //     let incrementX = dx / frames;
        //     let incrementY = dy / frames;

        //     let a = new Array();

        //     a.push({
        //         x: x1,
        //         y: y1
        //     });

        //     for (let frame = 0; frame < frames - 1; frame++) {
        //         a.push({
        //             x: x1 + (incrementX * frame),
        //             y: y1 + (incrementY * frame)
        //         });
        //     }

        //     a.push({
        //         x: x2,
        //         y: y2
        //     });
        //     return (a);
        // }

        // function draw(x, y) {
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     ctx.beginPath();
        //     ctx.fillStyle = "skyblue";
        //     ctx.strokeStyle = "gray";
        //     ctx.rect(x, y, 10, 10);
        //     ctx.fill();
        //     ctx.stroke();
        // }

        // function handleMouseDown(e) {
        //     mouseX = parseInt(e.clientX - offsetX);
        //     mouseY = parseInt(e.clientY - offsetY);
        //     $("#downlog").html("Down: " + mouseX + " / " + mouseY);

        //     // Put your mousedown stuff here
        //     points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
        //     currentFrame = 0;
        //     currentX = mouseX;
        //     currentY = mouseY;
        //     animate();
        // }

        // $("#canvas").mousedown(function (e) {
        //     handleMouseDown(e);
        // });

        // draw(10, 10);