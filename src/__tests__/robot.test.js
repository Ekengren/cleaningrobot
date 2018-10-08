import robot, {generateStartVector} from '../js/robot'
import { expect, vEq } from './test-utils'

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
  let result = robot.relativeToAbsolute({x:0, y:0}, ['N 2', 'E 2', 'S 2', 'W 2']);
  return vEq(result[0], {x1:0.5, y1:1, x2:0.5, y2:3}) &&
    vEq(result[1], {x1:1, y1:2.5, x2:3, y2:2.5}) &&
    vEq(result[2], {x1:2.5, y1:2, x2:2.5, y2:0}) &&
    vEq(result[3], {x1:2, y1:0.5, x2:0, y2:0.5});
})());


expect('robot to have function "alignVectors"', typeof robot.alignVectors === 'function');
expect('function "alignVectors" to return an array', (function () {
  let result = robot.alignVectors([{x1:0.5, y1:10, x2:0.5, y2:0}]);
  return Array.isArray(result);
})());
expect('function "alignVectors" to return an array of the correct size', (function () {
  let result = robot.alignVectors([{x1:0.5, y1:10, x2:0.5, y2:0}]);
  return result.length === 1;
})());
expect('function "alignVectors" to return an array aligned vectors', (function () {
  let result = robot.alignVectors([{x1:0.5, y1:10, x2:0.5, y2:0}]);
  return vEq(result[0], {x1:0.5, y1:0, x2:0.5, y2:10});
})());


expect('robot to have function "isVertical"', typeof robot.isVertical === 'function');
expect('function "isVertical" to return a boolean', typeof robot.isVertical({x1: 0, y1: 0, x2: 0, y2: 17}) === 'boolean');


expect('robot to have function "calculateArea"', typeof robot.calculateArea === 'function');
expect('function "calculateArea" to return correct area from single vector', robot.calculateArea([{x1: 0.5, y1: 0, x2: 0.5, y2: 17}]) === 17);
expect('function "calculateArea" to return correct area from multiple vectors',
  robot.calculateArea([{x1: 0.5, y1: 0, x2: 0.5, y2: 17}, {x1: -5, y1: 1.5, x2: 5, y2: 1.5}]) === 27);


expect('robot to have function "vectorSubtract"', typeof robot.vectorSubtract === 'function');
expect('function vectorSubtract to return the same vector if subtracting non overlapping vector', (function () {
  let pVector = {x1:0.5, y1:0, x2:0.5, y2:10};
  let nVector = {x1:3.5, y1:0, x2:3.5, y2:10};
  let result = robot.vectorSubtract(pVector, nVector);
  return vEq(result[0], pVector);
})());
expect('function vectorSubtract to return two vectors if the vectors overlap in the middle', (function () {
  let pVector = {x1:1.5, y1:0, x2:1.5, y2:3};
  let nVector = {x1:0, y1:1.5, x2:3, y2:1.5};
  let result = robot.vectorSubtract(pVector, nVector);
  return vEq(result[0], {x1:1.5, y1:0, x2:1.5, y2:1}) && vEq(result[1], {x1:1.5, y1:2, x2:1.5, y2:3});
})());
expect('function vectorSubtract to return a shorter vector if the n vector overlap the start of p vector', (function () {
  let pVector = {x1:1.5, y1:0, x2:1.5, y2:3};
  let nVector = {x1:0, y1:0.5, x2:3, y2:0.5};
  let result = robot.vectorSubtract(pVector, nVector);
  return vEq(result[0], {x1:1.5, y1:1, x2:1.5, y2:3});
})());
expect('function vectorSubtract to return a shorter vector if the n vector overlap the end of p vector', (function () {
  let pVector = {x1:1.5, y1:0, x2:1.5, y2:3};
  let nVector = {x1:0, y1:2.5, x2:3, y2:2.5};
  let result = robot.vectorSubtract(pVector, nVector);
  return vEq(result[0], {x1:1.5, y1:0, x2:1.5, y2:2});
})());
expect('function vectorSubtract to return an empty array if subtracting a completely overlapping vector', (function () {
  let pVector = {x1:1.5, y1:1, x2:1.5, y2:2};
  let nVector = {x1:1.5, y1:0, x2:1.5, y2:3};
  let result = robot.vectorSubtract(pVector, nVector);
  return result.length === 0;
})());


expect('robot to have function "subtractMultiple"', typeof robot.subtractMultiple === 'function');
expect('function subtractMultiple to return the same vector if subtracting non overlapping vectors', (function () {
  let pVector = {x1:0.5, y1:0, x2:0.5, y2:10};
  let nVector1 = {x1:3.5, y1:0, x2:3.5, y2:10};
  let nVector2 = {x1:4.5, y1:0, x2:4.5, y2:10};
  let nVector3 = {x1:5.5, y1:0, x2:5.5, y2:10};
  let result = robot.subtractMultiple(pVector, [nVector1, nVector2, nVector3]);
  return vEq(result[0], pVector);
})());
expect('function subtractMultiple to return multiple vectors if subtracting overlapping vectors', (function () {
  let pVector  = {x1:0.5, y1:0, x2:0.5, y2:5};
  let nVector1 = {x1:0, y1:1.5, x2:3, y2:1.5};
  let nVector2 = {x1:0, y1:3.5, x2:3, y2:3.5};
  let result = robot.subtractMultiple(pVector, [nVector1, nVector2]);
  return result.length === 3;
})());
expect('function subtractMultiple to return an empty array if subtracting with completely overlapping vectors', (function () {
  let pVector  = {x1:0.5, y1:0, x2:0.5, y2:2};
  let nVector1 = {x1:0, y1:0.5, x2:3, y2:0.5};
  let nVector2 = {x1:0, y1:1.5, x2:3, y2:1.5};
  let result = robot.subtractMultiple(pVector, [nVector1, nVector2]);
  return result.length === 0;
})());


expect('robot to have function "generateOptimalVectors"', typeof robot.generateOptimalVectors === 'function');
expect('function generateOptimalVectors to return non overlapping vectors from overlapping vectors', (function () {
  let vector1 = {x1:5, y1:0.5, x2:10, y2:0.5};
  let vector2 = {x1:0, y1:0.5, x2:10, y2:0.5};
  let result = robot.generateOptimalVectors([vector1, vector2]);
  return vEq(result[0], vector1) && vEq(result[1], {x1:0, y1:0.5, x2:5, y2:0.5});
})());


expect('robot to have function "generateStartVector"', typeof robot.generateStartVector === 'function');
expect('function generateStartVector to return correct start vector', (function () {
  let startPos = {x:5, y:0};
  let result = robot.generateStartVector(startPos);
  return vEq(result, {x1:5.5, y1:0, x2:5.5, y2:1});
})());


expect('robot to have function "runCleaningRobot"', typeof robot.runCleaningRobot === 'function');
expect('function runCleaningRobot to return correct area for simple input', (function () {
  let simpleInput = {
    startPosition: {x: 10, y: 22},
    moves: ['E 2', 'N 1']
  };

  let result = robot.runCleaningRobot(simpleInput);
  return result === 4;
})());
expect('function runCleaningRobot to return correct area for complex input', (function () {
  let simpleInput = {
    startPosition: {x: 0, y: 2},
    moves: ['E 2', 'S 2', 'W 2', 'N 2']
  };
  let result = robot.runCleaningRobot(simpleInput);
  return result === 8;
})());
expect('function runCleaningRobot to return correct area for large input', (function () {
  let ring = ['N 2', 'E 2', 'S 2', 'W 2'];
  for (let i=0; i<9; i++) {
    ring = ring.concat(ring);
  }
  let largeInput = {
    startPosition: {x: 0, y: 0},
    moves: ring
  };

  let result = robot.runCleaningRobot(largeInput);
  return result === 8;
})());


expect('robot to have function "commenceCleaning"', typeof robot.commenceCleaning === 'function');
expect('function commenceCleaning to return correct area for simple input', (function () {
  let simpleInput = {
    startPosition: '10 22',
    moves: ['E 2', 'N 1']
  };
  let result = robot.commenceCleaning(simpleInput);
  return result === 4;
})());
