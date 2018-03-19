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
    this.minesLeft = mines;
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
    this.img.addEventListener("click", (event) => {
        if (this.isMine){
            event.target.src = images.explodingBomb;
            setMessage("Game Over!");
        } else {
            if (!this.isFlagged && !this.isClicked){
                this.isClicked = true;
                if (this.cellValue > 0){
                    setImageSrc(this, this.cellValue);
                } else {
                    event.target.src = images.clickedEmpty;
                }
            }
        }
      });

    this.img.addEventListener("contextmenu", (event) => {        
        if (this.isFlagged){
            this.isFlagged = false;
            event.target.src = images.unclicked;
            // parseInt(document.getElementById("minesDiv").innerHTML) -= 1;
        } else {
            this.isFlagged = true;
            event.target.src = images.flagged;
            // parseInt(document.getElementById("minesDiv").innerHTML) += 1;
        }  
        event.preventDefault(); 
      });
}

// function handleClick(event){
//     if (!this.isFlagged && !this.isClicked){
//         this.isClicked = true;
//         this.img.src = images.clickedEmpty;
//         // this.img.removeEventListener("click",function);
//     }
// }

function setWidth(){
    var containerEl = document.getElementById("container");
    containerEl.style.width = cellSize*maxCols + maxCols*2 + "px";
}

function setMessage(msg){
    var msgEl = document.getElementById("message"); 
    msgEl.innerHTML = msg;
}

function getNeighbors(board, cell){
    var neighborsArray = [];
    // var topleft, topmiddle, topright, middleleft, middleright, bottomleft, bottommiddle, bottomright;
    // if (cell.yPos !== 0 && cell.xPos !== 0) {
    //     topleft = board.boardArray[cell.yPos-1][cell.xPos-1];
    // }
    // if (cell.yPos !== 0){
    //     topmiddle = board.boardArray[cell.yPos-1][cell.xPos];
    //     topright = board.boardArray[cell.yPos-1][cell.xPos+1];
    // }
    // if (cell.xPos !== 0){
    //     middleleft = board.boardArray[cell.yPos][cell.xPos-1];
    //     bottomleft = board.boardArray[cell.yPos+1][cell.xPos-1];
    // }
    // middleright = board.boardArray[cell.yPos][cell.xPos+1];
    // if (cell.yPos < board.boardHeight){
    //     bottommiddle = board.boardArray[cell.yPos+1][cell.xPos];
    //     bottomright = board.boardArray[cell.yPos+1][cell.xPos+1];
    // }
    if (cell.yPos === 0){
        if (cell.xPos === 0){  // Upper left corner - 3 neighbors
            // neighborsArray.push(middleright, bottomright, bottommiddle);
            neighborsArray.push(board.boardArray[cell.yPos][cell.xPos+1], board.boardArray[cell.yPos+1][cell.xPos+1],board.boardArray[cell.yPos+1][cell.xPos]);
        } else if (cell.xPos === (board.boardWidth - 1)){ // upper right corner - 3 neighbors
            // neighborsArray.push(middleleft, bottomleft, bottommiddle);
            neighborsArray.push(board.boardArray[cell.yPos][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos], board.boardArray[cell.yPos+1][cell.xPos]);
        } else { // first row middle - 5 neighbors
            // neighborsArray.push(middleleft, bottomleft, bottommiddle, bottomright, middleright);
            neighborsArray.push(board.boardArray[cell.yPos][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos], board.boardArray[cell.yPos+1][cell.xPos+1], board.boardArray[cell.yPos][cell.xPos+1]);
        }
    } else if (cell.yPos === (board.boardHeight - 1)){
        if (cell.xPos === 0){ // bottom left corner - 3 neighbors
            // neighborsArray.push(topmiddle, topright, middleright);
            neighborsArray.push(board.boardArray[cell.yPos-1][cell.xPos], board.boardArray[cell.yPos-1][cell.xPos+1], board.boardArray[cell.yPos][cell.xPos+1]);
        } else if (cell.xPos === (board.boardWidth - 1)){ //bottom right corner - 3 neighbors
            // neighborsArray.push(middleleft, topleft, topmiddle);
            neighborsArray.push(board.boardArray[cell.yPos][cell.xPos-1], board.boardArray[cell.yPos-1][cell.xPos-1], board.boardArray[cell.yPos-1][cell.xPos]);
        } else { // last row middle - 5 neighbors
            // neighborsArray.push(middleleft, topleft, topmiddle, topright, middleright);
            neighborsArray.push(board.boardArray[cell.yPos][cell.xPos-1], board.boardArray[cell.yPos-1][cell.xPos-1], board.boardArray[cell.yPos-1][cell.xPos], board.boardArray[cell.yPos-1][cell.xPos+1], board.boardArray[cell.yPos][cell.xPos+1]);
        }
    } else {
        if (cell.xPos === 0){ // left most column - 5 neighbors
            // neighborsArray.push(topmiddle, topright, middleright, bottomright, bottommiddle);
            neighborsArray.push(board.boardArray[cell.yPos-1][cell.xPos], board.boardArray[cell.yPos-1][cell.xPos+1], board.boardArray[cell.yPos][cell.xPos+1], board.boardArray[cell.yPos+1][cell.xPos+1], board.boardArray[cell.yPos+1][cell.xPos]);
        } else if (cell.xPos === (board.boardWidth - 1)){ // right most column - 5 neighbors
            // neighborsArray.push(topmiddle, topleft, middleleft, bottomleft, bottommiddle);
            neighborsArray.push(board.boardArray[cell.yPos-1][cell.xPos], board.boardArray[cell.yPos-1][cell.xPos-1], board.boardArray[cell.yPos][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos]);
        } else { // non-edge cells - 8 neighbors
            // neighborsArray.push(topleft, topmiddle, topright, middleleft, middleright, bottomleft, bottommiddle, bottomright);
            neighborsArray.push(board.boardArray[cell.yPos-1][cell.xPos-1], board.boardArray[cell.yPos-1][cell.xPos], board.boardArray[cell.yPos-1][cell.xPos+1], board.boardArray[cell.yPos][cell.xPos-1], board.boardArray[cell.yPos][cell.xPos+1], board.boardArray[cell.yPos+1][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos], board.boardArray[cell.yPos+1][cell.xPos+1]);
        }
    }
    return neighborsArray;
}

function setImageSrc(cell,value){
    switch (value){
        case 0: 
            cell.img.src = images.clickedEmpty;
            break;
        case 1:
            cell.img.src = images.value1;
            break;
        case 2:
            cell.img.src = images.value2;
            break;
        case 3:
            cell.img.src = images.value3;
            break;
        case 4:
            cell.img.src = images.value4;
            break;
        case 5:
            cell.img.src = images.value5;
            break;
        case 6:
            cell.img.src = images.value6;
            break;
        case 7:
            cell.img.src = images.value7;
            break;
        case 8:
            cell.img.src = images.value8;
            break;
    }
}


Board.prototype.placeNumbers = function (board){
    var cellVal = 0;
    for (var y=0; y<board.boardHeight; y++){
        for (var x=0; x<board.boardWidth; x++){
            var neighborsArray = getNeighbors(board, board.boardArray[y][x]);
            cellVal = 0;
            for (var n=0; n<neighborsArray.length; n++){
                if (neighborsArray[n].isMine){
                    cellVal++;
                }
                // setImageSrc(board.boardArray[y][x],cellVal);
                board.boardArray[y][x].cellValue = cellVal;
                if (cellVal === 0 || board.boardArray[y][x].isMine){
                    board.boardArray[y][x].img.src = images.unclicked;
                }
            } 
        }
    }
}

Board.prototype.placeMines = function (board){
    var numOfBombs = board.numOfMines;
    while(numOfBombs > 0){
        var randomNumber = Math.round(Math.random()* ((board.boardHeight * board.boardWidth) - 1));
        // Quotient will give the row
        var rowCount= Math.floor(randomNumber / board.boardWidth);
        // Remainder wil give the column
        var columnCount = randomNumber % board.boardWidth;
        if(!board.boardArray[rowCount][columnCount].isMine){
            board.boardArray[rowCount][columnCount].isMine = true;
            // board.boardArray[rowCount][columnCount].img.src = images.bomb;
            numOfBombs--;
        }
    }
}

Board.prototype.createBoard = function (board){
    var parentEl = document.getElementById("container");
    for (let i = 0; i < board.boardHeight; i++){
        var rowOfCells = [];
        board.boardArray[i] = rowOfCells;
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
    minesDiv.setAttribute("id", "minesDiv");
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
    board.createBoard(board);  
    board.placeMines(board);
    board.placeNumbers(board);
};