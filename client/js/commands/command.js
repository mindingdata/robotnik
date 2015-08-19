class Command {
	
	static validCommand(inputCommand)
	{
		if(inputCommand.startsWith(this.Name))
			return true;
	}
}

export default Command