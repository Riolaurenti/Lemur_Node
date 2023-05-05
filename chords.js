// migrate functions here, use scales.js variables not functions to get core values.

function getChordFromNotes(notes) {
	let out = [];
	const root = notes[0];// % 12;
	const third = notes[1];// % 12;
	const fifth = notes[2];// % 12;
	const seventh = notes[3];/// % 12;
	const ninth = notes[4];// % 12;
	const eleventh = notes[5];// % 12;
	const thirteenth = notes[6];// % 12;
	// determine chord type
	if (third === root + 4 && seventh != (root + 10) ) {
		out.push('maj');
	}
	else if (third === (root + 3) && seventh != (root + 0) ) {
		out.push('min');
	}
	else if (third === root + 5) {
		out.push('sus');
	}
	else {
		out.push('');
	}
	
	if (seventh === root + 10) {
		out.push('7'); // dominant 
	}
	else if (seventh === root + 11) {
		out.push('7'); // major
	}
	else if (seventh === root + 9) {
		out.push('7'); // minor
	}
	else if (seventh === root + 8) {
		out.push('6'); // min or maj 
	}
	// determine additional chord tones
	if (fifth === root + 7) {
    // perfect fifth, do nothing
	}
	else if (fifth === root + 6) {
		out.push('b5');
	}
	else if (fifth === root + 8) {
		out.push('#5');
	}
	else if (fifth === root + 4) {
		out.push('aug');
	}
	
	if (ninth === root + 1) {
		out.push('b9');
	}
	else if (ninth === root + 2) {
		out.push('9');
	}
	else if (ninth === root + 3) {
		out.push('#9');
	}
	if (eleventh === root + 5) {
		out.push('11');
	}
	else if (eleventh === root + 6) {
		out.push('#11');
	}
	if (thirteenth === root + 6) {
		out.push('13');
	}
	let chordLabel = out.join('');
	return chordLabel;
}

function set_chordTensions(chordScale, chordTensions) {
	const triad = [ chordScale[0],chordScale[1],chordScale[2],chordScale[3] ];
	const outChords = [];
	for (const str of chordTensions) {
		if (str === 'bb9') {
			const bb9 = [triad[0],triad[1],triad[2], triad[3], (chordScale[4]-2)];
			outChords.push(bb9);
		}
		if (str === 'b9') {
			const b9 = [triad[0],triad[1],triad[2], triad[3], (chordScale[4]-1)];
			outChords.push(b9);
		}
		if (str === '9') {
			const add9 = [triad[0],triad[1],triad[2], chordScale[4]];
			const ext9 = [triad[0],triad[1],triad[2], triad[3], chordScale[4]];
			outChords.push(ext9);
			outChords.push(add9);
		}
		if (str === '#9') {
			const s9 = [triad[0], triad[1], triad[2], triad[3], chordScale[4]+1];
			outChords.push(s9);
		}
		if (str === '11') {
			const add11 = [triad[0],triad[1],triad[2], chordScale[5]];
			const ext11 = [triad[0],triad[1],triad[2], triad[3],chordScale[4],chordScale[5]];
			outChords.push(add11);
			outChords.push(ext11);
		}
		if (str === '#11') {
			const s11 = [triad[0], triad[1], triad[2], triad[3], chordScale[4]+6];
			outChords.push(s11);
		}
		if (str === '13') {
			const add13 = [triad[0],triad[1],triad[2],chordScale[5]];
			const ext13 = [triad[0],triad[1],triad[2],triad[3],chordScale[4],chordScale[5],chordScale[6]];
			outChords.push(add13);
			outChords.push(ext13);
		}
		if (str === 'b13') {
			const b13 = [triad[0], triad[1], triad[2], triad[3], chordScale[6]-1];
			outChords.push(b13);
		}
	}
	return outChords;
}

module.exports = {	
	getChordFromNotes,
	set_chordTensions,
	
	//compareChords,
};
