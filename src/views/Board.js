import React from 'react';
import Square from './Square.js';
import { Button } from 'react-bootstrap';
import Levels from '../data/Levels.js';

//Constants for now that can be configurable 
//based on each level in the future.
const game_height = 6;
const game_width = 6;

const WINNING_GUESSES = 3;
const PREVIOUS_STEPS_TO_SHOW = 3;
const START_ON_STEP = 3;

class Board extends React.Component {
	
		
	constructor() {
		super();
		var locations = this.buildLocations(game_height, game_width);
		this.levels = Levels;
		this.animatingLevel = false;
		this.state = {
			totalSteps : 0,
			totalLevels : this.levels.length,
			previousToShow : PREVIOUS_STEPS_TO_SHOW,
			locations : locations,
			step : START_ON_STEP,
			level : 0, //this.levels.length - 4,
			rightGuesses : 0
		}
		this.clicks = {};
	}
	
	componentDidMount() {
		//do this here so it animates instead of starting at step 3
		this.nextLevel();
	}
	
	buildLocations(game_height, game_width) {
		//create an matrix to represent the state
		// of each item.
		// 
		var locations = [];
		for (var i=0;i<game_height;i++) {
			var row = [];
			for (var j=0;j<game_width;j++) {
				row.push({
					row : i,
					column : j,
					key : '' + i + j,
				});
			}
			locations.push(row);
		}
		return locations;
	}
	
	handleClick(row, column) {
		if (this.animatingLevel) {
			return;
		}
		var pos;
		var step = this.state.step;
		var nextStep = step + 1;
		var level = this.levels[this.state.level - 1];
		var nextPosition = level.fn(nextStep);
		var locations = this.state.locations;
		var nextLocation = locations[row][column];
		var correctGuess = (nextPosition[0] === column && nextPosition[1] === row);
		var rightGuesses = this.state.rightGuesses;
		
		this.clicks[this.state.totalSteps] = [column, row];
		console.log(JSON.stringify(this.clicks));
		

		if (rightGuesses >= WINNING_GUESSES) {
			return;
		}
		
		locations = this.resetLocations(locations);
		
		if (correctGuess) {
			rightGuesses += 1;
			nextLocation.guessedRight = true;
			locations[row][column] = nextLocation;
			var guessWeight = rightGuesses;
			for (var i = step + 1; i>Math.max(step-WINNING_GUESSES, 0); i--) {
				pos = level.fn(i);
				locations[pos[1]][pos[0]].guessWeight = guessWeight;
				guessWeight--;
			}
			this.setState({
				locations: locations,
				totalSteps : this.state.totalSteps + 1,
				step : step + 1,
				rightGuesses : rightGuesses
			});
		} else {
			//make each previous guess no longer right
			for (var j = step; j>0; j--) {
				pos = level.fn(j);
				locations[pos[1]][pos[0]].guessedRight = false;
			}
			this.setState({
				locations: locations,
				totalSteps : this.state.totalSteps + 1,
				step : step + 1,
				rightGuesses : 0
			});
		}
	}
	
	render() {
		var endLevelText = 'Level Cleared!';
		var locations = this.state.locations;
		var step = this.state.step;
		var previousToShow = this.state.previousToShow;
		var level = this.levels[this.state.level - 1];

		var rightGuesses = this.state.rightGuesses;
		if (level) {
			var positionFn = level.fn;
			var t = Math.max(1, step-previousToShow);

			for (t; t<=step; t++) {
				var positions = positionFn(t);
				var x = positions[0];
				var y = positions[1];
				var stepLocation = locations[y][x];
				stepLocation.myStep = t;
				locations[y][x] = stepLocation;
			}
			
		}
		
		var html = [];
		for (var i=0;i<game_height;i++) {
			var row = [];
			for (var j=0;j<game_width;j++) {
				var location = this.state.locations[i][j];
				row.push(this.renderSquare(location));
			}
			html.push(React.createElement('div', {
				key : 'row-' + i,
				className : 'text-center board-row' 
			}, row));
		}
		
		const nextLevelButtonStyle = {
			marginTop : '12px',
			marginLeft : 'auto',
			marginRight : 'auto',
			'display': this.state.level < this.state.totalLevels ? 'block' : 'none'
		};
		const winningDivStyle = {
			display : rightGuesses >= WINNING_GUESSES ? 'block' : 'none'
		}
		if (this.state.level >= this.state.totalLevels) {
			 endLevelText = 'Game Cleared!';
		}
		return (
		  <div className="container-fluid">
			<div className="game">				
				{html}
				<div style={winningDivStyle} className="alert-success level-cleared">
					{endLevelText}
					<Button className="btn-success" style={nextLevelButtonStyle} 
							onClick={this.nextLevel.bind(this)}>Next Level</Button>
				</div>
			</div>

			<div className="form-group text-center">
				<label className="control-label">Level:</label>
				<div className="form-display" style={{marginRight:'8px'}}>{this.state.level}/{this.state.totalLevels}</div>
				<label className="control-label">Total Clicks:</label>
				<div className="form-display" >{this.state.totalSteps}</div>
			</div>
			<div className="nav-bar">
				<Button className="btn-sm" onClick={this.startGameOver.bind(this)}>Start Over</Button>
			</div>
			<div className="footer">
				<a href="https://github.com/hacocacyb/pattern-match">View source on GitHub</a>
			</div>
			
		  </div>
		);
	}

	nextLevel() {
		var locations = this.buildLocations(game_height, game_width);
		
		var levelNumber = this.state.level;
		levelNumber += 1;
		var levelConfig = this.levels[levelNumber - 1];

		this.setState({
			locations : locations,
			previousToShow : levelConfig.previousToShow || PREVIOUS_STEPS_TO_SHOW,
			level : levelNumber,
			step : 1, //START_ON_STEP
			rightGuesses : 0
		});
		var me = this;
		var loopStep = 1;
		var levelStartOnStep = START_ON_STEP || levelConfig.startOnStep;
		if (levelNumber > 5) {
			levelStartOnStep = 4;
		}
		if (levelStartOnStep > loopStep) {
			this.animatingLevel = true;
		}
		var deferredMoves = 0;
		var animAction = function() {
			me.setState({
				step : me.state.step + 1
			});
			deferredMoves--;
			if (deferredMoves === 0) {
				me.animatingLevel = false;
			}
			
		};
		while (loopStep < levelStartOnStep) {
			deferredMoves++;
			setTimeout(animAction, 300 * loopStep);
			loopStep++;
		};
	}
	
	renderSquare(props) {
		var row = props.row;
		var column = props.column;
		props.currentStep = this.state.step;
		props.previousStepsToShow = this.state.previousToShow;
		
		return <Square 	config={props}
						key={'' + props.row + props.column} 		
						onClick={() => this.handleClick(row, column)} />;
	}
	
	resetLocations(locations) {
		for (var i=0;i<game_height;i++) {
			for (var j=0;j<game_width;j++) {
				var location = this.state.locations[i][j];
				location.myStep = null;
				location.guessWeight = null;
			}
		}
		return locations;
	}
	
	startGameOver() {
		var locations = this.buildLocations(game_height, game_width);

		this.setState({
			locations : locations,
			step : START_ON_STEP,
			level : 0,
			rightGuesses : 0,
			totalSteps : 0
		}, this.nextLevel.bind(this));
	}
}




export default Board;