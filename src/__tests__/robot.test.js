import robot from '../js/robot'
import { expect, vEq } from './test-utils'

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

expect('robot to have function "vectorSubtract"', typeof robot.vectorSubtract === 'function');
expect('function vectorSubtract to return the same vector if subtracting non overlapping vector', (function () {
  let pVector = {x1:0, y1:0, x2:0, y2:10};
  let nVector = {x1:3, y1:0, x2:3, y2:10};
  let result = robot.vectorSubtract(pVector, nVector);
  return vEq(result[0], pVector);
})());
expect('function vectorSubtract to return two vectors if the vectors overlap in the middle', (function () {
  let pVector = {x1:3, y1:0, x2:3, y2:10};
  let nVector = {x1:0, y1:6, x2:10, y2:6};
  let result = robot.vectorSubtract(pVector, nVector);
  return vEq(result[0], {x1:3, y1:0, x2:3, y2:5}) && vEq(result[1], {x1:3, y1:7, x2:3, y2:10});
})());
expect('function vectorSubtract to return an empty array if subtracting completely overlapping vector', (function () {
  let pVector = {x1:3, y1:1, x2:3, y2:10};
  let nVector = {x1:3, y1:0, x2:3, y2:17};
  let result = robot.vectorSubtract(pVector, nVector);
  return result.length === 0;
})());

expect('robot to have function "subtractMultiple"', typeof robot.subtractMultiple === 'function');
expect('function subtractMultiple to return the same vector if subtracting non overlapping vectors', (function () {
  let pVector = {x1:0, y1:0, x2:0, y2:10};
  let nVector1 = {x1:3, y1:0, x2:3, y2:10};
  let nVector2 = {x1:4, y1:0, x2:4, y2:10};
  let nVector3 = {x1:5, y1:0, x2:5, y2:10};
  let result = robot.subtractMultiple(pVector, [nVector1, nVector2, nVector3]);
  return vEq(result[0], pVector);
})());
expect('function subtractMultiple to return multiple vectors if subtracting overlapping vectors', (function () {
  let pVector = {x1:0, y1:5, x2:10, y2:5};
  let nVector1 = {x1:2, y1:0, x2:2, y2:10};
  let nVector2 = {x1:6, y1:0, x2:6, y2:10};
  let result = robot.subtractMultiple(pVector, [nVector1, nVector2]);
  return result.length === 3;
})());
