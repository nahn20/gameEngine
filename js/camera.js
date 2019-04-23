function cameraConstructor(number, x=[0], y=[0], options){
    this.number = number;
    this.x = x;
    this.y = y;
    this.sizeMultiplier = 1;
    this.screenX = [0];
    this.screenY = [0];
    this.dimensions = [1200, 600];
    this.following = 0;
    this.bounce = false;
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
    if(options.bounce){
        this.bounce = options.bounce; //0 = no bounce, 1 = velocity bounce, 2 = acceleration bounce, etc. -1 = all bounce
    }
    this.loop = function(){
        this.updatePos();
        this.drawAll();
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
            this.x[0] = player[this.following-1].x[0] - this.dimensions[0]/(2*this.sizeMultiplier);
            this.y[0] = player[this.following-1].y[0] - this.dimensions[1]/(2*this.sizeMultiplier);
        }
        this.screenX = derivativeIncrements(this.screenX);
        this.screenY = derivativeIncrements(this.screenY);
        this.doBounce();
    }
    this.doBounce = function(){
        if(this.bounce != 0){
            if(this.screenX[0] + this.dimensions[0] >= gameArea.dimensions[0] || this.screenX[0] <= 0){
                var len = this.bounce;
                if(this.bounce == -1){
                    len = this.screenX.length-1;
                }
                for(var i = 1; i <= len; i++){
                    this.screenX[i] = -this.screenX[i];
                }
            }
            if(this.screenY[0] + this.dimensions[1] >= gameArea.dimensions[1] || this.screenY[0] <= 0){
                var len = this.bounce;
                if(this.bounce == -1){
                    len = this.screenY.length-1;
                }
                for(var i = 1; i <= len; i++){
                    this.screenY[i] = -this.screenY[i];
                }
            }
        }
    }
    this.onScreen = function(x, y, width, height){
        if(x + width > this.x[0] && x < this.x[0] + this.dimensions[0]/this.sizeMultiplier
        && y + height > this.y[0] - this.dimensions[1]/this.sizeMultiplier && y < this.y[0] + this.dimensions[1]/this.sizeMultiplier){
            return true;
        }
        return false;
    }
    this.drawAll = function(){
        len = toDraw.length;
        for(var i = 0; i < len; i++){
            var obj = toDraw[i];
            switch(obj.shape){
                case "rectangle":
                    this.drawRects(obj);
                    break;
                case "circle":
                    this.drawCircles(obj);
                    break;
                case "text":
                    this.drawText(obj);
                    break;
                default:
                    console.log("Error: toDraw[" + i + "] does not have a defined shape.");
                    break;
            }
        }
        this.boarder();
        if(this.number != camera.length){
            for(var i = this.number+1; i < camera.length; i++){
                gameArea.ctx.clearRect(camera[i].screenX[0], camera[i].screenY[0], camera[i].dimensions[0], camera[i].dimensions[1]);
            }
        }
    }
    this.boarder = function(){
        this.overlayRect(0, 0, this.dimensions[0], this.dimensions[1], {color: "black", fill: false})
    }
    this.drawRects = function(obj){
        if(this.onScreen(obj.x[0], obj.y[0], obj.dimensions[0], obj.dimensions[1])){
            var color = "black";
            var fill = false;
            if(obj.color){
                color = obj.color;
            }
            if(obj.fill){
                fill = obj.fill;
            }
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.screenX[0], this.screenY[0], this.dimensions[0], this.dimensions[1]);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                if(fill == true){
                    gameArea.ctx.fillStyle = color;
                    gameArea.ctx.fillRect(this.screenX[0]+this.sizeMultiplier*(obj.x[0]-this.x[0]), this.screenY[0]+this.sizeMultiplier*(obj.y[0]-this.y[0]), this.sizeMultiplier*obj.dimensions[0], this.sizeMultiplier*obj.dimensions[1], color);
                }
                else{
                    gameArea.ctx.strokeStyle = color;
                    gameArea.ctx.rect(this.screenX[0]+this.sizeMultiplier*(obj.x[0]-this.x[0]), this.screenY[0]+this.sizeMultiplier*(obj.y[0]-this.y[0]), this.sizeMultiplier*obj.dimensions[0], this.sizeMultiplier*obj.dimensions[1], color);
                    gameArea.ctx.stroke();
                }
            gameArea.ctx.restore();
        }
    }
    this.drawCircles = function(obj){
        if(this.onScreen(obj.x[0]-obj.radius, obj.y[0]-obj.radius, obj.radius*2, obj.radius*2)){
            if(obj.color){
                color = obj.color;
            }
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.screenX[0], this.screenY[0], this.dimensions[0], this.dimensions[1]);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                gameArea.ctx.fillStyle=color;
                gameArea.ctx.arc(this.screenX[0]+this.sizeMultiplier*(obj.x[0] - this.x[0]), this.screenY[0]+this.sizeMultiplier*(obj.y[0] - this.y[0]), this.sizeMultiplier*obj.radius, 0, 2*Math.PI);
                gameArea.ctx.fill();
            gameArea.ctx.restore();
        }
    }
    this.drawLine = function(startx, starty, endx, endy, color="black"){ //To Convert
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
    this.drawText = function(obj){ //Too much work to find width and height of text based on number of letters and font and everything. Not going to use this function too much, so it shouldn't matter if it's slightly inefficient
        var text = "Filler Text";
        var textSize = 16;
        var color = "black";
        var textAlign = "center";
        if(obj.text){
            text = obj.text;
        }
        if(obj.textSize){
            textSize = obj.textSize;
        }
        if(obj.color){
            color = obj.color;
        }
        if(obj.textAlign){
            textAlign = obj.textAlign;
        }
        gameArea.ctx.save();
            gameArea.ctx.beginPath();
            gameArea.ctx.rect(this.screenX[0], this.screenY[0], this.dimensions[0], this.dimensions[1]);
            gameArea.ctx.clip();

            gameArea.ctx.fillStyle = color;
            gameArea.ctx.textAlign = textAlign;
            gameArea.ctx.font = this.sizeMultiplier*textSize + "px Arial";
            gameArea.ctx.fillText(text, this.screenX[0]+this.sizeMultiplier*(obj.x - this.x[0]), this.screenY[0]+this.sizeMultiplier*(obj.y - this.y[0])); 
        gameArea.ctx.restore();
    }
    this.overlayLine = function(startx, starty, endx, endy, color="black"){
        
    }
    this.overlayRect = function(x, y, width, height, options){ //To Convert
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