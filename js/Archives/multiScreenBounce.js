//main.js/startGame()
for(var i = 0; i < 100; i++){
    var xCell = i % 10;
    var yCell = Math.floor(i/10);
    camera[i] = new cameraConstructor(i, x=[0], y=[0], {dimensions: [120, 60], screenX: [xCell*120, 10], screenY: [yCell*60, 0], sizeMultiplier: 10/i, bounce: 1});
}
camera.push(new cameraConstructor(camera.length, x=[0], y=[0], {screenX: [300, 7], screenY: [150, 3], dimensions: [200, 100], bounce: 1}));