import Command from './Command';

class CommandReport extends Command
{
	static Name = 'REPORT';
	
	static run(iRobot, inputCommand)
	{
		iRobot._commandReport();
	}
}

export default CommandReport;