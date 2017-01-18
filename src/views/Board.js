import React from 'react';
import Square from './Square.js';
import { Button } from 'react-bootstrap';
import Levels from '../data/Levels.js';


const game_height = 6;
const game_width = 6;

const WINNING_GUESSES = 3;

class Board extends React.Component {
	
		
	constructor() {
		super();
		var locations = this.buildLocations(game_height, game_width);
		this.levels = Levels;
		this.state = {
			totalSteps : 0,
			totalLevels : this.levels.length,
			locations : locations,
			step : 1,
			level : 1,
			rightGuesses : 0
		}
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
		var pos;
		var step = this.state.step;
		var nextStep = step + 1;
		var level = this.levels[this.state.level - 1];
		var nextPosition = level.fn(nextStep);
		var locations = this.state.locations;
		var nextLocation = locations[row][column];
		var correctGuess = (nextPosition[0] === column && nextPosition[1] === row);
		var rightGuesses = this.state.rightGuesses;
		

		if (rightGuesses >= 3) {
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
		var level = this.levels[this.state.level - 1];

		var rightGuesses = this.state.rightGuesses;
		if (!level) {
			return;
		}
		var positionFn = level.fn;
		var t = Math.max(1, step-3);

		for (t; t<=step; t++) {
			var positions = positionFn(t);
			var x = positions[0];
			var y = positions[1];
			var stepLocation = locations[y][x];
			stepLocation.myStep = t;
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
		  <div className="container">
			<div className="game container">				
				{html}
				<div style={winningDivStyle} className="container level-cleared">
					{endLevelText}
					<Button style={nextLevelButtonStyle} 
							onClick={this.nextLevel.bind(this)}>Next Level</Button>
				</div>
			</div>
			<fieldset>
				<div className="field-row">
					<label className="field-label">Level:</label>
					<div className="field-value" >{this.state.level}</div>
				</div>
				<div className="field-row">
					<label className="field-label">Step:</label>
					<div className="field-value" >{this.state.step}</div>
				</div>
				
				<div className="field-row">
					<label className="field-label">Total Steps:</label>
					<div className="field-value" >{this.state.totalSteps}</div>
				</div>
			</fieldset>
			<div className="nav-bar">
				<Button onClick={this.startGameOver.bind(this)}>Start Over</Button>
			</div>
			<div className="footer">
				<a href="https://github.com/hacocacyb/memory-game">View source on GitHub</a>
			</div>
			
		  </div>
		);
	}

	nextLevel() {
		var locations = this.buildLocations(game_height, game_width);
		this.setState({
			locations : locations,
			level : this.state.level + 1,
			step : 1,
			rightGuesses : 0
		});
	}
	
	renderSquare(props) {
		var row = props.row;
		var column = props.column;
		props.currentStep = this.state.step;
		
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
			step : 1,
			level : 1,
			rightGuesses : 0
		})
	}
}




export default Board;