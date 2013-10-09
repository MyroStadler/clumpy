function clumpy_grid_Grid(nCols, nRows, cellSizeX, cellSizeY) {
    this.nCols = nCols ? nCols : 0; 
    this.nRows = nRows ? nRows : 0; 
    this.cellSizeX = cellSizeX ? cellSizeX : 0; 
    this.cellSizeY = cellSizeY ? cellSizeY : 0; 
}
clumpy_grid_Grid.prototype.getRowNumber = function(cellNumber){
    return Math.ceil(cellNumber / this.nCols);
};
clumpy_grid_Grid.prototype.getColNumber = function(cellNumber){
    return ((cellNumber - 1) % this.nCols) + 1;
};
clumpy_grid_Grid.prototype.getCellNumber = function(colNumber, rowNumber){
    return ((rowNumber - 1) * this.nCols) + colNumber;
};
clumpy_grid_Grid.prototype.getRowIndex = function(cellIndex){
    return Math.floor(cellIndex / this.nCols);
};
clumpy_grid_Grid.prototype.getColIndex = function(cellIndex){
    return cellIndex % this.nCols;
};
clumpy_grid_Grid.prototype.getCellIndex = function(colIndex, rowIndex){
    return (rowIndex * this.nCols) + colIndex; 
};
clumpy_grid_Grid.prototype.getRectByCellIndex = function(cellIndex){
    var colIndex = this.getColIndex(cellIndex);
    var rowIndex = this.getRowIndex(cellIndex);
    return {x:this.cellSizeX * colIndex, y:this.cellSizeY * rowIndex, width:this.cellSizeX, height:this.cellSizeY}; 
};
clumpy_grid_Grid.prototype.getRectByIndices = function(colIndex, rowIndex){
    return {x:this.cellSizeX * colIndex, y:this.cellSizeY * rowIndex, width:this.cellSizeX, height:this.cellSizeY}; 
};
clumpy_grid_Grid.prototype.getRectByNumbers = function(colNumber, rowNumber){
    return {x:this.cellSizeX * (colNumber - 1), y:this.cellSizeY * (rowNumber - 1), width:this.cellSizeX, height:this.cellSizeY}; 
};
