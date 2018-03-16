var cellSize = 40;
var maxRows = 8;
var maxCols = 8;
var numOfMines = 10;


// Associative Images array
var images = {
    unclicked: "unopenedCell.png",
    clickedEmpty: "openedEmptyCell.png",
    bomb: "bomb.png",
    explodingBomb: "explodingBomb.png",
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
// var prevTime, stopwatchInterval, elapsedTime = 0;

// function startTimer() {
//     var tempTime = elapsedTime;
//     var seconds = tempTime % 60;
//     tempTime = Math.floor(tempTime / 60);
//     var time = seconds;
//     time = getThreeDigits(time);
//     document.getElementById('timerDiv').innerHTML = time;
//     var t = setTimeout(startTimer, 500);
// }
// add zero in front of numbers < 100
function getThreeDigits(i) {
    if (i < 100) {i = "0" + i};  
    return i;
}

// Upon click of first cell, start timer
// if (!stopwatchInterval) {
//     stopwatchInterval = setInterval(function () {
//       if (!prevTime) {
//         prevTime = Date.now();
//       }
      
//       elapsedTime += Date.now() - prevTime;
//       prevTime = Date.now();
      
//       updateTime();
//     }, 50);
//   }

// When mine is clicked, pause timer
// if (stopwatchInterval) {
//     clearInterval(stopwatchInterval);
//     stopwatchInterval = null;
//   }
//   prevTime = null;

// When game is reset, set elapsed time to 0
// elapsedTime = 0;

// Board constructor
function Board (width, height, mines) {
    this.boardWidth = width;
    this.boardHeight =  height;
    this.numOfMines = mines;
    this.boardArray = [];
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
    
    this.img.addEventListener("click", function (event) {
        setMessage("cell clicked!");
console.log("this.yPos: " + this.yPos);
console.log("this.xPos: " + this.xPos);
console.log("this.isMine" + this.isMine);
        if (this.isMine){
            this.src = images.explodingBomb;
        } else {
            this.src = images.clickedEmpty;
        }
      });

    this.img.addEventListener("contextmenu", function (event) {
        event.preventDefault(); 
        setMessage("cell right-clicked!");
        if (this.isFlagged){
            this.isFlagged = false;
            this.src = images.unclicked;
            // this.parent.numOfMines.innerHTML = this.parent.numOfMines + 1;
        } else {
            this.isFlagged = true;
            this.src = images.flagged;
            // this.parent.numOfMines.innerHTML = this.parent.numOfMines - 1;
        }  
        
      });
}


function setWidth(){
    var containerEl = document.getElementById("container");
    containerEl.style.width = cellSize*maxCols + maxCols*2 + "px";
}

function setMessage(msg){
    var msgEl = document.getElementById("message"); 
    msgEl.innerHTML = msg;
}

function placeMines (board){
    var numOfBombs = board.numOfMines;
    while(numOfBombs > 0){
        var randomNumber = Math.round(Math.random()* ((board.boardHeight * board.boardWidth) - 1));
        // Quotient of randomNumber/boardWidth will give the row
        var rowCount= Math.floor(randomNumber / board.boardWidth);
        // Remainder of randomNumber % boardWidth wil give the column
        var columnCount = randomNumber % board.boardWidth;
        if(!board.boardArray[rowCount][columnCount].isMine){
            board.boardArray[rowCount][columnCount].isMine = true;
            board.boardArray[rowCount][columnCount].img.src = images.bomb;
            numOfBombs--;
        }
    }
}

function createBoard(board){
    var parentEl = document.getElementById("container");
    for (let i = 0; i < board.boardHeight; i++){
        board.boardArray[i] = [];
        for (let j = 0; j < board.boardWidth; j++){
            board.boardArray[i][j] = new Cell(parentEl, i, j);    
            board.boardArray[i][j].xPos = j;
            board.boardArray[i][j].yPos = i;
        }
    }
}

function createPanel(){
    var parentEl = document.getElementById("container");
    var panelDiv = document.createElement("div");
    panelDiv.setAttribute("id","panelDiv");
    panelDiv.style.width = parentEl.style.width;
    var minesDiv = document.createElement("div");
    minesDiv.innerHTML = getThreeDigits(numOfMines);
    minesDiv.style.color = "red";
    minesDiv.style.fontFamily = "tahoma";
    minesDiv.style.fontSize = "40px";
    minesDiv.style.width = 0.333*panelDiv.style.width;
    // var button = document.createElement("button");
    // button.value = "SMILEY";
    // var timerDiv = document.createElement("div");
    // timerDiv.setAttribute("id","timerDiv");
    panelDiv.appendChild(minesDiv);
    // panelDiv.appendChild(button);
    // panelDiv.appendChild(timerDiv);
    parentEl.appendChild(panelDiv);
}

window.onload = function() {
    var board = new Board(maxCols,maxRows,numOfMines); 
    setWidth(board.boardWidth);
    createPanel();
    createBoard(board);  
    placeMines(board);
};