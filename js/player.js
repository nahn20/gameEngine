function playerConstructor(number, x=[0], y=[0], options){
    this.number = number;
    this.x = x;
    this.y = y;
    this.dimensions = [16, 32];
    this.controls = [87, 65, 83, 68];
    this.color = "black";
    this.fill = true;
    if(options.dimensions){
        this.dimensions = options.dimensions;
    }
    if(options.controls){
        this.controls = options.controls;
    }
    if(options.color){
        this.color = options.color;
    }
    this.loop = function(){
        this.useKeyboard();
        this.updatePos();
        toDraw.push(this);
    }
    this.useKeyboard = function(){
        if(keyMap[this.controls[0]]){
            this.y[0] -= 3;
        }
        if(keyMap[this.controls[1]]){
            this.x[0] -= 3;
        }
        if(keyMap[this.controls[2]]){
            this.y[0] += 3;
        }
        if(keyMap[this.controls[3]]){
            this.x[0] += 3;
        }
    }
    this.updatePos = function(){
        for(var i = 1; i < this.x.length; i++){
            this.x[i-1] += this.x[i];
        }
        for(var i = 1; i < this.y.length; i++){
            this.y[i-1] += this.y[i];
        }

    }
    this.draw = function(){
        for(var i = 0; i < camera.length; i++){
            camera[i].drawRect(this.x[0], this.y[0], this.dimensions[0], this.dimensions[1], {color: this.color, fill: true}); //Todo: options into {}
        }
    }
}