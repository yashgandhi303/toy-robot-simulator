import {Command}  from '../globals'; 

export interface IParser {
	parse(inputCommand: string): Command;
}