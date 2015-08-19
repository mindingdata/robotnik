import 'babel/polyfill';
import Robot from './Robot';

let robot;

$('#runButton').click(function()
{
    //Destroy old robot. 
    if(robot != undefined)
    {
        robot.destroy();
    }
        
    //Create a brand new shiny one and render it. 
    robot = new Robot(5, $('#gameboard'));
    robot.render();
    
    let commandInputs = $('#commandInputs').val();
    let splitCommands = new Array();
    
    splitCommands = commandInputs.split('\n');
    robot.runCommands(splitCommands);
});


function drawBoard(width, height) {
    for (var i = 0; i < width * height; i++) {
        $('#gameboard').append('<div class="gamesquare"></div>');
    }
    var totalWidth = $('#gameboard').width();
    var gameSquareSize = totalWidth / width;
    $('.gamesquare').outerWidth(gameSquareSize).outerHeight(gameSquareSize);
}

drawBoard(5, 5);