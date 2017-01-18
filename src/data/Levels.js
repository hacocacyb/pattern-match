
const Levels = [{
		desc: 'Across each row then down',
		fn: function (t) {
			var x,
			y;
			var ct = t - 1;
			x = (ct) % 6;
			y = Math.floor(ct / 6) % 6;
			return [x, y]
		}
	}, {
		desc: 'down diagonally',
		fn: function (t) {
			var x,
			y;
			var ct = t - 1;
			x = ct % 6;
			y = ct % 6;
			return [x, y]
		}
	}, {
		desc: 'right two and down one on each move',
		fn: function (t) {
			var x,
			y;
			var ct = t - 1;
			x = (ct * 2) % 6;
			y = ct % 6;
			return [x, y]
		}
	}, {
		desc: 'moves right, moves down, moves right, moves down',
		fn: function (t) {
			var x,
			y;
			var ct = t - 1;
			x = Math.floor((ct + 1) / 2) % 6;
			y = Math.floor(ct / 2) % 6;
			return [x, y]
		}
	}, {
		//the four corners
		fn: function (t) {
			var f = (t - 1) % 4;
			return {
				0: [0, 0],
				1: [5, 0],
				2: [5, 5],
				3: [0, 5]
			}
			[f];
		}
	}, {
		desc: 'four corners, then goes four corners in, etc',
		fn: function (t) {
			var f = (t - 1) % 12;
			return {
				0: [0, 0],
				1: [5, 0],
				2: [5, 5],
				3: [0, 5],
				4: [1, 1],
				5: [4, 1],
				6: [4, 4],
				7: [1, 4],
				8: [2, 2],
				9: [3, 2],
				10: [3, 3],
				11: [2, 3]
			}
			[f];
		}
	}, {
		desc: 'three blocks from each corner',
		fn: function (t) {
			var f = (t - 1) % 12;
			return {
				"0": [0, 0],
				"1": [1, 0],
				"2": [2, 0],
				"3": [5, 0],
				"4": [5, 1],
				"5": [5, 2],
				"6": [5, 5],
				"7": [4, 5],
				"8": [3, 5],
				"9": [0, 5],
				"10": [0, 4],
				"11": [0, 3]
			}
			[f];
		}
	}, {
		desc: 'up up up right',
		fn: function (t) {
			return {
				"0": [0, 5],
				"1": [0, 4],
				"2": [0, 3],
				"3": [1, 3],
				"4": [1, 2],
				"5": [1, 1],
				"6": [2, 1],
				"7": [2, 0],
				"8": [2, 5],
				"9": [3, 5],
				"10": [3, 4],
				"11": [3, 3],
				"12": [4, 3],
				"13": [4, 2],
				"14": [4, 1],
				"15": [5, 1],
				"16": [5, 0],
				"17": [5, 5]
			}[(t - 1) % 18];
		}
	}, {
		desc: '',
		fn: function (t) {
			return {
				"0": [0, 5],
				"1": [1, 3],
				"2": [1, 2],
				"3": [0, 0],
				"4": [2, 1],
				"5": [3, 1],
				"6": [5, 0],
				"7": [4, 2],
				"8": [4, 3],
				"9": [5, 5],
				"10": [3, 4],
				"11": [2, 4]
			}[(t - 1) % 12];
		}
	}, {
		desc: '',
		fn: function (t) {
			return {
				"0": [5, 5],
				"1": [4, 4],
				"2": [3, 5],
				"3": [2, 5],
				"4": [1, 4],
				"5": [0, 5],
				"6": [0, 0],
				"7": [1, 1],
				"8": [2, 0],
				"9": [3, 0],
				"10": [4, 1],
				"11": [5, 0]
			}[(t - 1) % 12];
		}
	}
];

export default Levels;
