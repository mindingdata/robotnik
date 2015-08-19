import Command from './Command';

class CommandMove extends Command
{
	constructor (input)
	{
		super();
	}
	
	static Name = 'MOVE';
}

export default CommandMove;