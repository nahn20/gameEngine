var player = [];
var camera = [];
var toDraw = [];
var permaToDraw = []; //Doesn't clear itself every cycle: be careful with this
var block = [];
var collision = []; //Array of all objects that have collision properties
var gameArea = {
    dimensions : [1200, 600],
    tick : 0,
    tickCounter : 0,
    startTime : (new Date()).getTime(),
    init : function(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.dimensions = [window.innerWidth, window.innerHeight];
        document.getElementById('canvas').width = this.dimensions[0];
        document.getElementById('canvas').height = this.dimensions[1];
    },
}
function startGame(){
    gameArea.init();
    gameArea.tick = setInterval(loop, 20);
    gameArea.animationTick = setInterval(updateAnimations, 400);
    player[0] = new playerConstructor(0, x=[20], y=[30], {dimensions: [20, 50], color: "red"});
    player[1] = new playerConstructor(1, x=[50], y=[30], {dimensions: [40, 80], color: "blue", controls: [73, 74, 75, 76]});
    createCameras();
    loadMap(testMap)
    spawnClouds();
}
function createCameras(){
    camera[0] = new cameraConstructor(0, x=[0], y=[0], {dimensions: [gameArea.dimensions[0]/2, gameArea.dimensions[1]/2], following: 1});
    camera[1] = new cameraConstructor(1, x=[0], y=[0], {screenX: [gameArea.dimensions[0]/2], screenY: [0], dimensions: [gameArea.dimensions[0]/2, gameArea.dimensions[1]/2], following: 2});
    camera[2] = new cameraConstructor(2, x = [0], y = [0], { screenX: [0], screenY: [gameArea.dimensions[1] / 2], dimensions: [gameArea.dimensions[0] / 2, gameArea.dimensions[1] / 2], sizeMultiplier: 0.4 });
    camera[3] = new cameraConstructor(3, x=[0], y=[0], {screenX: [gameArea.dimensions[0]/2], screenY: [gameArea.dimensions[1]/2], dimensions: [gameArea.dimensions[0]/2, gameArea.dimensions[1]/2], sizeMultiplier: 0.8});
    camera[4] = new cameraConstructor(4, x=[0], y=[-450], {screenX: [(5/12)*gameArea.dimensions[0], 0], screenY: [(5/12)*gameArea.dimensions[1], 0], dimensions: [gameArea.dimensions[0]/6, gameArea.dimensions[1]/6], sizeMultiplier: 0.1, bounce: true});
}
function loop(){
    toDraw = [];
    gameArea.ctx.clearRect(0, 0, gameArea.dimensions[0], gameArea.dimensions[1]);
    for(var i = 0; i < backgroundElements.length; i++){
        backgroundElements[i].loop();
    }
    gameArea.tickCounter++;
    for(var i = 0; i < permaToDraw.length; i++){
        toDraw.push(permaToDraw[i]);
    }
    //toDraw.push({x: 0, y: 100, text: "Average Tick: " + Math.round(10000*gameArea.tickCounter/((new Date()).getTime()-gameArea.startTime))/10000, shape: "text"});
    for(var i = 0; i < player.length; i++){
        player[i].loop();
    }
    var len = block.length;
    for(var i = 0; i < len; i++){
        block[i].loop();
    }
    for(var i = 0; i < camera.length; i++){ //Needs to go last for clean camera stuff
        camera[i].loop();
    }
}
function updateAnimations(){
    for(var i = 0; i < player.length; i++){
        player[i].updateAnimation();
    }
}
function resize(){
    gameArea.dimensions = [window.innerWidth, window.innerHeight];
    document.getElementById('canvas').width = gameArea.dimensions[0];
    document.getElementById('canvas').height = gameArea.dimensions[1];
    createCameras();
}
var keyMap = [];
document.addEventListener('keydown', function(event) {
    keyMap[event.keyCode] = true;
});
document.addEventListener('keyup', function(event) {
    keyMap[event.keyCode] = false;
});