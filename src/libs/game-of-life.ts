// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

class GameOfLife {
    private ctx: CanvasRenderingContext2D | undefined | null;
    private cellGrid: Array<Array<number>> = [];
    private pixelSize = 5;
    private rows: number = 0;
    private cols: number = 0;

    public initialize = (canvas: HTMLCanvasElement) => {
        this.ctx = canvas.getContext('2d');
        this.rows = canvas.width / this.pixelSize;
        this.cols = canvas.height / this.pixelSize;
    };

    public restart = (newWidth: number, newHeight: number) => {
        this.cellGrid = [];
        this.rows = newWidth / this.pixelSize;
        this.cols = newHeight / this.pixelSize;
        this.initializeCellcellGrid();
    }

    public start = () => {
        this.initializeCellcellGrid();
        this.processGeneration();
    };

    private boolToNumber = (val: boolean) => val ? 1 : 0;

    private initializeCellcellGrid = () => {
        for (let i = 0; i < this.rows; i++) {
            var newRow = [];
            for (let j = 0;j < this.cols; j++) {
                let random = Math.floor(Math.random() * 6) + 1;
                if (random % 6 === 0) {
                    newRow.push(1);
                } else {
                    newRow.push(0);
                }
            }
            this.cellGrid.push(newRow);
        }
    };

    private drawCellcellGrid = () => {
        this.cellGrid.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === 1) {
                    this.addCell(i * this.pixelSize, j * this.pixelSize);
                } else {
                    this.killCell(i * this.pixelSize, j * this.pixelSize);
                }
            });
        });
    }

    private killCell = (x: number, y: number) => {
        if (this.ctx) {
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
        }
    }
    
    private addCell = (x: number, y: number) => {
        if (this.ctx) {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
        }
    }

    private processGeneration = () => {
        setTimeout(() => {
            let newcellGrid: Array<Array<number>> = [];
    
            this.cellGrid.forEach((row, i) => {
                let newRow: Array<number> = [];
                row.forEach((col, j) => {
                    try {
                        const hasLeftNeighbour = this.boolToNumber(j > 0) && this.cellGrid[i][j-1];
                        const hasTopLeftNeighbour = this.boolToNumber(i > 0 && j > 0) && this.cellGrid[i-1][j-1];
                        const hasTopNeighbour = this.boolToNumber(i > 0) && this.cellGrid[i-1][j];
                        const hasTopRightNeigbour = this.boolToNumber(i > 0 && j +  1 < this.cols )&& this.cellGrid[i-1][j+1];
                        const hasRightNeighbour = this.boolToNumber(j + 1 < this.cols) && this.cellGrid[i][j+1];
                        const hasBottomRightNeighour = this.boolToNumber(i + 1 < this.rows && j + 1 < this.cols) && this.cellGrid[i+1][j+1];
                        const hasBottomRowNeighbour = this.boolToNumber(i + 1 < this.rows) && this.cellGrid[i+1][j];
                        const hasBottomLeftNeighbour = this.boolToNumber(i + 1 < this.rows && j > 0) && this.cellGrid[i+1][j-1];
    
                        const numberOfNeighbours = hasTopNeighbour + hasBottomRowNeighbour
                        + hasLeftNeighbour + hasRightNeighbour
                        + hasTopLeftNeighbour + hasTopRightNeigbour
                        + hasBottomRightNeighour + hasBottomLeftNeighbour;
            
                        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                        // Any live cell with more than three live neighbours dies, as if by overpopulation.
                        if (numberOfNeighbours <= 1 || numberOfNeighbours > 4) {
                            newRow.push(0);
                        } else if (this.cellGrid[i][j] === 0 && numberOfNeighbours === 3) {
                            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                            newRow.push(1);
                        } else if (this.cellGrid[i][j] === 1 && (numberOfNeighbours === 2 || numberOfNeighbours === 3)) {
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
            this.cellGrid = newcellGrid;
        
            this.drawCellcellGrid();
                this.processGeneration();
        }, 100);
    }
}

// const gameOfLife = (canvas: HTMLCanvasElement) => {
//     const ctx = canvas.getContext("2d");
    
//     const pixelSize = 5;
//     const rows = canvas.width / pixelSize;
//     const cols = canvas.height / pixelSize;
    
//     let cellGrid: Array<Array<number>> = [];
    
//     const initializeCellcellGrid = () => {
//         for (let i = 0; i < rows; i++) {
//             var newRow = [];
//             for (let j = 0;j < cols; j++) {
//                 let random = Math.floor(Math.random() * 6) + 1;
//                 if (random % 6 === 0) {
//                     newRow.push(1);
//                 } else {
//                     newRow.push(0);
//                 }
//             }
//             cellGrid.push(newRow);
//         }
//     };
    
//     const drawCellcellGrid = () => {
//         cellGrid.forEach((row, i) => {
//             row.forEach((col, j) => {
//                 if (col === 1) {
//                     addCell(i*pixelSize,j*pixelSize);
//                 } else {
//                     killCell(i*pixelSize,j*pixelSize);
//                 }
//             });
//         });
//     };
    
//     const killCell = (x: number, y: number) => {
//         if (ctx) {
//             ctx.fillStyle = '#fff';
//             ctx.fillRect(x, y, pixelSize, pixelSize);
//         }
//     };
    
//     const addCell = (x: number, y: number) => {
//         if (ctx) {
//             ctx.fillStyle = '#000';
//             ctx.fillRect(x, y, pixelSize, pixelSize);
//         }
//     };

//     const boolToNumber = (val: boolean) => val ? 1 : 0;
    
//     const processGeneration = () => {
//         setTimeout(() => {
//             let newcellGrid: Array<Array<number>> = [];
    
//             cellGrid.forEach((row, i) => {
//                 let newRow: Array<number> = [];
//                 row.forEach((col, j) => {
//                     try {
//                         const hasLeftNeighbour = boolToNumber(j > 0) && cellGrid[i][j-1];
//                         const hasTopLeftNeighbour = boolToNumber(i > 0) && boolToNumber(j > 0) && cellGrid[i-1][j-1];
//                         const hasTopNeighbour = boolToNumber(i > 0) && cellGrid[i-1][j];
//                         const hasTopRightNeigbour = boolToNumber(i > 0 && j +  1 < cols )&& cellGrid[i-1][j+1];
//                         const hasRightNeighbour = boolToNumber(j + 1 < cols) && cellGrid[i][j+1];
//                         const hasBottomRightNeighour = boolToNumber(i + 1 < rows && j + 1 < cols) && cellGrid[i+1][j+1];
//                         const hasBottomRowNeighbour = boolToNumber(i + 1 < rows) && cellGrid[i+1][j];
//                         const hasBottomLeftNeighbour = boolToNumber(i + 1 < rows && j > 0) && cellGrid[i+1][j-1];
    
//                         const numberOfNeighbours = hasTopNeighbour + hasBottomRowNeighbour
//                         + hasLeftNeighbour + hasRightNeighbour
//                         + hasTopLeftNeighbour + hasTopRightNeigbour
//                         + hasBottomRightNeighour + hasBottomLeftNeighbour;
            
//                         // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//                         // Any live cell with more than three live neighbours dies, as if by overpopulation.
//                         if (numberOfNeighbours <= 1 || numberOfNeighbours > 4) {
//                             newRow.push(0);
//                         } else if (cellGrid[i][j] === 0 && numberOfNeighbours === 3) {
//                             // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
//                             newRow.push(1);
//                         } else if (cellGrid[i][j] === 1 && (numberOfNeighbours === 2 || numberOfNeighbours === 3)) {
//                             // Any live cell with two or three live neighbours lives on to the next generation.
//                             newRow.push(1);
//                         } else {
//                             newRow.push(0);
//                         }
//                     } catch (ex) {
//                         console.warn(ex);
//                     }
//                 });
//                 newcellGrid.push(newRow);
//             });
//             cellGrid = newcellGrid;
        
//             drawCellcellGrid();
//             processGeneration();
//         }, 100);
//     };
    
    
//     const startGame = () => {
//         initializeCellcellGrid();
//         processGeneration();
//     };
    
//     startGame();
    
// };

export default GameOfLife;