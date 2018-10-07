/**
 * Converts relative move commands to absolute vectors.
 * @param startPosition [Object] format {x: integer, y: integer}
 * @param relativeMoves [Array] Array of strings of format ['N 2', 'E 17']
 * @returns [Object] Returns an array of vector objects [{x1: integer, y1: integer, x2: integer, y2: integer}]
 */
export function relativeToAbsolute(startPosition, relativeMoves) {
  let currentPos = startPosition;

  return relativeMoves.map(move => {
    let vectorLength = Number.parseInt(move.match(/\d+/)[0], 10);
    let absoluteVector;

    if (move.match(/[NS]/) !== null) { // Test if vertical
      absoluteVector = {
        x1: currentPos.x,
        y1: currentPos.y,
        x2: currentPos.x,
        y2: move.match(/[N]/) ? currentPos.y + vectorLength : currentPos.y - vectorLength
      };
    } else {
      absoluteVector = {
        x1: currentPos.x,
        y1: currentPos.y,
        x2: move.match(/[E]/) ? currentPos.x + vectorLength : currentPos.x - vectorLength,
        y2: currentPos.y
      };
    }
    currentPos = {x: absoluteVector.x2, y: absoluteVector.y2};
    return absoluteVector;
  });
}


/**
 * Aligns vectors to always point in positive direction
 * @param vectorArray
 * @returns [Object] An array of vectors
 */
export function alignVectors(vectorArray) {
  return vectorArray.map(v => {
    let av = {};

    if (v.x1 < v.x2) {
      av.x1 = v.x1;
      av.x2 = v.x2;
    } else {
      av.x1 = v.x2;
      av.x2 = v.x1;
    }
    if (v.y1 < v.y2) {
      av.y1 = v.y1;
      av.y2 = v.y2;
    } else {
      av.y1 = v.y2;
      av.y2 = v.y1;
    }
    return av;
  });
}


/**
 * Returns true if given vector is vertical.
 * @param v
 * @returns {boolean}
 */
export function isVertical (v) {
  return v.x1 === v.x2;
}


/**
 * Calculates total area for given vector array. Overlapped tiles are not considered.
 * @param [Object] vectorArray an array of vectors
 * @returns {Number} Total area
 */
export function calculateArea(vectorArray) {
  let totalArea = vectorArray.reduce((memo, vector) => {
    if (isVertical(vector)) {
      return memo + vector.y2 - vector.y1;
    } else {
      return memo + vector.x2 - vector.x1;
    }
  }, 0);

  return totalArea + 1; // Add one for start square
}


/**
 * Subtracts one vector from another, returning an array of 0, 1 or 2 vectors
 * @param v1 Vector to subtract from
 * @param v2 Vector to subtract with
 * @returns [Object] An array of vector objects
 */
export function vectorSubtract (v1, v2) {
  if (isVertical(v1) && isVertical(v2)) {
    if (v1.x1 !== v2.x1) { // Does not share same x
      return [v1];
    }

    if (v1.y1 > v2.y2) { // v2 below v1
      return [v1];
    }

    if (v1.y2 < v2.y1) { // v2 above v1
      return [v1];
    }

    if (v1.y2 > v2.y2 && v1.y1 > v2.y1) { // End of v2 covering start of v1
      return [{
        x1: v1.x1,
        y1: v2.y2,
        x2: v1.x2,
        y2: v1.y2,
      }];
    }

    if (v1.y1 < v2.y1 && v1.y2 < v2.y2) { // End of v1 covering start of v2
      return [{
        x1: v1.x1,
        y1: v1.y1,
        x2: v1.x2,
        y2: v2.y1,
      }];
    }

    if (v1.y1 >= v2.y1 && v1.y2 <= v2.y2) { // v2 completely covers v1
      return [];
    }

    // v2 is in the middle of v1
    return [
      {
        x1: v1.x1,
        y1: v1.y1,
        x2: v1.x1,
        y2: v2.y1,
      },
      {
        x1: v1.x1,
        y1: v2.y2,
        x2: v1.x1,
        y2: v1.y2,
      },
    ];
  } else  if (!isVertical(v1) && !isVertical(v2)) {
    if (v1.y1 !== v2.y1) { // Does not share same x
      return [v1];
    }

    if (v1.x1 > v2.x2) { // v2 below v1
      return [v1];
    }

    if (v1.x2 < v2.x1) { // v2 above v1
      return [v1];
    }

    if (v1.x2 > v2.x2 && v1.x1 > v2.x1) { // End of v2 covering start of v1
      return [{
        x1: v2.x2,
        y1: v1.y1,
        x2: v1.x2,
        y2: v1.y1,
      }];
    }

    if (v1.x1 < v2.x1 && v1.x2 < v2.x2) { // End of v1 covering start of v2
      return [{
        x1: v1.x1,
        y1: v1.y1,
        x2: v2.x1,
        y2: v1.y1,
      }];
    }

    if (v1.x1 >= v2.x1 && v1.x2 <= v2.x2) { // v2 completely covers v1
      return [];
    }

    return [ // v1 completely covers v2
      {
        x1: v1.x1,
        y1: v1.y1,
        x2: v2.x1,
        y2: v1.y1,
      },
      {
        x1: v2.x2,
        y1: v1.y1,
        x2: v1.x2,
        y2: v1.y1,
      },
    ];
  } else {
    if (isVertical(v1)) {
      if (v2.x2 < v1.x1) { // v2 left of v1
        return [v1];
      }
      if (v2.x1 > v1.x1) { // v2 right of v1
        return [v1];
      }
      if (v2.y1 < v1.y1) { // v2 below of v1
        return [v1];
      }
      if (v2.y1 > v1.y2) { // v2 above of v1
        return [v1];
      }

      // They are crossing at exactly one square
      if (v1.y1 === v2.y1) {// v2 covers start of v1 -> cut first square
        return [{
          x1: v1.x1,
          y1: v1.y1 /*+ 1*/,
          x2: v1.x1,
          y2: v1.y2,
        }]
      }

      if (v1.y2 === v2.y1) {// v2 covers end of v1 -> cut last square
        return [{
          x1: v1.x1,
          y1: v1.y1,
          x2: v1.x1,
          y2: v1.y2 - 1,
        }]
      }

      // Cut v1 in half
      return [
        {
          x1: v1.x1,
          y1: v1.y1,
          x2: v1.x1,
          y2: v2.y1 - 1,
        },
        {
          x1: v1.x1,
          y1: v2.y1 + 1,
          x2: v1.x1,
          y2: v1.y2,
        }
      ]
    } else {
      if (v1.x2 < v2.x1) { // v1 left of v2
        return [v1];
      }
      if (v1.x1 > v2.x1) { // v1 right of v2
        return [v1];
      }
      if (v1.y1 < v2.y1) { // v1 below of v2
        return [v1];
      }
      if (v1.y1 > v2.y2) { // v1 above of v2
        return [v1];
      }
      // They are crossing at exactly one square
      if (v1.x1 === v2.x1) {// v2 covers start of v1 -> cut first square
        return [{
          x1: v1.x1 /*+ 1*/,
          y1: v1.y1,
          x2: v1.x2,
          y2: v1.y2,
        }]
      }

      if (v1.x2 === v2.x2) {// v2 covers end of v1 -> cut last square
        return [{
          x1: v1.x1,
          y1: v1.y1,
          x2: v2.x1 /*- 1*/,
          y2: v1.y2,
        }]
      }

      // Cut v1 in half
      return [
        {
          x1: v1.x1,
          y1: v2.y1,
          x2: v2.x1 - 1,
          y2: v1.y2,
        },
        {
          x1: v2.x1 + 1,
          y1: v1.y1,
          x2: v1.x2,
          y2: v1.y2,
        }
      ]
    }
  }
}


/**
 *
 * @param params [Object] Instruction for cleaning robot. Example:
 * {
 *  numberOfCommands: 2,
 *  startPosition: {10, 22},
 *  moves: [
 *    'E 2', 'N 1'
 *  ],
 * }
 */
function runCleaningRobot(params) {

}

export default {
  runCleaningRobot,
  relativeToAbsolute,
  alignVectors,
  isVertical,
  calculateArea,
  vectorSubtract,
}
