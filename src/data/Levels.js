
const Levels = [
	{
		fn : function(t) {
			var x, y;
			var ct = t - 1;
			x = (ct) % 6;
			y = Math.floor(ct/6) % 6;
			return [x, y]
		}
	}, {
		fn : function(t) {
			var x, y;
			var ct = t - 1;
			x = ct % 6;
			y = ct % 6;
			return [x, y]
		}
	},{
		fn : function(t) {
			var x, y;
			var ct = t - 1;
			x = (ct * 2) % 6;
			y = ct % 6;
			return [x, y]
		}
	}, {
		fn : function(t) {
			var x, y;
			var ct = t - 1;
			x = Math.floor((ct+1)/2) % 6;
			y = Math.floor(ct/2) % 6;
			return [x, y]
		}
	}, {
		fn : function(t) {
			var f = (t-1) % 4;
			return {
				0 : [0,0],
				1 : [5,0],
				2 : [5,5],
				3 : [0,5]
			}[f];
		}
	}, {
		fn : function(t) {
			var f = (t-1) % 12;
			return {
				0 : [0,0],
				1 : [5,0],
				2 : [5,5],
				3 : [0,5],
				4 : [1,1],
				5 : [4,1],
				6 : [4,4],
				7 : [1,4],
				8 : [2,2],
				9 : [3,2],
				10 : [3,3],
				11 : [2,3]
			}[f];
		}
	}
];

export default Levels;