var cellSize = 40;
var maxRows = 8;
var maxCols = 8;
var numMines = 10;

// Associative Images array
var images = {
    unclicked: "unopenedCell.png",
    clickedEmpty: "openedEmptyCell.png",
    bomb: "bomb.png",
    flagged: "flag.png",
    value1: "value1.png",
    value2: "value2.png",
    value3: "value3.png",
    value4: "value4.png",
    value5: "value5.png",
    value6: "value6.png",
    value7: "value7.png",
    value8: "value8.png",
}

// Game constructor
// function Game () {
//     startTimer = function(){

//     }
//     stopTimer = function(){

//     }
// }

// Board constructor
function Board (width, height, mines) {
    this.boardWidth = width;
    this.boardHeight =  height;
    this.numOfMines = mines;
    this.isGameOver = false;
    
}

// Constructor of each square on the board
function Cell (target_div, y, x) {
    this.isMine = false;
    this.isClicked = false;
    this.isFlagged = false;
    this.xPos = x;
    this.yPos = y;
    this.cellValue = 0;
    this.img = document.createElement("img");
    this.img.src = images.unclicked;
    this.img.className = "cell";
    target_div.appendChild(this.img);
    // this.addEventListener("click", this);
    this.img.addEventListener("click", this);
    this.handleEvent = function (event){
        setMessage("cell clicked!");
    }
}

function setMessage(msg){
    var msgEl = document.getElementById("message"); 
    msgEl.innerHTML = msg;
}

function createBoard(board){
    var boardArray = [];
    var parentEl = document.getElementById("container");
    for (let i = 0; i < board.boardHeight; i++){
        boardArray[i] = [];
        for (let j = 0; j < board.boardWidth; j++){
            boardArray[i][j] = new Cell(parentEl, i, j);       
        }
    }
}

function setWidth(){
    var containerEl = document.getElementById("container");
    containerEl.style.width = cellSize*maxCols + maxCols*2 + "px";
}

window.onload = function() {
    var board = new Board(maxCols,maxRows,numMines); 
    setWidth(board.boardWidth);
    createBoard(board);  
};