/**
 * Converts relative move commands to absolute vectors.
 * @param startPosition [Object] format {x: integer, y: integer}
 * @param relativeMoves [Array] Array of strings of format ['N 2', 'E 17']
 * @returns [Object] Returns an array of vector objects [{x1: integer, y1: integer, x2: integer, y2: integer}]
 */
export function relativeToAbsolute(startPosition, relativeMoves) {
  let cursor = {x: startPosition.x + 0.5, y: startPosition.y + 0.5};

  return relativeMoves.map(move => {
    let vectorLength = Number.parseInt(move.match(/\d+/)[0], 10);
    let absoluteVector;
    let nextCursor;

    if (move.match(/[N]/) !== null) {
      nextCursor = {x: cursor.x, y: cursor.y + vectorLength};
      absoluteVector = {
        x1: cursor.x,
        y1: cursor.y + 0.5,
        x2: cursor.x,
        y2: cursor.y + vectorLength + 0.5
      };
    }
    if (move.match(/[S]/) !== null) {
      nextCursor = {x: cursor.x, y: cursor.y - vectorLength};
      absoluteVector = {
        x1: cursor.x,
        y1: cursor.y - 0.5,
        x2: cursor.x,
        y2: cursor.y - vectorLength - 0.5
      };
    }
    if (move.match(/[E]/) !== null) {
      nextCursor = {x: cursor.x + vectorLength, y: cursor.y};
      absoluteVector = {
        x1: cursor.x + 0.5,
        y1: cursor.y,
        x2: cursor.x + vectorLength + 0.5,
        y2: cursor.y
      };
    }
    if (move.match(/[W]/) !== null) {
      nextCursor = {x: cursor.x - vectorLength, y: cursor.y};
      absoluteVector = {
        x1: cursor.x - 0.5,
        y1: cursor.y,
        x2: cursor.x - vectorLength - 0.5,
        y2: cursor.y
      };
    }
    cursor = nextCursor;
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

  return totalArea;
}


/**
 * Subtracts one vector from another, returning an array of 0, 1 or 2 vectors
 * @param v1 Vector to subtract from
 * @param v2 Vector to subtract with
 * @returns [Object] An array of vector objects
 */
export function vectorSubtract (v1, v2) {
  if (isVertical(v1) && isVertical(v2)) {
    if (v1.x1 !== v2.x1 || // Does not share same x
      v1.y1 >= v2.y2 ||    // v2 below v1
      v1.y2 <= v2.y1) {    // v2 above v1
      return [v1];
    }

    if (v2.x1 <= v1.x1 && v2.x2 >= v1.x2) { // v2 completely covers v1
      return [];
    }

    if (v1.y1 < v2.y2 && v2.y1 <= v1.y1) { // Start of v1 covered by end of v2
      return [{                            //  1           1
        x1: v1.x1,                         //  1           1
        y1: v2.y2,                         //  1  2        1 2
        x2: v1.x2,                         //  1  2   or   1 2
        y2: v1.y2,                         //  1  2        1 2
      }];                                  //     2
    }                                      //     2

    if (v1.y2 > v2.y1 && v2.y2 >= v1.y2) { // Start of v2 covering end of v1
      return [{                            //    2
        x1: v1.x1,                         //    2
        y1: v1.y1,                         //  1 2        1 2
        x2: v1.x2,                         //  1 2   or   1 2
        y2: v2.y1,                         //  1 2        1 2
      }];                                  //  1          1
    }                                      //  1          1

    if (v2.y1 <= v1.y1 && v2.y2 >= v1.y2) { // v2 completely covers v1
      return [];
    }

    // v2 is in the middle of v1
    return [
      {
        x1: v1.x1,   //  1
        y1: v1.y1,   //  1
        x2: v1.x1,   //  1 2
        y2: v2.y1,   //  1 2
      },             //  1 2
      {              //  1 2
        x1: v1.x1,   //  1 2
        y1: v2.y2,   //  1
        x2: v1.x1,   //  1
        y2: v1.y2,   //  1
      },
    ];
  } else  if (!isVertical(v1) && !isVertical(v2)) {
    if (v1.y1 !== v2.y1 || // Does not share same y
      v2.x2 <= v1.x1 ||    // v2 to the left of v1
      v1.x2 <= v2.x1) {    // v1 to the left of v2
      return [v1];
    }

    if (v1.x1 < v2.x2 && v2.x1 <= v1.x1) { // End of v2 covering start of v1
      return [{       //
        x1: v2.x2,    //
        y1: v1.y1,    //   222222                  222
        x2: v1.x2,    //      1111111      or      11111111
        y2: v1.y2,    //
      }];             //
    }

    if (v1.x2 > v2.x1 && v2.x2 >= v1.x2) { // Start of v2 covering end of v1
      return [{       //
        x1: v1.x1,    //
        y1: v1.y1,    //        2222222                   222
        x2: v2.x1,    //   11111111         or     1111111111
        y2: v1.y2,    //
      }];             //
    }

    return [ // v1 completely covers v2
      {
        x1: v1.x1,
        y1: v1.y1,
        x2: v2.x1,
        y2: v1.y2,
      },             //   11111111111
      {              //       2222
        x1: v2.x2,
        y1: v1.y1,
        x2: v1.x2,
        y2: v1.y2,
      },
    ];
  } else {  // Perpendicular vectors
    if (isVertical(v1)) {
      if (v2.x2 < v1.x1 || // v2 left of v1
        v1.x1 < v2.x1 ||   // v1 left of v2
        v2.y1 < v1.y1 ||   // v2 below of v1
        v1.y2 < v2.y1) {   // v1 below of v1
        return [v1];
      }

      // They are crossing at exactly one square
      if (v1.y2 - v1.y1 === 1) { // v1 is only one square and will be completely crossed out
        return [];
      }

      if (v1.y2 === v2.y1 + 0.5) {// v2 covers end of v1 -> cut last square
        return [{
          x1: v1.x1,
          y1: v1.y1,
          x2: v1.x1,
          y2: v1.y2 - 1,
        }]
      }

      if (v1.y1 === v2.y1 - 0.5) {// v2 covers start of v1 -> cut first square
        return [{
          x1: v1.x1,
          y1: v1.y1 + 1,
          x2: v1.x2,
          y2: v1.y2,
        }]
      }

      // Cut v1 in half
      return [
        {
          x1: v1.x1,
          y1: v1.y1,
          x2: v1.x2,
          y2: v2.y1 - 0.5,
        },
        {
          x1: v1.x1,
          y1: v2.y1 + 0.5,
          x2: v1.x2,
          y2: v1.y2,
        }
      ]
    } else {
      if (v1.y1 > v2.y2 || // v1 above of v2
        v1.y1 < v2.y1 ||   // v1 below of v2
        v1.x2 < v2.x1 ||   // v1 left of v2
        v1.x1 > v2.x1) {   // v1 right of v2
        return [v1];
      }

      // They are crossing at exactly one square
      if (v1.x2 - v1.x1 === 1) { // v1 is only one square and will be completely crossed out
        return [];
      }


      if (v1.x1 === v2.x1 - 0.5) { // v2 covers start of v1 -> cut first square
        return [{
          x1: v1.x1 + 1,
          y1: v1.y1,
          x2: v1.x2,
          y2: v1.y2,
        }]
      }

      if (v1.x2 === v2.x2 + 0.5) {// v2 covers end of v1 -> cut last square
        return [{
          x1: v1.x1,
          y1: v1.y1,
          x2: v2.x1 - 1,
          y2: v1.y2,
        }]
      }

      // Cut v1 in half
      return [
        {
          x1: v1.x1,
          y1: v1.y1,
          x2: v2.x1 - 0.5,
          y2: v1.y2,
        },
        {
          x1: v2.x1 + 0.5,
          y1: v1.y1,
          x2: v1.x2,
          y2: v1.y2,
        }
      ]
    }
  }
}


/**
 * Subtracts multiple vectors from the source vector. Expects vectors to be positively aligned.
 * @param srcVector
 * @param vectorArray
 * @returns {*}
 */
export function subtractMultiple(srcVector, vectorArray) {
  if (vectorArray.length === 0) {
    return [srcVector];
  }

  let currentVector = vectorArray[0];

  let subRes = vectorSubtract(srcVector, currentVector);

  if (vectorArray.length === 1) { // We are done
    return subRes;
  }

  if (subRes.length === 0) { // srcVector completely subtracted
    return [];
  }

  if (subRes.length === 1) {
    return subtractMultiple(subRes[0], vectorArray.slice(1));
  }

  // We got two vectors, gotta start over
  let part1 = subtractMultiple(subRes[0], vectorArray.slice(1));
  let part2 = subtractMultiple(subRes[1], vectorArray.slice(1));
  return part1.concat(part2);
}


/**
 * Takes an array of vectors and return an array of vectors guaranteed not to overlap
 * @param moveVectors
 * @returns {Array}
 */
export function generateOptimalVectors(moveVectors) {
  let nonOverlapVectors = [];

  moveVectors.forEach(vector => {
    let subtractedVectorArr = subtractMultiple(vector, nonOverlapVectors);

    nonOverlapVectors = nonOverlapVectors.concat(subtractedVectorArr);
  });
  return nonOverlapVectors;
}


/**
 * Generates a start vector to simulate that the starting tile is cleaned. Start position of {x: 3, y: 5}
 * will generate the vector {x1: 3.5, y1: 3, x2: 3.5, y2: 4}
 * @param startPos
 * @returns {{x1: number, y1: number, x2: number, y2: number}}
 */
export function generateStartVector(startPos) {
  return {x1: startPos.x + 0.5, y1: startPos.y, x2: startPos.x + 0.5, y2: startPos.y + 1};
}


/**
 * Simulation of cleaning robot.
 *
 * @param params [Object] Instruction for cleaning robot. Example:
 * {
 *    startPosition: {10, 22},
 *    moves: ['E 2', 'N 1'],
 * }
 * @returns {Number} Area cleaned
 */
export function runCleaningRobot(params) {
  let moveVectors = relativeToAbsolute(params.startPosition, params.moves);
  moveVectors = alignVectors(moveVectors);
  moveVectors.push(generateStartVector(params.startPosition));

  let nonOverlapVectors = generateOptimalVectors(moveVectors);
  let cleanedArea = calculateArea(nonOverlapVectors);

  return cleanedArea;
}


/**
 * Terminal version with alternate input method for cleaning robot and some console output.
 *
 * @param params example:
 * {
 *  numberOfCommands: 2,
 *  startPosition: '10 22',
 *  moves: [
 *    'E 2', 'N 1'
 *  ],
 * }
 *
 * Note that parameter numberOfCommands is not really needed
 */
function commenceCleaning(params) {
  let startTime = new Date();
  let result = runCleaningRobot({
    startPosition: {
      x: Number.parseInt(params.startPosition.split(' ')[0], 10),
      y: Number.parseInt(params.startPosition.split(' ')[1], 10)
    },
    moves: params.moves,
  });

  console.log(`Total area cleaned: ${result}`);
  console.log(`Compute time: ${new Date() - startTime}ms`);

  return result;
}


export default {
  runCleaningRobot,
  relativeToAbsolute,
  alignVectors,
  isVertical,
  calculateArea,
  vectorSubtract,
  subtractMultiple,
  generateOptimalVectors,
  generateStartVector,
  runCleaningRobot,
  commenceCleaning,
}
