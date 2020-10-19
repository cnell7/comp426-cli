export default class Game {

    constructor(l){
        this.length = l;
        this.board = [];
        this.score = 0;
        this.won = false;
        this.over = false;
        this.setupNewGame()
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

    }
    toString(){
        return this.board;
    }
    onMove(callback){

    }
    onWin(callback){

    }
    onLose(callback){

    }
    getGameState(){
        
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
}