import React from 'react';
import Board from './Board.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class Game extends React.Component {
	
	render() {
		return (
			<div>
				<h2 className="title">Pattern Matcher</h2>
				<h5 className="title">Click to continue the pattern</h5>
				<Board />
			</div>
		);
	}
}

export default Game;