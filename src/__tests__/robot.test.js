import robot from '../js/robot'
import { expect } from './test-utils'

expect('robot to have function "runCleaningRobot"', typeof robot.runCleaningRobot === 'function');
