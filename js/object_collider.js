'use strict';

/**
 * A helper object for determining whether two objects collide.
 */
class ObjectCollider {
  /**
   * Checks if an object collides with another object.
   * @param {Object} object1 - The first object.
   * @param {Object} object2 - The second object.
   * @return true if the objects collides, false if not.
   */
  objectsCollide(object1, object2) {
    var rect1left = object1.x;
    var rect1right = object1.x + object1.width;
    var rect1top = object1.y;
    var rect1bottom = object1.y + object1.height;

    var rect2left = object2.x;
    var rect2right = object2.x + object2.width;
    var rect2top = object2.y;
    var rect2bottom = object2.y + object2.height;

    if (rect1left >= rect2right) {
      return false;
    }
    else if (rect1right <= rect2left) {
      return false;
    }
    else if (rect1top >= rect2bottom) {
      return false;
    }
    else if (rect1bottom <= rect2top) {
      return false;
    }
    else {
      return true;
    }
  }
}
