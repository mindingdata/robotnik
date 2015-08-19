# Robotnik

##To Run
npm install<br />
npm build<br />
npm start<br />

##General Instructions

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. 

Your valid commands are : <br />
PLACE X,Y,F<br />
MOVE<br />
LEFT<br />
RIGHT<br />
REPORT<br />

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. Place MUST be your first command. <br />
The origin (0,0) can be considered to be the SOUTH WEST most corner.<br />
MOVE will move the toy robot one unit forward in the direction it is currently facing.<br />
LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.<br />
REPORT will announce the X,Y and F of the robot. <br />