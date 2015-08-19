import Command from './Command';

class CommandPlace extends Command
{
	static extractCommandMetadata (input)
	{
		var inputs = input.split(' '); 
		var metaDataInput = inputs[1].split(',');
		var metaData = {};
		metaData.x = metaDataInput[0];
		metaData.y = metaDataInput[1];
		metaData.face = metaDataInput[2];
		return metaData;
	}
	
	static run(iRobot, inputCommand)
	{
		iRobot._commandPlace(this.extractCommandMetadata(inputCommand));
	}
	
	static InputMatch = /PLACE\s\d,\d,[SOUTH|NORTH|WEST|EAST]/i;
}

export default CommandPlace;