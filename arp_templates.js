var utils = require('./utils');
const pats = require('./patternList');

let T = [];
//utils.generateX(Y.length);
//utils.generateArray(size, max, multiplier, addition)

function eg_scaleUp() {
	//		|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|
	T.Y = 	[1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2];
	T.O = 	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2];
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}
function eg_scaleDown() {
	//		|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|
	T.Y = 	[2,1,7,6,5,4,3,2,1,7,6,5,4,3,2,1];
	T.O = 	[2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0];
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}
function eg_scaleUpDown() {
	//		|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|
	T.Y = 	[1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,1,1,1,7,6,5,4,3,2,1,7,6,5,4,3,2,1];
	T.O = 	[0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0];
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}
function eg_octaveUp() {
	//		|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|
	T.Y = 	utils.fill(1,16);
	T.O = 	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3];
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}
function eg_octaveDown() {
	//		|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|1,2,3,4|
	T.Y = 	utils.fill(1,16);
	T.O = 	utils.stretch([3,2,1,0],16);
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}
function eg_Basic1() { // octave
	T.Y = 	utils.stretch([1,1],16);
	T.O = 	utils.stretch([0,1],16);
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}
function eg_Basic2() {
	T.Y = 	utils.stretch([1,5,1,5],16);
	T.O = 	utils.stretch([0,0,1,0],16);
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}
function eg_Basic3() { // extend to include a last bar ascending notes
	T.Y = 	utils.stretch([5,1,5,1],16);
	T.O = 	utils.stretch([0,0,0,0],16);
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}

function arp_4TriadCycle() {
	T.Y = 	utils.stretch([1,3,5,7],32);
	T.O = 	utils.stretch([0,0,0,0],32);
	T.G = 	utils.fill(7, T.Y.length);
	T.X = 	utils.generateX(T.Y.length); // auto generate pattern
	T.C = 	utils.fill(1, T.Y.length);
	T.S = 	utils.fill(2, T.Y.length);	
}

function call(ID) {
	if(ID === 0) ;// ;
	else if (ID === 1) eg_scaleUp() ;
	else if (ID === 2) eg_scaleDown() ;
	else if (ID === 3) eg_scaleUpDown() ;
	else if (ID === 4) eg_octaveUp() ;
	else if (ID === 5) eg_octaveDown() ;
	else if (ID === 6) eg_Basic1() ;
	else if (ID === 7) eg_Basic2() ;
	else if (ID === 8) eg_Basic3() ;

}

module.exports = {
	T,
	call,
}