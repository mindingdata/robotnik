import Command from './Command';

class CommandReport extends Command
{
	static run(iRobot, inputCommand)
	{
		iRobot._commandReport();
	}
	
	static InputMatch = /REPORT/i;
}

export default CommandReport;