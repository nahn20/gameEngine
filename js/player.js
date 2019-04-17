function playerConstructor(playerNumber, x=[0, 0], y=[0, 0], options){
    this.playerNumber = playerNumber;
    this.x = x;
    this.y = y;
    this.xComponents = [[0], [0], [0]];
    this.yComponents = [[0], [0], [0]];
    this.dimensions = [16, 32];
    this.controls = [87, 65, 83, 68];
    this.color = "black";
    this.spawnpoint = [0, 0];
    this.fill = true;
    this.shape = "rectangle";
    this.standingOnFriction = [];
    this.animationState = 0;
    this.colorSpread = 0; //0 for no color spread, 1 for vertical spread, 2 for horizontal spread, 3 for both spread
    this.slimey = false;
    if(options.dimensions){
        this.dimensions = options.dimensions;
    }
    this.originalDimensions = [this.dimensions[0], this.dimensions[1]];
    if(options.controls){
        this.controls = options.controls;
    }
    if(options.color){
        this.color = options.color;
    }
    if(options.colorSpread){
        this.colorSpread = options.colorSpread;
    }
    if(options.slimey){
        this.slimey = options.slimey;
    }
    for(var i = 0; i < 3; i++){
        if(!this.x[i]){
            this.x[i] = 0;
        }
        if(!this.y[i]){
            this.y[i] = 0;
        }
    }
    this.loop = function(){
        this.useKeyboard();
        this.updatePos();
        collisionCheck(this); //updatePos must come before collisionCheck
        this.draw();
    }
    this.draw = function(){
        var head = {x: this.x.slice(0), y: this.y.slice(0), radius: this.dimensions[0]/2, shape: "circle", fill: this.fill, color: this.color};
        head.x[0] += this.dimensions[0]/2;
        head.y[0] += this.dimensions[0]/2-0.05*this.dimensions[0]*(this.animationState % 2);
        toDraw.push(head);

        if(this.x[1] < -0.1){
            var eye = {x: this.x.slice(0), y: this.y.slice(0), radius: this.dimensions[0]/12, shape: "circle", fill: this.fill, color: "white"};
            eye.x[0] += 0.2*this.dimensions[0];
            eye.y[0] += 0.38*this.dimensions[0]-0.075*this.dimensions[0]*(this.animationState % 2);
            toDraw.push(eye);
        }
        if(this.x[1] > 0.1){
            var eye = {x: this.x.slice(0), y: this.y.slice(0), radius: this.dimensions[0]/12, shape: "circle", fill: this.fill, color: "white"};
            eye.x[0] += 0.8*this.dimensions[0];
            eye.y[0] += 0.38*this.dimensions[0]-0.075*this.dimensions[0]*(this.animationState % 2);
            toDraw.push(eye);
        }
        if(this.x[1] > -0.1 && this.x[1] < 0.1){
            var eye1 = {x: this.x.slice(0), y: this.y.slice(0), radius: this.dimensions[0]/12, shape: "circle", fill: this.fill, color: "white"};
            eye1.x[0] += 0.72*this.dimensions[0];
            eye1.y[0] += 0.38*this.dimensions[0]-0.075*this.dimensions[0]*(this.animationState % 2);
            toDraw.push(eye1);

            var eye2 = {x: this.x.slice(0), y: this.y.slice(0), radius: this.dimensions[0]/12, shape: "circle", fill: this.fill, color: "white"};
            eye2.x[0] += 0.28*this.dimensions[0];
            eye2.y[0] += 0.38*this.dimensions[0]-0.075*this.dimensions[0]*(this.animationState % 2);
            toDraw.push(eye2);
        }
        var body = {x: this.x, y: this.y.slice(0), dimensions: [this.dimensions[0], this.dimensions[1]-this.dimensions[0]], shape: "rectangle", fill: this.fill, color: this.color};
        body.y[0] += this.dimensions[0];
        toDraw.push(body);
    }
    this.updateAnimation = function(){
        this.animationState++;
    }
    this.useKeyboard = function(){
        if(keyMap[this.controls[0]] && this.standingOnFriction[0]){
            this.yComponents[2].push(-15);
        }
        if(keyMap[this.controls[1]] && sumArray(this.xComponents[1]) > -5){
            this.xComponents[2].push(-1);
        }
        if(keyMap[this.controls[3]] && sumArray(this.xComponents[1]) < 5){
            this.xComponents[2].push(1);
        }
    }
    this.friction = function(){
        if(this.standingOnFriction[0] && !keyMap[this.controls[1]] && !keyMap[this.controls[3]]){
            var friction = largestNumOfArray(this.standingOnFriction);
            var veloc = sumArray(this.xComponents[1]);
            this.xComponents[2].push(-veloc*friction/10)
        }
    }
    this.updatePos = function(){
        this.yComponents[2].push(0.6); //Gravity
        this.friction();
        for(var i = this.xComponents.length-1; i >= 1; i--){
            this.xComponents[i-1][0] += sumArray(this.xComponents[i]);
            this.x[i] = sumArray(this.xComponents[i]);
        }
        this.x[0] += this.xComponents[0][0];
        for(var i = this.yComponents.length-1; i >= 1; i--){
            this.yComponents[i-1][0] += sumArray(this.yComponents[i]);
            this.y[i] = sumArray(this.yComponents[i]);
        }
        this.y[0] += this.yComponents[0][0];

        for(var i = 1; i < this.xComponents.length; i++){
            var temp = this.xComponents[i][0];
            this.xComponents[i] = [temp];
        }
        this.xComponents[0] = [0];
        for(var i = 1; i < this.yComponents.length; i++){
            var temp = this.yComponents[i][0];
            this.yComponents[i] = [temp];
        }
        this.yComponents[0] = [0];

        this.dimensions[0] += (this.originalDimensions[0]-this.dimensions[0])/8;
        this.dimensions[1] += (this.originalDimensions[1]-this.dimensions[1])/8;
    }
    this.die = function(){
        this.x = [this.spawnpoint[0]];
        this.y = [this.spawnpoint[1]];
        this.xComponents = [[0], [0], [0]];
        this.yComponents = [[0], [0], [0]];
    }
}