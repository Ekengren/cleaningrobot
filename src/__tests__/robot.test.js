import robot from '../js/robot'
import { expect, relativeToAbsolute } from './test-utils'

expect('robot to have function "runCleaningRobot"', typeof robot.runCleaningRobot === 'function');
expect('robot to have function "relativeToAbsolute"', typeof robot.relativeToAbsolute === 'function');
expect('function "relativeToAbsolute" to return an array', (function () {
  let result = robot.relativeToAbsolute({x:0, y:0}, ['N 2']);
  return Array.isArray(result);
})());
