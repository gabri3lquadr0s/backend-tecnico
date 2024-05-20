let button, quebraLinha, jogada = 1;
let win = false;
let tabuleiro = new Array(3);
for(let i = 0; i < tabuleiro.length; i++){
    tabuleiro[i] = new Array(3);
}

for(let i = 0; i < tabuleiro.length; i++){
    $('body').append('<br />');
    for(let j = 0; j < tabuleiro[i].length; j++){
        let btn = $("<button></button>").attr("type", "button");
        btn.attr("id", `bt${i}${j}`);
        btn.attr("class", `btJogo${i}`);
        $('body').append(btn);
    }
}

$('button').on('click', function() {
    if(win != true) {
        let but = $(this).attr("id")
        if(jogada % 2 == 0){
            $(this).text("O");
            $(this).css("color", "red");
        }else{
            $(this).text("X");
            $(this).css("color", "blue");
        }
        tabuleiro[but[2]][but[3]] = $(this).text();
        $(this).attr('disabled', true);
        jogada++;
        if(jogada >= 5) endGame();
    }
})

function endGame() {
    for(let i of tabuleiro) {
        let comparison = false;
        for(let ii of i) {
            if(ii == undefined) comparison = true;
        } if(comparison == true) continue;
        if(i[0] == i[1] && i[0] == i[2]) {
            win = true;
            $('body').append("<br /><br /><a onclick=\"location.reload()\">RECOMEÇAR</a>");
            return jogada % 2 == 0 ? alert("X wins") : alert("O wins");
        }
    }

    for(let i = 0; i < tabuleiro.length; i++) {
        let comparison = false;
        let arr = [tabuleiro[0][i], tabuleiro[1][i], tabuleiro[2][i]];
        for(let ii of arr) {
            if(ii == undefined) comparison = true;
        } if(comparison == true) continue;
        if(arr[0] == arr[1] && arr[0] == arr[2]) {
            win = true;
            $('body').append("<br /><br /><a onclick=\"location.reload()\">RECOMEÇAR</a>");
            return jogada % 2 == 0 ? alert("X wins") : alert("O wins");
        }
    }
    
    let diagonais = [[tabuleiro[0][0], tabuleiro[1][1], tabuleiro[2][2]], [tabuleiro[2][0], tabuleiro[1][1], tabuleiro[0][2]]];
    for(let i of diagonais) {
        let comparison = false;
        for(let ii of i) {
            if(ii == undefined) comparison = true;
        } if(comparison == true) continue;
        if(i[0] == i[1] && i[0] == i[2]) {
            win = true;
            $('body').append("<br /><br /><a onclick=\"location.reload()\">RECOMEÇAR</a>");
            return jogada % 2 == 0 ? alert("X wins") : alert("O wins");
        }
    }

    if(jogada >= 10) {
        $('body').append("<br /><br /><a onclick=\"location.reload()\">RECOMEÇAR</a>");
        return alert("Empate");
    }
}