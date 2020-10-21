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
    $root.append("<div id='belowTable'><p>Score: "+game.score+"</p></div>")
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
            if(game.won){
                $root.append("Won!</p></div>");
            } else {
                $root.append("Lost!</p></div>");
            }
        }
    }
}
$(function () {
    firstLoad(new Game(4));
});