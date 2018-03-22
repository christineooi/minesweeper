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
    if (i < 10){
        i = "00" + i;
    }
    else if (i < 100) {
        i = "0" + i;
    }
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
    this.nonMineCells = (width*height)-numOfMines;
    this.boardArray = [];
    this.nonMineCellsClicked = 0;
    this.isGameOver = false;    
}

// Panel constructor
function Panel (minesleft) {
    this.numMinesLeft = minesleft; 
    this.isTimerOn = false;
    this.timerID;
    this.elapsedTime = 0;
    this.restartButton;
    // this.restartButton.addEventListener("click", function(event){
    //     setMessage("Restart button clicked!");
    //     

    // });

}

Panel.prototype.countUp = function(){
    var formattedTime = getThreeDigits(this.elapsedTime);
    document.getElementById("timerDiv").innerHTML = formattedTime;
    this.elapsedTime = this.elapsedTime + 1;
    this.timerID = setTimeout(countUp, 1000);
}

Panel.prototype.startTimer = function (){
    if (!isTimerOn){
        isTimerOn = true;
        countUp();
    }
}

Panel.prototype.stopTimer = function (){
    clearTimeout(timerID);
    isTimerOn = false;
}

// Constructor of each square on the board
function Cell (board, panel, target_div, y, x) {
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
        if (!board.isGameOver){
            // if (!panel.isTimerOn){
            //     panel.startTimer();
            // }
            if (this.isMine && !this.isFlagged){
                event.target.src = images.explodingBomb;
                setMessage("Game Over!");
                showMines(board, this);
                // panel.stopTimer();
                board.isGameOver = "true"; 
            } else if(!this.isMine){
                handleClick(board,this);
            }
        }
    });
    this.img.addEventListener("contextmenu", (event) => {       
        if (!board.isGameOver){         
            if (this.isFlagged){
                this.isFlagged = false;
                event.target.src = images.unclicked;
                document.getElementById("minesDiv").innerHTML = getThreeDigits((parseInt(document.getElementById("minesDiv").innerHTML) + 1)).toString();
            } else {
                this.isFlagged = true;
                event.target.src = images.flagged;
                document.getElementById("minesDiv").innerHTML = getThreeDigits((parseInt(document.getElementById("minesDiv").innerHTML) - 1)).toString();
            }  
        }
        event.preventDefault(); 
    });
}

function handleClick(board, cell){
    cell.isClicked = true;
    board.nonMineCellsClicked++;
    if (cell.cellValue > 0){
        setImageSrc(cell, cell.cellValue);
    } else {
        cell.img.src = images.clickedEmpty;
    }
    if(cell.cellValue == 0){ 
        openNeighbors(board, cell); 
    }
    if (board.nonMineCellsClicked === board.nonMineCells){
        setMessage("You WIN the game!");
        board.isGameOver = true;
    } 

}

function showNonFlaggedMines(board){
    for (let y=0; y<board.boardHeight; y++){
        for (let x=0; x<board.boardWidth; x++){
            if (board.boardArray[y][x].isMine && !board.boardArray[y][x].isFlagged){
                board.boardArray[y][x].img.src = images.bomb;
            }
        }
    }
}

function showMines(board, cell){
    for (let y=0; y<board.boardHeight; y++){
        for (let x=0; x<board.boardWidth; x++){
            if (board.boardArray[y][x].isMine && board.boardArray[y][x] !== cell){
                board.boardArray[y][x].img.src = images.bomb;
            }
        }
    }
}

function openNeighbors (board, cell){
    var neighbors = getNeighbors(board, cell);
    for (var i=0; i<neighbors.length; i++){
        if (!neighbors[i].isClicked){
            handleClick(board, neighbors[i]);
        }
    }
}

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
    if (cell.yPos === 0){
        if (cell.xPos === 0){  // Upper left corner - 3 neighbors
            // neighborsArray.push(middleright, bottomright, bottommiddle);
            neighborsArray.push(board.boardArray[cell.yPos][cell.xPos+1], board.boardArray[cell.yPos+1][cell.xPos+1],board.boardArray[cell.yPos+1][cell.xPos]);
        } else if (cell.xPos === (board.boardWidth - 1)){ // upper right corner - 3 neighbors
            // neighborsArray.push(middleleft, bottomleft, bottommiddle);
            neighborsArray.push(board.boardArray[cell.yPos][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos-1], board.boardArray[cell.yPos+1][cell.xPos]);
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


Board.prototype.placeNumbers = function (){
    var cellVal = 0;
    for (var y=0; y<this.boardHeight; y++){
        for (var x=0; x<this.boardWidth; x++){
            var neighborsArray = getNeighbors(this, this.boardArray[y][x]);
            cellVal = 0;
            for (var n=0; n<neighborsArray.length; n++){
                if (neighborsArray[n].isMine){
                    cellVal++;
                }
                this.boardArray[y][x].cellValue = cellVal;
                if (cellVal === 0 || this.boardArray[y][x].isMine){
                    this.boardArray[y][x].img.src = images.unclicked;
                }
            } 
        }
    }
}

Board.prototype.placeMines = function (){
    var numOfBombs = this.numOfMines;
    while(numOfBombs > 0){
        var randomNumber = Math.round(Math.random()* ((this.boardHeight * this.boardWidth) - 1));
        // Quotient will give the row
        var rowCount= Math.floor(randomNumber / this.boardWidth);
        // Remainder wil give the column
        var columnCount = randomNumber % this.boardWidth;
        if(!this.boardArray[rowCount][columnCount].isMine){
            this.boardArray[rowCount][columnCount].isMine = true;
            numOfBombs--;
        }
    }
}

Board.prototype.createBoard = function (){
    var parentEl = document.getElementById("container");
    var panel = new Panel(this.numOfMines);
    panel.createPanel();
    for (let i = 0; i < this.boardHeight; i++){
        var rowOfCells = [];
        this.boardArray[i] = rowOfCells;
        for (let j = 0; j < this.boardWidth; j++){ 
            this.boardArray[i][j] = new Cell(this, panel, parentEl, i, j);  
            this.boardArray[i][j].xPos = j;
            this.boardArray[i][j].yPos = i;
        }
    }
}

Panel.prototype.createPanel = function(){
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
    // minesDiv.style.width = "33%";
    var button = document.createElement("button");
    this.restartButton = button;
    button.setAttribute("id","restartButton");
    button.innerHTML= "Restart";
    var timerDiv = document.createElement("div");
    timerDiv.setAttribute("id","timerDiv");
    timerDiv.innerHTML = getThreeDigits(this.elapsedTime);
    timerDiv.style.color = "red";
    timerDiv.style.fontFamily = "tahoma";
    timerDiv.style.fontSize = "40px";
    panelDiv.appendChild(minesDiv);
    panelDiv.appendChild(button);
    panelDiv.appendChild(timerDiv);
    parentEl.appendChild(panelDiv);
}

window.onload = function() {
    var board = new Board(maxCols,maxRows,numOfMines); 
    setWidth(board.boardWidth);
    // createPanel();
    board.createBoard();  
    board.placeMines();
    board.placeNumbers();
};