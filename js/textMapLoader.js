//Builds a map based on text template
function loadMap(worldFile){
    var y = 0;
    var n = false;
    do{
        for(x = 0; x < worldFile.width && !n; x++){
            var key = worldFile.map.charAt(x + y*worldFile.width);
            if(key != " " && !(key <= 9 || key >= 1)){
                var xPos = worldFile.startX+x*worldFile.blockSize;
                var yPos = worldFile.startY+140 - worldFile.blockSize*worldFile.height + y*worldFile.blockSize;
                var width = 1;
                var height = 1;
                if(key == "x" || key == "o" || key == "w" || key == "W" || key == ">" || key == "<" || key == "u" || key == "d"){
                    var blockColor = "black";
                    var accelerator = [0, 0]
                    var frictionCoefficient = 3;
                    var doKill = false;
                    switch(key){
                        case "x":
                            blockColor = "black";
                            break;
                        case "o":
                            blockColor = "#654321";
                            break;
                        case "w":
                            blockColor = "yellow";
                            accelerator = [0, -11];
                            frictionCoefficient = 0.1;
                            break;
                        case "W":
                            blockColor = "orange";
                            accelerator = [0, -30];
                            frictionCoefficient = .1;
                            break;
                        case ">":
                            blockColor = "green";
                            accelerator = [5, 0];
                            break;
                        case "<":
                            blockColor = "purple"
                            accelerator = [-5, 0];
                            break;
                        case "u":
                            blockColor = "#e6ffff";
                            frictionCoefficient = 0.1;
                            break;
                        case "d":
                            blockColor = "red";
                            doKill = true;
                            break;
                    }
                    var miniX = x;

                    while(worldFile.map.charAt(x+1+y*worldFile.width) == key){
                        x++;
                        width++;
                    }
                    //permaToDraw.push({x: xPos+worldFile.blockSize, y: yPos, text: "Height: " + height, shape: "text"});
                    block.push(new blockConstructor([xPos, 0], [yPos, 0], [worldFile.blockSize*width, worldFile.blockSize*height], {color: blockColor, accelerator: accelerator, frictionCoefficient: frictionCoefficient, doKill: doKill}));
                }
                else if(key == "-"){
                    backgroundElements.push(new fakeBlock([xPos, 0], [yPos, 0], [worldFile.blockSize*width, worldFile.blockSize*height], {color: "red"}));
                }
                else if(key == "q"){
                    var nextKey = worldFile.map.charAt(x+1 + y*worldFile.width);
                    var playNo = nextKey-1;
                    if(!isNaN(nextKey) && player[playNo]){
                        player[playNo].x[0] = xPos; //Fix position things
                        player[playNo].y[0] = yPos - player[playNo].dimensions[1];
                        player[playNo].spawnpoint = [player[playNo].x[0], player[playNo].y[0]];
                    }
                    else{
                        console.log("q used incorrectly! Please add player number")
                    }
                }
                else if(key == "n"){
                    n = true;
                }
                else{
                    console.log("Unregistered Character " + key + " attempted to be read in textworldFile.mapLoader.js at (" + x + ", " + y + ")");
                }
            }
        }
        y++;
    }
    while(!n);
}