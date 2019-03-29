var player = [];
var camera = [];
var toDraw = [];
var block = [];
var collision = []; //Array of all objects that have collision properties
var gameArea = {
    dimensions : [1200, 600],
    tick : 0,
    init : function(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    },
}
function startGame(dimensions=[1200, 600]){
    gameArea.init();
    gameArea.dimensions = dimensions;
    gameArea.tick = setInterval(loop, 20);
    gameArea.animationTick = setInterval(updateAnimations, 400);
    player[0] = new playerConstructor(0, x=[20], y=[30], {dimensions: [20, 50], color: "red"});
    player[1] = new playerConstructor(1, x=[50], y=[30], {dimensions: [80, 160], color: "blue", controls: [73, 74, 75, 76]});
    camera[0] = new cameraConstructor(0, x=[0], y=[0], {dimensions: [600, 300], following: 1});
    camera[1] = new cameraConstructor(1, x=[0], y=[0], {screenX: [600], screenY: [0], dimensions: [600, 300], following: 2});
    camera[2] = new cameraConstructor(2, x=[100], y=[300], {screenX: [0], screenY: [300], dimensions: [600, 300], sizeMultiplier: 2});
    camera[3] = new cameraConstructor(3, x=[-100], y=[-100], {screenX: [600], screenY: [300], dimensions: [600, 300], sizeMultiplier: 0.5});
}
function loop(){
    toDraw = [];
    gameArea.ctx.clearRect(0, 0, gameArea.dimensions[0], gameArea.dimensions[1]);
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
var keyMap = [];
document.addEventListener('keydown', function(event) {
    keyMap[event.keyCode] = true;
});
document.addEventListener('keyup', function(event) {
    keyMap[event.keyCode] = false;
});