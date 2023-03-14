const clickAudio = new Audio('click.mp3')
const drawAudio = new Audio('draw.mp3')
const winAudio = new Audio('win.mp3')
const resetbtn = document.querySelector('#reset')
let gameOver = false;
let count = 0;
let turn = 'X';

const changeTurn = function () {
    return turn === 'X' ? 'O' : 'X';
}

resetbtn.addEventListener('click', Reset)
function Reset() {
    count = 0;
    gameOver = false;
    turn = 'X';
    // document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    document.querySelector('.info').innerText = "Turn for " + turn;
    let boxes = document.getElementsByClassName('boxText')
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
    }
}

const checkWinner = function () {
    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    let boxes = document.getElementsByClassName('boxText')
    for (let i = 0; i < winCombos.length; i++) {
        if ((boxes[winCombos[i][0]].innerText !== '') && (boxes[winCombos[i][0]].innerText === boxes[winCombos[i][1]].innerText) && (boxes[winCombos[i][1]].innerText === boxes[winCombos[i][2]].innerText)) {
            gameOver = true;
            document.querySelector('.info').innerText = boxes[winCombos[i][0]].innerText + " WON ";
            winAudio.play();
            // document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "130px"
        }
    }
}

function play(x) {
    count++;
    let boxText = x.querySelector('.boxText')
    if (boxText.innerText === '') {
        clickAudio.play()
        boxText.innerText = turn;
        turn = changeTurn();
        checkWinner();
        if (!gameOver && count === 9) {
            document.querySelector('.info').innerText = "DRAW PLAY AGAIN!";
            drawAudio.play();
        }
        else if (!gameOver) {
            document.querySelector('.info').innerText = "Turn for " + turn;
        }
    }
}

const cells = document.querySelectorAll('.box')
for (let i = 0; i < cells.length; i++) {
    // let boxText = cells[i].querySelector('.boxText')
    cells[i].addEventListener('click', function () {
        if (!gameOver) {
            play(cells[i]);
        }
    })
}

