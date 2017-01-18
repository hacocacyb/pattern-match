import React from 'react';
import Board from './Board.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class Game extends React.Component {
	
	render() {
		const title = 'Predict the Pattern';
		return (
			<div>
				<div className="title">{title}</div>
				<Board />
			</div>
		);
	}
}

export default Game;