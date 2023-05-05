let T = [];
// add pedal notes?
// voicings! 
function basic1() {
	//uplifting and euphoric (minor d#)
	T.X = [0,8,16,24];
	T.Y = [5,6,7,1];
	T.G = [7,7,7,7];
	T.O = [1,1,1,2];
	T.S = [2,2,2,2];
	T.C = [1,1,1,1];	
	// 3rd up octave and pedal note on 7th of scale.
}
function basic2() {
	//deep and serious (minor b)
	T.X = [0,8,16,24];
	T.Y = [6,7,1,7];
	T.G = [7,7,7,7];
	T.O = [1,1,2,1];
	T.S = [2,2,2,2];
	T.C = [1,1,1,1];	
	// can use major or minor scale over the top.
}
function basic3() {
	//tense and suspense (minor triad)
	T.X = [0,16];
	T.Y = [1,1];
	T.G = [7,7];
	T.O = [1,1];
	T.S = [2,2];
	T.C = [1,1];	
	// use as triad pair, bass line should access chord scale.
}
function basic4() {
	//sad (minor g)
	T.X = [0,8,16,24];
	T.Y = [1,7,4,6];
	T.G = [7,7,7,7];
	T.O = [2,1,1,1];
	T.S = [2,2,2,2];
	T.C = [1,1,1,1];	
	// ++3rds, pedal on tonic.
}
function basic5() {
	//feel good (minor b)
	T.X = [0,8,16,24];
	T.Y = [6,3,7,1];
	T.G = [7,7,7,7];
	T.O = [1,1,2,1];
	T.S = [2,2,2,2];
	T.C = [1,1,1,1];	
	// ++3rd, pedal 3rd + 3rd+5
}
function basic6() {
	//sorrow (minor g#)
	T.X = [0,12,16,28];
	T.Y = [6,1,7,5];
	T.G = [7,7,7,7];
	T.O = [1,1,1,1];
	T.S = [2,2,2,2];
	T.C = [1,1,1,1];	
	// ++3rd,  3rd + 3rd+5
}
function basic7() {
	//pump (minor g#)
	T.X = [0,16,24];
	T.Y = [1,6,4];
	T.G = [7,7,7];
	T.O = [1,1,1];
	T.S = [2,2,2];
	T.C = [1,1,1];	
	// ++3rd,  
}
function basic8() {
	//pump happy (minor g#)
	T.X = [0,16,28];
	T.Y = [1,3,6];
	T.G = [7,7,7];
	T.O = [1,2,1];
	T.S = [2,2,2];
	T.C = [1,1,1];	
	// -3rd, double 5th.
}
function basic9() {
	//chilled (minor c#)
	T.X = [0,8,16,28];
	T.Y = [6,1,7,1];
	T.G = [7,7,7,7];
	T.O = [1,2,1,1];
	T.S = [2,2,2,2];
	T.C = [1,1,1,1];	
	// -3rd, pedal tonic.
}
function basic10() {
	//chilled (maj)
	T.X = [0,8,16];
	T.Y = [4,5,1];
	T.G = [7,7,7];
	T.O = [1,2,1];
	T.S = [2,2,2];
	T.C = [1,1,1];	
	// -3rd -5th, pedal tonic.
}

// Example 1 - Chord scale up.
function eg1() {	
	T.X = [0,4,8,12,16,20,24,28];
	// position of chords on x
	T.Y = [1,2,3,4,5,6,7,1];
	// positions root of notes on y.
	T.G = [7,7,7,7,7,7,7,7];
	// gate velocity
	T.O = [1,1,1,1,1,1,1,2];
	// octave
	T.S = [2,2,2,2,2,2,2,2];
	//sustain
	T.C = [1,1,1,1,1,1,1,1];
	//channel
	//C_SEQ.seq_core(X,Y-1,G,O,S,C,5 ); // send template foundation.
}
// Example 2 - Chord scale down.
function eg2() {	
	T.X = [0,4,8,12,16,20,24,28];
	T.Y = [1,7,6,5,4,3,2,1];
	T.G = [7,7,7,7,7,7,7,7];
	T.O = [2,1,1,1,1,1,1,1];
	T.S = [2,2,2,2,2,2,2,2];
	T.C = [1,1,1,1,1,1,1,1];
}

function call(ID){
	console.log('ID');
	console.log(ID);
	//example64(); // clear 
	if(ID===0) basic10();
	else if(ID===1) basic1();
	else if(ID===2) basic2();
	else if(ID===3) basic3();
	else if(ID===4) basic4();
	else if(ID===5) basic5();
	else if(ID===6) basic6();
	else if(ID===7) basic7();
	else if(ID===8) basic8();
	else if(ID===9) basic9();
}

function basicProgressions(ID){
	if (ID===0) chord_prog = [1,5,4,4]; //*minor
	else if (ID===1) chord_prog = [1,4,1,5];
	else if (ID===2) chord_prog = [1,5,4,1];
	else if (ID===3) chord_prog = [2,5,1,1];
	else if (ID===4) chord_prog = [1,6,4,5];
	else if (ID===5) chord_prog = [6,4,1,5];
	else if (ID===6) chord_prog = [6,4,1,1];
	else if (ID===7) chord_prog = [6,1,5,4];
	else if (ID===8) chord_prog = [4,1,5,6];
	else if (ID===9) chord_prog = [4,1,5,1];
	else if (ID===10) chord_prog = [4,1,6,5];
	else if (ID===11) chord_prog = [1,5,6,4];
	else if (ID===12) chord_prog = [4,5,6,1];
	else if (ID===13) chord_prog = [4,6,5,5];
	else if (ID===14) chord_prog = [5,6,4,1];
	else if (ID===15) chord_prog = [5,6,4,4];
	else if (ID===16) chord_prog = [6,4,5,1];
	else if (ID===17) chord_prog = [1,4,2,5];
	else if (ID===18) chord_prog = [2,1,4,5];
	else if (ID===19) chord_prog = [1,2,6,4];
	else if (ID===20) chord_prog = [4,6,5,2];
	else if (ID===21) chord_prog = [2,4,1,5];
	else if (ID===22) chord_prog = [1,3,6,4];
//minor
	else if (ID===23) chord_prog = [1,6,3,7]; //all relative minor
	else if (ID===24) chord_prog = [1,3,7,6]; //
	else if (ID===25) chord_prog = [1,7,6,7];//*
	else if (ID===26) chord_prog = [1,6,7,1];//*
	else if (ID===27) chord_prog = [6,7,1,3];//*
	else if (ID===28) chord_prog = [1,6,3,4];//*
	else if (ID===29) chord_prog = [1,3,7,4];//*
	else if (ID===30) chord_prog = [4,6,1,7];//*
	else if (ID===31) chord_prog = [6,1,7,4];//*
	else if (ID===32) chord_prog = [6,4,1,7];//*
	else if (ID===33) chord_prog = [1,4,6,7];//*
	else if (ID===34) chord_prog = [1,7,6,4];//*	
	else if (ID===35) chord_prog = [6,5,1,7];//*
	else if (ID===36) chord_prog = [1,7,6,5];//*
	else if (ID===37) chord_prog = [1,7,5,6];//*
	else if (ID===38) chord_prog = [1,5,6,4];//*
}

function chordPatterns(ID,size) {
	console.log('size');console.log(size);
	let _X = [];
	const _max = 32; 
	if (ID===0) _X = [0,1,2,3];
	// move 2 + 4 equally
	else if (ID===1) _X = [0,14,16,30];
	else if (ID===2) _X = [0,12,16,28];
	else if (ID===3) _X = [0,10,16,26];
	else if (ID===4) _X = [0,8,16,24];
	else if (ID===4) _X = [0,6,16,22];
	else if (ID===5) _X = [0,4,16,20];
	else if (ID===6) _X = [0,2,16,18];
	// move 2 + 4 offset
	else if (ID===7) _X = [0,8,16,26];
	else if (ID===8) _X = [0,8,16,28];
	else if (ID===9) _X = [0,8,16,30];
	else if (ID===10) _X = [0,10,16,24];
	else if (ID===11) _X = [0,12,16,24];
	else if (ID===12) _X = [0,14,16,24];
	//off beats
	else if (ID===13) _X = [4,12,20,28];
	//more templates here....
	//for more specific templating, use { _X = [], return }
	
	let storeX = _X.map((value) => Math.round((value / 2) + 16 )); // store and half array for arrays > 8
	if(size > 4){
		const chord4 = _X[_X.length - 1];
		const chord3 = _X[_X.length - 2];
		const chord2 = _X[_X.length - 3];
		const chord1 = _X[0];
		if(size >= 5){	
			_X.push(chord4 + ( (_max - chord4) / 2 ) ); // find position between last chord and end of phrase
		}
		if(size >= 6){	
			_X.push(chord2 + ( (chord3 - chord2) / 2 ) );
		}
		if(size >= 7){	
			_X.push(chord3 + ( (chord4 - chord3) / 2 ) );
		}
		if(size >= 8){	
			_X.push(chord1 + ( (chord2 - chord1) / 2 ) );
		}
	}
	if(size > 8) {
		_X = _X.map((value) => Math.round(value / 2));
		if(size >= 9){	
			_X.push(storeX[0]); // new bar 
		}
		if(size >= 10){	
			_X.push(storeX[2]); // new bar + 8
		}
		if(size >= 11){	
			_X.push(storeX[3]); // new bar + 12 
		}
		if(size >= 12){	
			_X.push(storeX[1]); // new bar +4
		}
		const newChord4 = _X[_X.length - 1];
		const newChord3 = _X[_X.length - 2];
		const newChord2 = _X[_X.length - 3];
		const newChord1 = _X[9];
		if(size >= 13){	
			_X.push(newChord4 + ( (_max - newChord4) / 2 ) ); // find position between last chord and end of phrase
		}
		if(size >= 14){	
			_X.push(newChord2 + ( (newChord3 - newChord2) / 2 ) );
		}
		if(size >= 15){	
			_X.push(newChord3 + ( (newChord4 - newChord3) / 2 ) );
		}
		if(size >= 16){	
			_X.push(newChord1 + ( (newChord2 - newChord1) / 2 ) );
		}
		
	}
	// finds duplicate values and +-1 to the next free adjecent space
	const uniqueValues = new Set();
	for (let i = 0; i < _X.length; i++) {
		if (uniqueValues.has(_X[i])) {
			let newValue = _X[i];
			while (uniqueValues.has(newValue)) {
				newValue++;
			}
			_X[i] = newValue;
		}
		uniqueValues.add(_X[i]);
	}
	_X = _X.map((value) => Math.round(value));
	_X.sort((a, b) => a - b); // Sort the array in ascending order
	return _X;
}
module.exports = {
	T,
	call,
	basicProgressions,
	chordPatterns,
	
}