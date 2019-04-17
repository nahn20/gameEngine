function blockConstructor(x=[0, 0], y=[0, 0], dimensions=[10, 10], options){
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.shape = "rectangle";
    this.color = "black";
    this.fill = true;
    this.toDeleteFromBlocks = false;
    this.collision = true;
    this.frictionCoefficient = 3;
    this.resetToColor = true;
    this.accelerator = [0, 0]; //Gives things velocity. Note: only works on player
    this.doKill = false;
    if(options.color){
        this.color = options.color;
    }
    this.originalColor = this.color;
    if(options.fill){
        this.fill = options.fill;
    }
    if(options.collision){
        this.collision = options.collision;
    }
    if(options.frictionCoefficient){
        this.frictionCoefficient = options.frictionCoefficient;
    }
    if(options.resetToColor){
        this.resetToColor = options.resetToColor;
    }
    if(options.accelerator){
        this.accelerator = options.accelerator;
    }
    if(options.doKill){
        this.doKill = options.doKill;
    }
    addToBlocks(this);
    if(this.collision){
        addToCollision(this);
    }
    this.loop = function(){
        this.updatePos();
        toDraw.push(this);
        if(this.resetToColor){
            this.color = this.originalColor; //Needs to come after toDraw so it can be updated if need be
        }
    }
    this.updatePos = function(){
        this.x = derivativeIncrements(this.x);
        this.y = derivativeIncrements(this.y);
    }
}