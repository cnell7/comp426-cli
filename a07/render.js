import Game from "./engine/game.js"
let keyPress = {
    "ArrowUp": "up",
    "ArrowDown": "down",
    "ArrowLeft" : "left",
    "ArrowRight" : "right"
}
const load = (game) => {
    let board = game.board;
    const $root = $("#root");
    $root.append("<div><p>The rules are also simple. You just need to move the tiles and every time you move one, another tile pops up in a random manner anywhere in the box. When two tiles with the same number on them collide with one another as you move them, they will merge into one tile with the sum of the numbers written on them initially.</p></div>")
    let $tableHolder = $("<div class='container'>");
    let $table = $("<table class='table' id='t'></table>");
    $table.append("<tbody>");
    let $row;
    for(let i = 0; i < Math.pow(game.length, 2); i++){
        if( (i+1) % game.length == 1){
            $row = $("<tr>");
        }
        $row.append("<th>"+game.board[i]+"</th>")
        if( (i+1) % game.length == 0){
            $row.append("</tr>");
            $table.append($row);
        }
    }
    $table.append("</tbody>")
    $tableHolder.append($table);
    $tableHolder.append("</div>");
    $root.append($tableHolder);
    $root.append("<div id='belowTable'><p>Score: "+game.score+"</p>")
    $root.append("<button class='button reset'>Reset</button></div>");
}
const reset = () =>{
    let temp = new Game(4)
    load(temp);
    return temp;
}
const firstLoad = (game) => {
    load(game);
    const $root = $("#root");
    document.onkeydown = function(e){
        $root.empty();
        game.move(keyPress[e.key])
        load(game);
        if(game.over == true){
            $root.append("<div id='belowTable'><p>");
            $root.append("<p>Game Over</p>");
            if(game.won){
                $root.append("Won!</p></div>");
            } else {
                $root.append("Lost!</p></div>");
            }
        }
    }
    $root.on("click", ".reset", function (e) {
        $root.empty();
        game = reset();
    })
}
$(function () {
    firstLoad(new Game(4));
});