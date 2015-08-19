import Command from './Command';

class CommandLeft extends Command
{
	static run(iRobot)
	{
		iRobot._commandLeft();
	}
	
	static InputMatch = /LEFT/i;
}

export default CommandLeft;