var player = [];
var camera = [];
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
    player[0] = new playerConstructor(0, x=[20], y=[30], {dimensions: [20, 30], color: "red"});
    player[1] = new playerConstructor(1, x=[25], y=[30], {dimensions: [20, 30], color: "blue", controls: [73, 74, 75, 76]});
    camera[0] = new cameraConstructor(0, x=[0], y=[0], {dimensions: [600, 300], following: 0});
    camera[1] = new cameraConstructor(1, x=[0], y=[0], {screenX: [600], screenY: [0], dimensions: [600, 300], following: 1});
    camera[2] = new cameraConstructor(2, x=[0], y=[0], {screenX: [0], screenY: [300], dimensions: [600, 300]});
    camera[3] = new cameraConstructor(3, x=[0], y=[0], {screenX: [600], screenY: [300], dimensions: [600, 300], sizeMultiplier: 0.5});
    //camera[4] = new cameraConstructor(4, x=[0], y=[0], {screenX: [300], screenY: [150], dimensions: [600, 300]});
}
function loop(){
    gameArea.ctx.clearRect(0, 0, gameArea.dimensions[0], gameArea.dimensions[1]);
    for(var i = 0; i < player.length; i++){
        player[i].loop();
    }
    for(var i = 0; i < camera.length; i++){ //Needs to go last for clean camera stuff
        camera[i].loop();
    }
}
var keyMap = [];
document.addEventListener('keydown', function(event) {
    keyMap[event.keyCode] = true;
});
document.addEventListener('keyup', function(event) {
    keyMap[event.keyCode] = false;
});