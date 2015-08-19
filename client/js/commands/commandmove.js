import Command from './Command';

class CommandMove extends Command
{
	static run(iRobot)
	{
		iRobot._commandMove();
	}
	
	static InputMatch = /MOVE/i;
}

export default CommandMove;