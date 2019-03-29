var backgroundElements = [];
function cloud(x, y, options){
    this.x = x;
    this.y = y;
    this.circleCoords = [];
    this.dimensions = [300, 100];
    this.circleCount = 10;
    if(options.dimensions){
        this.dimensions = options.dimensions;
    }
    if(options.circleCount){
        this.circleCount = options.circleCount;
    }
    for(var i = 0; i < this.circleCount; i++){
        var x = Math.round(Math.random()*this.dimensions[0]);
        var y = Math.round(Math.random()*this.dimensions[1]);
        var radius = Math.round((0.2+Math.random())*this.dimensions[1]);
        this.circleCoords.push({x: [this.x[0]+x], y: [this.y[0]+y], radius: radius, color: "white", shape: "circle"})
    }

    this.loop = function(){
        this.updatePos();
        for(var i = 0; i < this.circleCount; i++){
            toDraw.push(this.circleCoords[i]);
            console.log(this.circleCoords[i])
        }
    }
    this.updatePos = function(){
        this.x = derivativeIncrements(this.x);
        this.y = derivativeIncrements(this.y);
    }
}
function spawnClouds(){
    for(var i = 0; i < 10; i++){
        var x = -5000+1500*i*(0.5+Math.random()/4);
        var y = Math.round(-200+300*(Math.random()-0.5));
        backgroundElements.push(new cloud([x], [y], {}));
    }
}