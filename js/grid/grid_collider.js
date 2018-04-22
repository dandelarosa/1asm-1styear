'use strict';

// Should use 
const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

class GridCollider {
  constructor(grid) {
    this.grid = grid;
  }

  /**
   * Handles collisions with the given object.
   * @param {Object} physicsObject - The object for which to detect collisions. This object's properties will be modified if a collision is detected.
   */
  handleCollisionsWith(physicsObject) {
    var topY = physicsObject.y;
    var bottomY = physicsObject.y + physicsObject.height;
    var leftX = physicsObject.x;
    var rightX = physicsObject.x + physicsObject.width;
    var futureTopY = topY + physicsObject.dy;
    var futureBottomY = bottomY + physicsObject.dy;
    var futureLeftX = leftX + physicsObject.dx;
    var futureRightX = rightX + physicsObject.dx;

    // If future top side is inside a wall, push to row below
    if (physicsObject.dy < 0 && this.isSolidAtPoint(leftX, futureTopY)) {
      physicsObject.y = Math.floor(physicsObject.y / TILE_HEIGHT) * TILE_HEIGHT;
      physicsObject.dy = 0;
    }
    else if (physicsObject.dy < 0 && this.isSolidAtPoint(rightX - 1, futureTopY)) {
      physicsObject.y = Math.floor(physicsObject.y / TILE_HEIGHT) * TILE_HEIGHT;
      physicsObject.dy = 0;
    }
    // If future bottom side is inside a wall, push to row above
    else if (physicsObject.dy > 0 && this.isSolidAtPoint(leftX, futureBottomY)) {
      physicsObject.y = (Math.floor(futureBottomY / TILE_HEIGHT)) * TILE_HEIGHT - physicsObject.height;
      physicsObject.onGround = true;
      physicsObject.dy = 0;
    }
    else if (physicsObject.dy > 0 && this.isSolidAtPoint(rightX - 1, futureBottomY)) {
      physicsObject.y = (Math.floor(futureBottomY / TILE_HEIGHT)) * TILE_HEIGHT - physicsObject.height;
      physicsObject.onGround = true;
      physicsObject.dy = 0;
    }
    else if (this.isSolidAtPoint(physicsObject.x, physicsObject.y + physicsObject.height + 2) == 0) {
      physicsObject.onGround = false;
    }

    // If left side is already inside a wall, push to the column to the right
    if (physicsObject.dx < 0 && (this.isSolidAtPoint(futureLeftX, topY))) {
      physicsObject.x = Math.floor(leftX / TILE_WIDTH) * TILE_WIDTH;
      this.handleHorizontalCollisions(physicsObject);
    }
    else if (physicsObject.dx < 0 && (this.isSolidAtPoint(futureLeftX, bottomY - 1))) {
      physicsObject.x = Math.floor(leftX / TILE_WIDTH) * TILE_WIDTH;
      this.handleHorizontalCollisions(physicsObject);
    }
    // If right side is already inside a wall, push to the column to the left
    else if (physicsObject.dx > 0 && (this.isSolidAtPoint(futureRightX, topY))) {
      physicsObject.x = Math.ceil(rightX / TILE_WIDTH) * TILE_WIDTH - physicsObject.width;
      this.handleHorizontalCollisions(physicsObject);
    }
    else if (physicsObject.dx > 0 && (this.isSolidAtPoint(futureRightX, bottomY - 1))) {
      physicsObject.x = Math.ceil(rightX / TILE_WIDTH) * TILE_WIDTH - physicsObject.width;
      this.handleHorizontalCollisions(physicsObject);
    }
  }

  handleHorizontalCollisions(physicsObject) {
    if (physicsObject.bouncesHorizontal) {
      physicsObject.dx *= -1;
    }
    else {
      physicsObject.dx = 0;
    }
  }

  /**
   * Checks if the tile at the given point is solid.
   * @param {number} x - The x position to check.
   * @param {number} y - The y position to check.
   * @returns {boolean} true if the tile is solid, false if not.
   */
  isSolidAtPoint(x, y) {
    var tileValue = this.tileValueAtPoint(x, y);
    // Should check for specific tile types
    return tileValue > 0;
  }

  /**
   * Gets the value of the tile at the given point.
   * @param {number} x - The x position to check.
   * @param {number} y - The y position to check.
   * @returns {number} The tile value at the given point.
   */
   tileValueAtPoint(x, y) {
    var col = Math.floor(x / TILE_WIDTH);
    var row = Math.floor(y / TILE_HEIGHT);

    if(col < 0 || col >= this.grid.numCols ||
       row < 0 || row >= this.grid.numRows) {
       return undefined;
    }

    return this.grid.valueAtColAndRow(col, row);
  }
}

