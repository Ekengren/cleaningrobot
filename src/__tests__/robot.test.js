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

expect('robot to have function "alignVectors"', typeof robot.alignVectors === 'function');
expect('function "alignVectors" to return an array', (function () {
  let result = robot.alignVectors([{x1:0, y1:10, x2:0, y2:0}]);
  return Array.isArray(result);
})());
expect('function "alignVectors" to return an array of the correct size', (function () {
  let result = robot.alignVectors([{x1:0, y1:10, x2:0, y2:0}]);
  return result.length === 1;
})());
expect('function "alignVectors" to return an array aligned vectors', (function () {
  let result = robot.alignVectors([{x1:0, y1:10, x2:0, y2:0}]);
  return result[0].x1 === 0 &&
    result[0].y1 === 0 &&
    result[0].x2 === 0 &&
    result[0].y2 === 10;
})());

expect('robot to have function "isVertical"', typeof robot.isVertical === 'function');
expect('function "isVertical" to return a boolean', typeof robot.isVertical({x1: 0, y1: 0, x2: 0, y2: 17}) === 'boolean');

expect('robot to have function "calculateArea"', typeof robot.calculateArea === 'function');
expect('function "calculateArea" to return correct area', robot.calculateArea([{x1: 0, y1: 0, x2: 0, y2: 17}]) === 18);
