import Command from './Command';

class CommandMove extends Command
{
	static Name = 'MOVE';
	
	static run(iRobot)
	{
		iRobot._commandMove();
	}
}

export default CommandMove;