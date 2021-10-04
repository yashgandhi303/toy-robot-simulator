/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Robot } from '../shared/robot'
import { GLOBALS, Command, COMMAND_DICT, DIRECTION } from './globals'

describe('App: Robot', () => {
    it('The Robot should not MOVE or ROTATE without PlACEMENT', () => {
        let r: Robot = Robot.getInstance()
        let c: Command = new Command()
        c.cmd = COMMAND_DICT.MOVE
        r.mapCommand(c)
        expect(r.x).toEqual(-1)
        expect(r.y).toEqual(-1)
        c.cmd = COMMAND_DICT.LEFT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.NONE)

    });
    it('The Robot should MOVE after PlACEMENT', () => {
        let r: Robot = Robot.getInstance()
        let c: Command = new Command()
        r.initialize()
        c.cmd = COMMAND_DICT.PLACE
        c.args = ["1","1","NORTH"]
        r.mapCommand(c)
        expect(r.x).toEqual(1)
        expect(r.y).toEqual(1)
        expect(r.nose).toEqual(DIRECTION.NORTH)

    });

   it('The Robot should not fall off the table', () => {
        let r: Robot = Robot.getInstance()
        let c: Command = new Command()
        r.initialize()
        c.cmd = COMMAND_DICT.PLACE
        c.args = ["5","-1","NORTH"]
        r.mapCommand(c)
        expect(r.x).toEqual(-1)
        expect(r.y).toEqual(-1)
        expect(r.nose).toEqual(DIRECTION.NONE)

    });

    it('The Robot should rotate anti clockwise on LEFT', () => {
        let r: Robot = Robot.getInstance()
        let c: Command = new Command()
        r.initialize()
        c.cmd = COMMAND_DICT.PLACE
        c.args = ["1","1","WEST"]
        r.mapCommand(c)
        
        //expect(r.x).toEqual(1)
        //expect(r.y).toEqual(1)
        //expect(r.nose).toEqual(DIRECTION.WEST)

        c.cmd = COMMAND_DICT.LEFT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.SOUTH) //From West to SOUTH
        
        c.cmd = COMMAND_DICT.LEFT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.EAST) //From SOUTH to EAST
        
        c.cmd = COMMAND_DICT.LEFT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.NORTH) //From EAST to NORTH

        c.cmd = COMMAND_DICT.LEFT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.WEST) //From North to West
        
        

    });
    it('The Robot should rotate clockwise on RIGHT', () => {
 
        let r: Robot = Robot.getInstance()
        let c: Command = new Command()
        r.initialize()
        c.cmd = COMMAND_DICT.PLACE
        c.args = ["1","1","WEST"]
        r.mapCommand(c)

        c.cmd = COMMAND_DICT.RIGHT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.NORTH) //From WEST to NORTH

        c.cmd = COMMAND_DICT.RIGHT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.EAST) //From North to EAST
        
        c.cmd = COMMAND_DICT.RIGHT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.SOUTH) //From EAST to SOUTH
        
        c.cmd = COMMAND_DICT.RIGHT
        r.mapCommand(c)
        expect(r.nose).toEqual(DIRECTION.WEST) //From SOUTH to WEST
        
       
 
    });
});