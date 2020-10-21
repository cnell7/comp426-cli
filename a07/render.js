import Game from "./engine/game.js"
const load = (game) => {
    let board = game.board;
    const $root = $("#root");
    let $table = $("<table class='table'></table>");
    $table.append("<tbody>");
    let $row;
    for(let i = 0; i < Math.pow(game.length, 2); i++){
        if( (i+1) % game.length == 1){
            $row = $("<tr>");
            console.log("hi")
        }
        $row.append("<th>"+game.board[i]+"</th>")
        if( (i+1) % game.length == 0){
            $row.append("</tr>");
            $table.append($row);
        }
    }
    $table.append("</tbody>")
    $root.append($table);
    $root.append("<div><p>Score: "+game.score+"</p></div>")
}
$(function () {
    load(new Game(4));
});