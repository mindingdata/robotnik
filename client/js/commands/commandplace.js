import Command from './Command';

class CommandPlace extends Command
{
	static extractCommandMetadata (input)
	{
		var inputs = input.split(' ');
		var metaData = {};
		metaData.x = inputs[1];
		metaData.y = inputs[2];
		return metaData;
	}
	
	static Name = 'PLACE';
}

export default CommandPlace;