export default class Game {

    constructor(l){
        this.length = l;
        this.board = [];
        this.score = 0;
        this.won = false;
        this.over = false;
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
        switch(direction){
            case 'up':
                this.handleUp();
                break;
            case 'down':
                this.handleDown();
                break;
            case 'left':
                this.handleLeft();
                break;
            case 'right':
                this.handleRight();
                break;
            default:
                return null;
        }
    }
    toString(){
        let returnString = "hi";
        for(let i = 0; i < Math.pow(this.length, 2); i++){
            returnString.concat(this.board[i]);
            if( ((i+1) % this.length) == 0 ){
                returnString.concat("\n");
            }
        }
        return returnString;
    }
    onMove(callback){

    }
    onWin(callback){

    }
    onLose(callback){

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
    handleUp(){
        let short = this.makeNewUpDownBoard();
    }
    handleDown(){

    }
    handleLeft(){

    }
    handleRight(){

    }
    makeNewLeftRightBoard(){
        let temp = this.board;
        let newBoard = []
        let row = []
        for(let i = 0; i < Math.pow(this.length, 2); i++){
            row.push(temp[i]);
            if( (i % this.legnth) == 0){
                newBoard.push(row);
                row = [];
            }
        }
        return newBoard;
    }
    makeNewUpDownBoard(){
        let temp = this.board;
        let newBoard = [];
        for(let i = 0; i < this.length; i++){
            let col = [temp[i]]
            for(let j = i + this.length; j < Math.pow(this.length, 2); j += this.length){
                col.push(temp[j])
            }
            newBoard.push(col);
        }
        return newBoard;
    }
}