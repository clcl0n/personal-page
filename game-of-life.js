// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

const pixelSize = 5;
const rows = canvas.width / pixelSize;
const cols = canvas.height / pixelSize;

let cellGrid = [];

const initializeCellcellGrid = () => {
    for (let i = 0; i < rows; i++) {
        var newRow = [];
        for (let j = 0;j < cols; j++) {
            let random = Math.floor(Math.random() * 6) + 1;
            if (random % 6 === 0) {
                newRow.push(1);
            } else {
                newRow.push(0);
            }
        }
        cellGrid.push(newRow);
    }
};

const drawCellcellGrid = () => {
    cellGrid.forEach((row, i) => {
        row.forEach((col, j) => {
            if (col === 1) {
                addCell(i*pixelSize,j*pixelSize);
            } else {
                killCell(i*pixelSize,j*pixelSize);
            }
        });
    });
};

const killCell = (x, y) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, pixelSize, pixelSize);
};

const addCell = (x, y) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, pixelSize, pixelSize);
};

const processGeneration = () => {
    setTimeout(() => {
        let newcellGrid = [];

        cellGrid.forEach((row, i) => {
            let newRow = [];
            row.forEach((col, j) => {
                try {
                    const hasLeftNeighbour = j > 0 && cellGrid[i][j-1];
                    const hasTopLeftNeighbour = i > 0 && j > 0 && cellGrid[i-1][j-1];
                    const hasTopNeighbour = i > 0 && cellGrid[i-1][j];
                    const hasTopRightNeigbour = i > 0 && j +  1 < cols && cellGrid[i-1][j+1];
                    const hasRightNeighbour = j + 1 < cols && cellGrid[i][j+1];
                    const hasBottomRightNeighour = i + 1 < rows && j + 1 < cols && cellGrid[i+1][j+1];
                    const hasBottomRowNeighbour = i + 1 < rows && cellGrid[i+1][j];
                    const hasBottomLeftNeighbour = i + 1 < rows && j > 0 && cellGrid[i+1][j-1];

                    const numberOfNeighbours = hasTopNeighbour + hasBottomRowNeighbour
                    + hasLeftNeighbour + hasRightNeighbour
                    + hasTopLeftNeighbour + hasTopRightNeigbour
                    + hasBottomRightNeighour + hasBottomLeftNeighbour;
        
                    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                    // Any live cell with more than three live neighbours dies, as if by overpopulation.
                    if (numberOfNeighbours <= 1 || numberOfNeighbours > 4) {
                        newRow.push(0);
                    } else if (cellGrid[i][j] === 0 && numberOfNeighbours === 3) {
                        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                        newRow.push(1);
                    } else if (cellGrid[i][j] === 1 && (numberOfNeighbours === 2 || numberOfNeighbours === 3)) {
                        // Any live cell with two or three live neighbours lives on to the next generation.
                        newRow.push(1);
                    } else {
                        newRow.push(0);
                    }
                } catch (ex) {
                    console.warn(ex);
                }
            });
            newcellGrid.push(newRow);
        });
        cellGrid = newcellGrid;
    
        drawCellcellGrid();
        processGeneration();
    }, 100);
};


const startGame = () => {
    initializeCellcellGrid();
    processGeneration();
};

startGame();
