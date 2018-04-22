'use strict';

class Grid2D {
  constructor(data, numCols) {
    this.data = data.slice();
    this.numCols = parseInt(numCols);
    this.numRows = this.data.length / this.numCols;
  }

  // Copying
  
  /**
   * Copies this object.
   * @return A shallow copy of the object.
   */
  copy() {
    return new Grid2D(this.data.slice(), parseInt(this.numCols));
  }

  // Querying Data
  getData() {
    var defensiveCopy = this.data.slice();
    return defensiveCopy;
  }

  isColRowInBounds(col, row) {
    if (col < 0) {
      return false;
    }
    else if (col > this.numCols) {
      return false;
    }
    else if (row < 0) {
      return false;
    }
    else if (row > this.data.length / this.numCols) {
      return false;
    }
    else {
      return true;
    }
  }

  getIndexForColAndRow(col, row) {
    return col + row * this.numCols;
  }

  indexForColAndRow(col, row) {
    return this.getIndexForColAndRow(col, row);
  }

  getValueAtIndex(index) {
    return this.data[index];
  }

  valueAtIndex(index) {
    return this.getValueAtIndex(index);
  }

  getValueAtColAndRow(col, row) {
    var index = this.getIndexForColAndRow(col, row);
    return this.getValueAtIndex(index);
  }

  valueAtColAndRow(col, row) {
    return this.getValueAtColAndRow(col, row);
  }

  // Modifying Data
  
  setValueAtIndex(value, index) {
    this.data[index] = value;
  }

  setValueAtColAndRow(value, col, row) {
    var index = this.indexForColAndRow(col, row);
    this.setValueAtIndex(value, index);
  }
}
