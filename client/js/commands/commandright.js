import Command from './Command';

class CommandRight extends Command
{
	static Name = 'RIGHT';
	
	static run(iRobot, inputCommand)
	{
		iRobot._commandRight();
	}
}

export default CommandRight;