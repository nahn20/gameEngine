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
                if(key == "x" || key == "o" || key == "w" || key == ">" || key == "<"){
                    var blockColor = "black";
                    var accelerator = [0, 0]
                    switch(key){
                        case "x":
                            blockColor = "black";
                            break;
                        case "o":
                            blockColor = "#654321";
                            break;
                        case "w":
                            blockColor = "white";
                            accelerator = [0, -11];
                            break;
                        case ">":
                            blockColor = "green";
                            accelerator = [5, 0];
                            break;
                        case "<":
                            blockColor = "yellow"
                            accelerator = [-5, 0];
                            break;

                    }
                    var miniX = x;

                    /*while(worldFile.map.charAt(x+1+y*worldFile.width) == key){
                        x++;
                        width++;
                    }*/
                    //permaToDraw.push({x: xPos+worldFile.blockSize, y: yPos, text: "Height: " + height, shape: "text"});
                    block.push(new blockConstructor([xPos, 0], [yPos, 0], [worldFile.blockSize*width, worldFile.blockSize*height], {color: blockColor, accelerator: accelerator}));
                }
                else if(key == "q"){
                    var nextKey = worldFile.map.charAt(x+1 + y*worldFile.width);
                    if(nextKey == 1){
                        player[0].x[0] = xPos; //Fix position things
                        player[0].y[0] = yPos - player[0].dimensions[1];
                    }
                    if(nextKey == 2){
                        player[1].x[0] = xPos;
                        player[1].y[0] = yPos - player[1].dimensions[1];
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