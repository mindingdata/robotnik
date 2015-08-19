import Command from './Command';

class CommandLeft extends Command
{
	static Name = 'LEFT';
	
	static run(iRobot)
	{
		iRobot._commandLeft();
	}
}

export default CommandLeft;