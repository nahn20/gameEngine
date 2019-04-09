// block[0] = new blockConstructor([0, 0], [100, 0], [200, 1], {color: "black"});
// block[1] = new blockConstructor([200, 0], [100, 0], [200, 1], {color: "blue", frictionCoefficient: 0.1});
// block[2] = new blockConstructor([400, 0], [22, 0], [20, 80], {color: "black"});
// block[3] = new blockConstructor([-3000, 0], [300, 0], [6000, 20], {color: "green"});
// block[4] = new blockConstructor([-3000, 0], [320, 0], [6000, 180], {color: "#654321"});
// block[5] = new blockConstructor([0, 0], [-20, 0], [600, 1], {color: "black"});
// block[6] = new blockConstructor([100, -3], [200, 0], [600, 10], {color: "blue", frictionCoefficient: 0.1});
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