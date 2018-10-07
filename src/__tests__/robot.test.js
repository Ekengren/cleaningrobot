import robot from '../js/robot'
import { expect } from './test-utils'

expect('robot to have function "runCleaningRobot"', typeof robot.runCleaningRobot === 'function');
expect('robot to have function "relativeToAbsolute"', typeof robot.relativeToAbsolute === 'function');

expect('function "relativeToAbsolute" to return an array', (function () {
  let result = robot.relativeToAbsolute({x:0, y:0}, ['N 2']);
  return Array.isArray(result);
})());
expect('function "relativeToAbsolute" to return correct number of vector objects', (function () {
  let result = robot.relativeToAbsolute({x:0, y:0}, ['N 2', 'E 3', 'S 2']);
  return result.length === 3;
})());
expect('function "relativeToAbsolute" to return correct vector objects', (function () {
  let result = robot.relativeToAbsolute({x:0, y:0}, ['N 2', 'E 3', 'S 2']);
  return result[1].x1 === 0 &&
    result[1].y1 === 2 &&
    result[1].x2 === 3 &&
    result[1].y2 === 2;
})());
