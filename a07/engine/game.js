export default class Game {

    constructor(l){
        this.length = l;
        this.board = [];
        this.score = 0;
        this.won = false;
        this.over = false;
        this.onMoveCall = [];
        this.onWinCall = [];
        this.onLoseCall = [];
        this.setupNewGame();
    }
    setupNewGame(){
        let count = 0;
        let len = Math.pow(this.length, 2);
        let firstOne = 0;
        let firstTwo = 0;
        while(firstOne == firstTwo){
            firstOne = parseInt(Math.random() * len);
            firstTwo = parseInt(Math.random() * len);
        }
        while(count < len){
            if(count == firstOne || count == firstTwo){
                this.board[count] = this.getRandom();
            }
            else{
                this.board[count] = 0;
            }
            count++;
        }
    }
    loadGame(gameState){
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
    }
    move(direction){
        if(this.checkNoMoves()){
            this.handleLoss();
            return false;
        }
        switch(direction){
            case 'up':
                this.handleMove(0,1);
                break;
            case 'down':
                this.handleMove(0,-1);
                break;
            case 'left':
                this.handleMove(-1,0);
                break;
            case 'right':
                this.handleMove(1,0);
                break;
            default:
                return null;
        }
        if(this.checkNoMoves()){
            this.handleLoss();
            return false;
        }
        if(this.checkGameOver()){
            this.handleWin();
            return true;
        }
        return true;
    }
    toString(){
        let returnString = "";
        for(let i = 0; i < Math.pow(this.length, 2); i++){
            returnString += " [" + this.board[i] + "]";
            if( (i + 1) % this.length == 0){
                returnString += "\n";
            }
        }
        return returnString;
    }
    onMove(callback){
        this.onMoveCall.push(callback);
        return true;
    }
    onWin(callback){
        this.onWinCall.push(callback);
        return true;
    }
    onLose(callback){
        this.onLoseCall.push(callback);
        return true;
    }
    getGameState(){
        return {
            board: this.board,
            score: this.score,
            won: this.won,
            over: this.over
          }
    }

    /*
    HELPER METHODS
    */
    getRandom(){
        if(Math.random() < .1){
            return 4;
        }
        return 2;
    }
    handleMove(x,y){
        let copy = this.board;
        let newBoard = [];
        let count = 0;
        let checkSameState = {...this.board};
        if(x == -1){
            while(count < Math.pow(this.length, 2)){
                let a = copy.slice(count, count + this.length);
                for (let k of this.calcValues(a)){newBoard.push(k);}
                count += this.length;
            }
        } else if (x == 1){
            while(count < Math.pow(this.length, 2)){
                let a = copy.slice(count, count + this.length);
                a.reverse();
                for (let k of this.calcValues(a).reverse()){newBoard.push(k);}
                count += this.length;
            }
        } else if (y == -1){
            let temp = [];
            for(let i = 0; i < this.length; i++){
                let a = [];
                for(let j = 0; j < this.length; j++){
                    a.push(this.get(i,j));
                }
                let k = a.reverse();
                temp.push(this.calcValues(k));
            }
            for(let i = this.length - 1; i >= 0; i--){
                for(let j = 0; j < this.length; j++){
                    newBoard.push(temp[j][i]);
                }
            }
        } else if (y == 1){
            let temp = [];
            for(let i = 0; i < this.length; i++){
                let a = [];
                for(let j = 0; j < this.length; j++){
                    a.push(this.get(i,j));
                }
                temp.push(this.calcValues(a));
            }
            for(let i = 0; i < this.length; i++){
                for(let j = 0; j < this.length; j++){
                    newBoard.push(temp[j][i]);
                }
            }
        }
        let c = 0;
        let isDone = false;
        while(c <  Math.pow(this.length, 2) && !isDone){
            if(checkSameState[c] != newBoard[c]){
                this.board = newBoard;
                this.addRandom();
                this.onMoveCall.map( fn=>{fn(this.getGameState());})
                isDone = true;
            }
            c++;
        }
        return true;
    }
    calcValues(arr){
        let addZero = 0;
        arr = arr.filter((num)=>{return num > 0;})
        if(arr.length != 0){
            for(let i = 0; i < arr.length - 1; i++){
                if(arr[i] == arr[i+1]){
                    arr[i] *= 2;
                    delete arr[i+1];
                    this.score += arr[i];
                }
            }
        }
        arr = arr.filter((num)=> {return num != undefined;})
        addZero = this.length - arr.length;
        for(let i = 0; i < addZero; i++){
            arr.push(0);
        }
        return arr;
    }
    addRandom(){
        let goodIndexs = []
        for(let i = 0; i < Math.pow(this.length, 2); i++){
            if(this.board[i] == 0){
                goodIndexs.push(i);
            }
        }
        this.board[goodIndexs[parseInt(Math.random() * goodIndexs.length)]] = this.getRandom();
        return true;
    }
    checkNoMoves(){
        let tempID = 0;
        for(let i = 0; i < Math.pow(this.length, 2); i++){
            tempID = this.getXY(i);
            if(this.board[i] == 0){
                return false
            }
            if((tempID['x'] + 1) < this.length - 1){
                if(this.get(tempID['x'], tempID['y']) == this.get(tempID['x'] + 1, tempID['y'])){
                    return false;
                }
            }
            if((tempID['x'] - 1) > 0){
                if(this.get(tempID['x'], tempID['y']) == this.get(tempID['x'] - 1, tempID['y'])){
                    return false;
                }
            }
            if((tempID['y'] - 1) > 0){
                if(this.get(tempID['x'], tempID['y']) == this.get(tempID['x'], tempID['y'] - 1)){
                    return false;
                }
            }
            if((tempID['y'] + 1) < this.length - 1){
                if(this.get(tempID['x'], tempID['y']) == this.get(tempID['x'], tempID['y'] + 1)){
                    return false;
                }
            }
            if(this.board[i] == 2048){
                this.handleWin();
            }
        }
        return true;
    }
    checkGameOver(){
        for(let i = 0; i < Math.pow(this.length, 2); i++){
            if(this.board[i] == 2048){
                return true;
            }
        }
        return false;
    }
    handleLoss(){
        this.over = true;
        this.onLoseCall.forEach((fn)=>{fn(this.getGameState())})
    }
    handleWin(){
        this.won = true;
        this.over = true;
        this.onWinCall.forEach((fn)=>{fn(this.getGameState())})
    }
    get(x,y){
        return this.board[x + (this.length) * y];
    }
    set(x,y,val){
        this.board[x+this.length*y] = val;
    }
    getIndex(x,y){
        return x + this.length * y;
    }
    getXY(index){
        return {x: index % this.length, y: Math.floor(index/this.length)};
    }
}