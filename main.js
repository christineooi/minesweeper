
// Board game constructor
function Board (width, height, mines) {
    boardWidth: this.width;
    boardHeight: this.height;
    numOfMines: this.mines;
    isGameOver: false;
}

// Constructor of each square on the board
function Cell (y, x) {
    isMine: false;
    isClicked: false;
    isFlagged: false;
    xPos: this.x;
    yPos: this.y;
    cellValue: 0;  
}