function derivativeIncrements(derivatives){
    var tempDeriv = derivatives.slice(0);
    var len = tempDeriv.length;
    for(var i = 1; i < len; i++){
        tempDeriv[i-1] += tempDeriv[i];
    }
    return tempDeriv;
}
function unDerivativeIncrement(derivatives){
    var tempDeriv = derivatives.slice(0);
    var len = tempDeriv.length;
    for(var i = len-1; i > 0; i--){
        tempDeriv[i-1] -= tempDeriv[i];
    }
    return tempDeriv;
}
function sumArray(array){
    var len = array.length;
    var sum = 0;
    for(var i = 0; i < len; i++){
        sum += array[i];
    }
    return sum;
}
function zeroDerivatives(originalDerivatives, toZero){ //Pos means it zeroes all positive numbers, neg means it zeroes all negative numbers
    var derivatives = originalDerivatives.slice(0);
    if(toZero == "pos"){
        var len = derivatives.length;
        for(var i = 1; i < len; i++){
            if(derivatives[i] > 0){
                derivatives[i] = 0;
            }
        }
    }
    if(toZero == "neg"){
        var len = derivatives.length;
        for(var i = 1; i < len; i++){
            if(derivatives[i] < 0){
                derivatives[i] = 0;
            }
        }
    }
    return derivatives;
}
function zeroDerivatives0thElement(originalDerivatives, toZero){ //Pos means it zeroes all positive numbers, neg means it zeroes all negative numbers
    var derivatives = originalDerivatives.slice(0);
    if(toZero == "pos"){
        var len = derivatives.length;
        for(var i = 1; i < len; i++){
            if(derivatives[i][0] > 0){
                derivatives[i][0] = 0;
            }
        }
    }
    if(toZero == "neg"){
        var len = derivatives.length;
        for(var i = 1; i < len; i++){
            if(derivatives[i][0] < 0){
                derivatives[i][0] = 0;
            }
        }
    }
    return derivatives;
}
function largestNumOfArray(array){
    var num = array[0];
    for(var i = 0; i < array.length; i++){
        if(array[i] > num){
            num = array[i];
        }
    }
    return num;
}
function collisionCheck(entity){
    if(entity.standingOnFriction){
        entity.standingOnFriction = [];
    }
    var len = collision.length;
    for(var i = 0; i < len; i++){
        var obj = collision[i];
        if(entity.shape == "rectangle" && "rectangle" == obj.shape){
            var currentConflictX = (entity.x[0]-entity.x[1])+entity.dimensions[0] > (obj.x[0]-obj.x[1]) && (entity.x[0]-entity.x[1]) < (obj.x[0]-obj.x[1])+obj.dimensions[0];
            var futureConflictX = entity.x[0]+entity.dimensions[0] > obj.x[0] && entity.x[0] < obj.x[0]+obj.dimensions[0];
            var currentConflictY = (entity.y[0]-entity.y[1])+entity.dimensions[1] > (obj.y[0]-obj.y[1]) && (entity.y[0]-entity.y[1]) < (obj.y[0]-obj.y[1])+obj.dimensions[1];
            var futureConflictY = entity.y[0]+entity.dimensions[1] > obj.y[0] && entity.y[0] < obj.y[0]+obj.dimensions[1];
            if(currentConflictX){
                if(futureConflictY && !currentConflictY){
                    if(entity.y[1] > 0 || obj.y[1] < 0){
                        entity.y[0] = obj.y[0]-entity.dimensions[1];
                        entity.y = zeroDerivatives(entity.y, "pos");
                        if(entity.yComponents){
                            entity.yComponents = zeroDerivatives0thElement(entity.yComponents, "pos");
                        }
                        if(entity.xComponents && obj.x[1] != 0){
                            entity.xComponents[2].push((obj.frictionCoefficient/10)*obj.x[1]); //Basically undoes friction
                            console.log(entity.x[0]-obj.x[0])
                        }
                        entity.y = unDerivativeIncrement(entity.y);
                        entity.standingOnFriction.push(obj.frictionCoefficient);
                    }
                    if(entity.y[1] < 0 || obj.y[1] > 0){
                        entity.y[0] = obj.y[0]+obj.dimensions[1];
                        entity.y = zeroDerivatives(entity.y, "neg");
                        if(entity.yComponents){
                            entity.yComponents = zeroDerivatives0thElement(entity.yComponents, "neg");
                        }
                        entity.y = unDerivativeIncrement(entity.y);
                    }
                }
                else if(entity.y[1] > 0){
                    if(entity.y[0]-entity.y[1] < obj.y[0] && entity.y[0]+entity.dimensions[1] > obj.y[0]){ //If the object is between the past and the future y
                        entity.y[0] = obj.y[0]-entity.dimensions[1];
                        entity.y = zeroDerivatives(entity.y, "pos");
                        if(entity.yComponents){
                            entity.yComponents = zeroDerivatives0thElement(entity.yComponents, "pos");
                        }
                        entity.y = unDerivativeIncrement(entity.y);
                        entity.standingOnFriction.push(obj.frictionCoefficient);
                    }
                }
                else if(entity.y[1] < 0){
                    if(entity.y[0]-entity.y[1] > obj.y[0] && entity.y[0]+entity.dimensions[1] < obj.y[0]){ //If the object is between the past and the future y
                        entity.y[0] = obj.y[0]+obj.dimensions[1];
                        entity.y = zeroDerivatives(entity.y, "neg");
                        if(entity.yComponents){
                            entity.yComponents = zeroDerivatives0thElement(entity.yComponents, "neg");
                        }
                        entity.y = unDerivativeIncrement(entity.y);
                    }
                }
            }
            if(currentConflictY){
                if(futureConflictX && !currentConflictX){
                    if(entity.x[1] > 0 || obj.x[1] < 0){
                        entity.x[0] = obj.x[0]-entity.dimensions[0];
                        entity.x = zeroDerivatives(entity.x, "pos");
                        if(entity.xComponents){
                            entity.xComponents = zeroDerivatives0thElement(entity.xComponents, "pos");
                        }
                        entity.x = unDerivativeIncrement(entity.x);
                    }
                    if(entity.x[1] < 0 || obj.x[1] > 0){
                        entity.x[0] = obj.x[0]+obj.dimensions[0];
                        entity.x = zeroDerivatives(entity.x, "neg");
                        if(entity.xComponents){
                            entity.xComponents = zeroDerivatives0thElement(entity.xComponents, "neg");
                        }
                        entity.x = unDerivativeIncrement(entity.x);
                    }
                }
                else if(entity.x[1] > 0){
                    if(entity.x[0]-entity.x[1] < obj.x[0] && entity.x[0]+entity.dimensions[0] > obj.x[0]){ //If the object is between the past and the future y
                        entity.x[0] = obj.x[0]-entity.dimensions[0];
                        entity.x = zeroDerivatives(entity.x, "pos");
                        if(entity.xComponents){
                            entity.xComponents = zeroDerivatives0thElement(entity.xComponents, "pos");
                        }
                        entity.x = unDerivativeIncrement(entity.x);
                    }
                }
                else if(entity.x[1] < 0){
                    if(entity.x[0]-entity.x[1] > obj.x[0] && entity.x[0]+entity.dimensions[0] < obj.x[0]){ //If the object is between the past and the future y
                        entity.x[0] = obj.x[0]+obj.dimensions[0];
                        entity.x = zeroDerivatives(entity.x, "neg");
                        if(entity.xComponents){
                            entity.xComponents = zeroDerivatives0thElement(entity.xComponents, "neg");
                        }
                        entity.x = unDerivativeIncrement(entity.x);
                    }
                }
            }
        }
    }
    return entity;
}
function addToBlocks(obj){ //Untested
    var len = block.length;
    for(var i = 0; i < len; i++){
        if(block[i].toDeleteFromBlocks == true){
            block[i] = obj;
            return;
        }
    }
    block.push(obj);
}
function addToCollision(obj){
    var len = collision.length;
    for(var i = 0; i < len; i++){
        if(collision[i].collision == false){
            collision[i] = obj;
            return;
        }
    }
    collision.push(obj);
}