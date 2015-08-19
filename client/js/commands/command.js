class Command {
	
	static validCommand(inputCommand)
	{
		if(inputCommand.match(this.InputMatch))
			return true;
	}
}

export default Command