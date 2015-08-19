# Robotnik

##To Run
npm install
npm build
npm start

##General Instructions

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. 

Your valid commands are : 
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. Place MUST be your first command. 
The origin (0,0) can be considered to be the SOUTH WEST most corner.
MOVE will move the toy robot one unit forward in the direction it is currently facing.
LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
REPORT will announce the X,Y and F of the robot. 