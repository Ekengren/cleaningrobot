/**
 * Converts relative move commands to absolute vectors.
 * @param startPosition [Object] format {x: integer, y: integer}
 * @param relativeMoves [Array] Array of strings of format ['N 2', 'E 17']
 * @returns [Object] Returns an array of vector objects [{x1: integer, y1: integer, x2: integer, y2: integer}]
 */
export function relativeToAbsolute(startPosition, relativeMoves) {
  return [];
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
  relativeToAbsolute
}
