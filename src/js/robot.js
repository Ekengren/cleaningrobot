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
}
