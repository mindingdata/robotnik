import Command from './Command';

class CommandRight extends Command
{
	static run(iRobot, inputCommand)
	{
		iRobot._commandRight();
	}
	
	static InputMatch = /RIGHT/i;
}

export default CommandRight;