import Command from './Command';

class CommandPlace extends Command
{
	constructor (input)
	{
		super();
		var inputs = input.split(' ');
		this.x = inputs[1];
		this.y = inputs[2];
	}
	
	static Name = 'PLACE';
}

export default CommandPlace;