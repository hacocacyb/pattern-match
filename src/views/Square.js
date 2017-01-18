import React from 'react';

function Square(props) {
	var { config } = props;

	var shadeClass;
	var currentStep = config.currentStep;
	var myStep = config.myStep;
	if (myStep) {
		if (currentStep - myStep < config.previousStepsToShow) {
			if (config.guessedRight) {
				shadeClass = "turned-on guessed-shade" + config.guessWeight;
			} else {
				shadeClass = "turned-on shade" + (currentStep - myStep);
			}
		}
	}
	return (
		<div className="square"
			
			onClick={props.onClick.bind(this)}>
			<div className={"spot " + shadeClass}>
				
			</div>
			
		</div>
	);
}

export default Square;