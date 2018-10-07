import robot from '../js/robot'
import { expect } from './test-utils'

expect('robot to have function "runCleaningRobot"', typeof robot.runCleaningRobot === 'function');
expect('robot to have function "relativeToAbsolute"', typeof robot.relativeToAbsolute === 'function');
