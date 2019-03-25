function cameraConstructor(number, x=[0], y=[0], options){
    this.number = number;
    this.x = x;
    this.y = y;
    this.sizeMultiplier = 1;
    this.screenX = [0];
    this.screenY = [0];
    this.dimensions = [1200, 600];
    this.following = 0;
    if(options.sizeMultiplier){
        this.sizeMultiplier = options.sizeMultiplier;
    }
    if(options.screenX){
        this.screenX = options.screenX;
    }
    if(options.screenY){
        this.screenY = options.screenY;
    }
    if(options.dimensions){
        this.dimensions = options.dimensions;
    }
    if(options.following){
        this.following = options.following;
    }
    this.loop = function(){
        this.updatePos();
        this.boarder();
    }
    this.updatePos = function(){
        if(this.following-1 == -1){
            for(var i = 1; i < this.x.length; i++){
                this.x[i-1] += this.x[i];
            }
            for(var i = 1; i < this.y.length; i++){
                this.y[i-1] += this.y[i];
            }
        }
        else{
            this.x[0] = player[this.following-1].x[0] - this.dimensions[0]/2;
            this.y[0] = player[this.following-1].y[0] - this.dimensions[1]/2;
        }
    }
    this.onScreen = function(x, y, width, height){
        if(x + width > this.x[0] && x < this.x[0] + this.dimensions[0]/this.sizeMultiplier
        && y + height > this.y[0] - this.dimensions[1]/this.sizeMultiplier && y < this.y[0] + this.dimensions[1]/this.sizeMultiplier){
            return true;
        }
        return false;
    }
    this.boarder = function(){
        this.overlayRect(0, 0, this.dimensions[0], this.dimensions[1], {color: "black", fill: false})
    }
    this.drawCirc = function(x, y, radius, color="black"){
        if(this.onScreen(x-radius, y-radius, radius*2, radius*2)){
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.screenX[0], this.screenY[0], this.dimensions[0], this.dimensions[1]);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                gameArea.ctx.fillStyle=color;
                gameArea.ctx.arc(this.screenX[0]+this.sizeMultiplier*(x - this.x[0]), this.screenY[0]+this.sizeMultiplier*(y - this.y[0]), this.sizeMultiplier*radius, 0, 2*Math.PI);
                gameArea.ctx.fill();
            gameArea.ctx.restore();
        }
    }
    this.drawLine = function(startx, starty, endx, endy, color="black"){
        if(this.onScreen(startx, starty, endx-startx, endy-starty)){
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.screenX[0], this.screenY[0], this.dimensions[0], this.dimensions[1]);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                gameArea.ctx.strokeStyle=color;
                gameArea.ctx.moveTo(this.screenX[0]+this.sizeMultiplier*(startx - this.x[0]), this.screenY[0]+this.sizeMultiplier*(starty - this.y[0]));
                gameArea.ctx.lineTo(this.screenX[0]+this.sizeMultiplier*(endx - this.x[0]), this.screenY[0]+this.sizeMultiplier*(endy - this.y[0]));
                gameArea.ctx.stroke();
            gameArea.ctx.restore();
        }
    }
    this.drawText = function(x, y, text, color="black", textAlign="center"){ //Too much work to find width and height of text based on number of letters and font and everything. Not going to use this function too much, so it shouldn't matter if it's slightly inefficient
        gameArea.ctx.save();
            gameArea.ctx.beginPath();
            gameArea.ctx.rect(this.screenX[0], this.screenY[0], this.dimensions[0], this.dimensions[1]);
            gameArea.ctx.clip();

            gameArea.ctx.fillStyle = color;
            gameArea.ctx.textAlign = textAlign;
            gameArea.ctx.fillText(text, this.screenX[0]+this.sizeMultiplier*(x - this.x[0]), this.screenY[0]+this.sizeMultiplier*(y - this.y[0])); 
        gameArea.ctx.restore();
    }
    this.drawRect = function(x, y, width, height, options){
        color = "black";
        fill = false;
        if(options.color){
            color = options.color;
        }
        if(options.fill){
            fill = options.fill;
        }
        if(this.onScreen(x, y, width, height)){
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.screenX[0], this.screenY[0], this.dimensions[0], this.dimensions[1]);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                if(fill == true){
                    gameArea.ctx.fillStyle = color;
                    gameArea.ctx.fillRect(this.screenX[0]+this.sizeMultiplier*(x-this.x[0]), this.screenY[0]+this.sizeMultiplier*(y-this.y[0]), this.sizeMultiplier*width, this.sizeMultiplier*height, color);
                }
                else{
                    gameArea.ctx.strokeStyle = color;
                    gameArea.ctx.rect(this.screenX[0]+this.sizeMultiplier*(x-this.x[0]), this.screenY[0]+this.sizeMultiplier*(y-this.y[0]), this.sizeMultiplier*width, this.sizeMultiplier*height, color);
                    gameArea.ctx.stroke();
                }
            gameArea.ctx.restore();
        }
    }
    this.overlayLine = function(startx, starty, endx, endy, color="black"){
        
    }
    this.overlayRect = function(x, y, width, height, options){
        color = "black";
        fill = false;
        if(options.color){
            color = options.color;
        }
        if(options.fill){
            fill = options.fill;
        }
        gameArea.ctx.beginPath();
        if(fill){
            gameArea.ctx.fillStyle = color;
            gameArea.ctx.fillRect(this.screenX[0]+x, this.screenY[0]+y, width, height);
        }
        else{
            gameArea.ctx.strokeStyle = color;
            gameArea.ctx.rect(this.screenX[0]+x, this.screenY[0]+y, width, height);
            gameArea.ctx.stroke();
        }

    }
}