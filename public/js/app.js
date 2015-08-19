(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commandsCommandleft = require('./commands/commandleft');

var _commandsCommandleft2 = _interopRequireDefault(_commandsCommandleft);

var _commandsCommandright = require('./commands/commandright');

var _commandsCommandright2 = _interopRequireDefault(_commandsCommandright);

var _commandsCommandplace = require('./commands/commandplace');

var _commandsCommandplace2 = _interopRequireDefault(_commandsCommandplace);

var _commandsCommandreport = require('./commands/commandreport');

var _commandsCommandreport2 = _interopRequireDefault(_commandsCommandreport);

var Robot = (function () {
	function Robot(maxSize, board) {
		_classCallCheck(this, Robot);

		this.maxSize = maxSize;
		this.board = board;
		this.hasPlaced = false;
		this.stepSize = board.outerWidth() / maxSize;
		this.x = 0;
		this.y = 0;
		this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16);
		this.jid = "#" + this.id;
		this.currentRotation = 0;

		this.availableCommands = [_commandsCommandleft2['default'], _commandsCommandright2['default'], _commandsCommandplace2['default'], _commandsCommandreport2['default']];
		this.commandList = new Array();
	}

	_createClass(Robot, [{
		key: 'render',
		value: function render() {
			this.board.append('<img id="' + this.id + '" class="robot" src="images/robot.png" />');
			$(this.jid).css('top', 0).css('left', 0 - this.stepSize).outerWidth(this.stepSize);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			$(this.jid).remove();
		}
	}, {
		key: 'runCommands',
		value: function runCommands(commands) {
			this.hasPlaced = false;
			this.commandList = commands;
			this._runNextCommand();
		}
	}, {
		key: '_runNextCommand',
		value: function _runNextCommand() {
			if (this.commandList.length == 0) return;

			var nextInputCommand = this.commandList.shift();
			var nextCommand = this.availableCommands.find(function (cmd) {
				return cmd.validCommand(nextInputCommand);
			});
			if (nextCommand != undefined) {
				switch (nextCommand.Name) {
					case 'LEFT':
						this._turnLeft();break;
					case 'RIGHT':
						this._turnRight();break;
					case 'PLACE':
						this._place(new _commandsCommandplace2['default'](nextInputCommand));break;
					case 'REPORT':
						this._report();break;
				}
			} else this._runNextCommand();
		}
	}, {
		key: '_turnLeft',
		value: function _turnLeft(commandOptions) {
			var _this = this;

			if (this.hasPlaced) {
				this.currentRotation -= 90;
				$(this.jid).rotate({ animateTo: this.currentRotation, callback: function callback() {
						_this._runNextCommand();
					} });
			} else {
				this._runNextCommand();
			}
		}
	}, {
		key: '_turnRight',
		value: function _turnRight(commandOptions) {
			var _this2 = this;

			if (this.hasPlaced) {
				this.currentRotation += 90;
				$(this.jid).rotate({ animateTo: this.currentRotation, callback: function callback() {
						_this2._runNextCommand();
					} });
			} else {
				this._runNextCommand();
			}
		}
	}, {
		key: '_place',
		value: function _place(commandOptions) {
			if (commandOptions.x < 0 || commandOptions.x > this.maxSize - 1 || commandOptions.y < 0 || commandOptions.y > this.maxSize - 1) return;

			$(this.jid).css('top', (this.maxSize - commandOptions.y - 1) * this.stepSize).css('left', commandOptions.x * this.stepSize);
			this.hasPlaced = true;
			this._runNextCommand();
		}
	}, {
		key: '_report',
		value: function _report(commandOptions) {
			if (this.hasPlaced) {
				var rotation = Math.abs($(this.jid).getRotateAngle()) / 90 % 4;
				var rotationString = '';
				switch (rotation) {
					case 0:
						rotationString = 'NORTH';break;
					case 1:
						rotationString = 'EAST';break;
					case 2:
						rotationString = 'SOUTH';break;
					case 3:
						rotationString = 'WEST';break;
				}
				alert(this.x + ' ' + this.y + ' ' + rotationString);
			}
		}
	}]);

	return Robot;
})();

exports['default'] = Robot;
module.exports = exports['default'];

},{"./commands/commandleft":4,"./commands/commandplace":5,"./commands/commandreport":6,"./commands/commandright":7}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Robot = require('./Robot');

var _Robot2 = _interopRequireDefault(_Robot);

var robot = undefined;

$('#runButton').click(function () {
    //Destroy old robot.
    if (robot != undefined) {
        robot.destroy();
    }

    //Create a brand new shiny one and render it.
    robot = new _Robot2['default'](5, $('#gameboard'));
    robot.render();

    var commandInputs = $('#commandInputs').val();
    var splitCommands = new Array();

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

},{"./Robot":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = (function () {
	function Command() {
		_classCallCheck(this, Command);
	}

	_createClass(Command, null, [{
		key: "validCommand",
		value: function validCommand(inputCommand) {
			if (inputCommand.startsWith(this.Name)) return true;
		}
	}]);

	return Command;
})();

exports["default"] = Command;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Command2 = require('./Command');

var _Command3 = _interopRequireDefault(_Command2);

var CommandLeft = (function (_Command) {
	_inherits(CommandLeft, _Command);

	function CommandLeft(input) {
		_classCallCheck(this, CommandLeft);

		_get(Object.getPrototypeOf(CommandLeft.prototype), 'constructor', this).call(this);
	}

	_createClass(CommandLeft, null, [{
		key: 'Name',
		value: 'LEFT',
		enumerable: true
	}]);

	return CommandLeft;
})(_Command3['default']);

exports['default'] = CommandLeft;
module.exports = exports['default'];

},{"./Command":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Command2 = require('./Command');

var _Command3 = _interopRequireDefault(_Command2);

var CommandPlace = (function (_Command) {
	_inherits(CommandPlace, _Command);

	function CommandPlace(input) {
		_classCallCheck(this, CommandPlace);

		_get(Object.getPrototypeOf(CommandPlace.prototype), 'constructor', this).call(this);
		var inputs = input.split(' ');
		this.x = inputs[1];
		this.y = inputs[2];
	}

	_createClass(CommandPlace, null, [{
		key: 'Name',
		value: 'PLACE',
		enumerable: true
	}]);

	return CommandPlace;
})(_Command3['default']);

exports['default'] = CommandPlace;
module.exports = exports['default'];

},{"./Command":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Command2 = require('./Command');

var _Command3 = _interopRequireDefault(_Command2);

var CommandReport = (function (_Command) {
	_inherits(CommandReport, _Command);

	function CommandReport(input) {
		_classCallCheck(this, CommandReport);

		_get(Object.getPrototypeOf(CommandReport.prototype), 'constructor', this).call(this);
	}

	_createClass(CommandReport, null, [{
		key: 'Name',
		value: 'REPORT',
		enumerable: true
	}]);

	return CommandReport;
})(_Command3['default']);

exports['default'] = CommandReport;
module.exports = exports['default'];

},{"./Command":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Command2 = require('./Command');

var _Command3 = _interopRequireDefault(_Command2);

var CommandRight = (function (_Command) {
	_inherits(CommandRight, _Command);

	function CommandRight(input) {
		_classCallCheck(this, CommandRight);

		_get(Object.getPrototypeOf(CommandRight.prototype), 'constructor', this).call(this);
	}

	_createClass(CommandRight, null, [{
		key: 'Name',
		value: 'RIGHT',
		enumerable: true
	}]);

	return CommandRight;
})(_Command3['default']);

exports['default'] = CommandRight;
module.exports = exports['default'];

},{"./Command":3}]},{},[2]);
