
import CommandLeft from './commands/commandleft';
import CommandRight from './commands/commandright';
import CommandPlace from './commands/commandplace';
import CommandReport from './commands/commandreport';
import CommandMove from './commands/commandmove';

class Robot 
{
	constructor (maxSize, board)
	{
		this.maxSize = maxSize;
		this.board = board;
		this.hasPlaced = false;
		this.stepSize = board.outerWidth() / maxSize;
		this.x = 0;
		this.y = 0;
		this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16);
		this.jid = "#" + this.id;
		this.currentRotation = 0;
		
		this.availableCommands = [CommandLeft, CommandRight, CommandPlace, CommandReport, CommandMove];
		this.commandList = new Array();
	}
	
	render()
	{
		this.board.append('<img id="'+this.id+'" class="robot" src="images/robot.png" />')
		$(this.jid).css('top', 0).css('left', 0 - this.stepSize).outerWidth(this.stepSize);
	}
	
	destroy()
	{
		$(this.jid).remove();
	}

	runCommands(commands)
	{
		this.hasPlaced = false;
		this.commandList = commands;
		this._runNextCommand();
	}
	
	_runNextCommand()
	{
		if(this.commandList.length == 0)
			return;
			
		let nextInputCommand = this.commandList.shift();
		let nextCommand = this.availableCommands.find(cmd => cmd.validCommand(nextInputCommand));

		if(nextCommand != undefined)
			nextCommand.run(this, nextInputCommand);
		else
			this._runNextCommand();
	}
	
	
	_commandLeft(commandOptions)
	{
		if(this.hasPlaced)
		{
			this.currentRotation -= 90;
			$(this.jid).rotate({animateTo : this.currentRotation, callback : () => { this._runNextCommand();}} );
		}
		else
		{
			this._runNextCommand();
		}
		
	}
	
	_commandRight(commandOptions)
	{
		if(this.hasPlaced)
		{
			this.currentRotation += 90;
			$(this.jid).rotate({animateTo : this.currentRotation, callback : () => { this._runNextCommand();}} );
		}
		else
		{
			this._runNextCommand();
		}
	}
	
	_commandPlace(commandOptions)
	{
		if(commandOptions.x < 0 || commandOptions.x > this.maxSize - 1 
			|| commandOptions.y < 0 || commandOptions.y > this.maxSize - 1)
			return;
			
		this.x = commandOptions.x;
		this.y = commandOptions.y;
			
		$(this.jid)
			.css('top', (this.maxSize - commandOptions.y - 1) * this.stepSize)
			.css('left', commandOptions.x *  this.stepSize);
			
		switch(commandOptions.face)
		{
			case "NORTH" : this.currentRotation = 0;break;
			case "WEST" : this.currentRotation = -90; break;
			case "SOUTH" : this.currentRotation = 180; break;
			case "EAST" : this.currentRotation = 90; break;
		}
		$(this.jid).rotate(this.currentRotation);
		
		this.hasPlaced = true;
		this._runNextCommand();
	}
	
	_commandReport(commandOptions)
	{
		if(this.hasPlaced)
		{
			let rotation = this._getNormalizedRotation();
			let rotationString = '';
			switch(rotation)
			{
				case 0 : rotationString = 'NORTH'; break;
				case 1 : rotationString = 'EAST'; break;
				case 2 : rotationString = 'SOUTH'; break;
				case 3 : rotationString = 'WEST'; break;
			}
			alert(this.x + ' ' + this.y + ' ' + rotationString);
		}
	}
	
	_commandMove(commandOptions)
	{
		if(this.hasPlaced)
		{
			let rotation = this._getNormalizedRotation();
			switch(rotation)
			{
				case 0 : if(this.y < this.maxSize-1)this.y++;  break;
				case 1 : if(this.x < this.maxSize -1) this.x++; break;
				case 2 : if(this.y > 0) this.y--; break;
				case 3 : if(this.x > 0) this.x--; break;
			}
			$(this.jid).animate({top : (this.maxSize - this.y -1) * this.stepSize, left : this.x * this.stepSize}, 
				() => { this._runNextCommand()});
		}
		else
			this._runNextCommand();
	}

	_getNormalizedRotation()
	{
		let rotation = $(this.jid).getRotateAngle() / 90 % 4;
		if(rotation < 0)
			rotation += 4;
		return rotation;
	}

}

export default Robot