
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
	}
];

export default Levels;