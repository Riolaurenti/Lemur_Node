/* EDITED FOR LEMUR AND TOUCHSCREEN USE ONLY */

var utils = require('./utils');
const scales = require('./scales');
const prog = require('./chords');
const templates = require('./chord_templates');
const arps = require('./arp_sequencer');

var key = scales.getKey();
var scaleType = scales.getKeyScale();
//might not need here... or it needs updating.
var chords = scales.getChordDegrees(scales.getScale(scales.getKey(), scales.getKeyScale() ));
const master_octave = 60;
const osc = require('./OSC');

var currentChords = {};
let activeVoicings = [];
let activeChords = [];
let chordSettings = [
	IO: 0,
	CLK: 5,
	G: [],
	O: [],
	S: [],
	C: [],
];
let droneSettings = [
	IO = [0,0,0,0],
	NotesA: [1,1,1,1],
	NotesB: [2,2,2,2],
	NotesC: [3,3,3,3],
	NotesD: [4,4,4,4],
	OctA:	[1,1,1,1],
	OctB:	[1,1,1,1],
	OctC:	[1,1,1,1],
	OctD	[1,1,1,1],
};
var lastArray = [];
var _X = [];
let dist = [];
let accompaniment = 0;
let autoVoice = 1;
let clock = 1;

function getKey() {	return root; }
function updateKey() {	console.log('key', key, scales.getKey() );	setChords(); }
/* BASIC POINT OF CONTROL - APP.JS SPEAKS TO THESE FOLLOWING FUNCTIONS  */
/* SETTING CONTROLS*/
function IO() {  chordSettings.IO = !chordSettings.IO; osc.send('/chords_IO', chordSettings.IO);
function setClock(val) {  chordSettings.CLK = val; osc.send('/cClock', val); }
function setG(msg){ chordSettings.G = msg; osc.send('/chords_vel', msg); }
function setO(msg){ chordSettings.O = msg; osc.send('/chords_vel', msg); }
function setS(msg){ chordSettings.S = msg; osc.send('/chords_vel', msg); }
function setC(msg){ chordSettings.C = msg; osc.send('/chords_vel', msg); }

function autoVoice_IO() { autoVoice ? autoVoice = 0 : autoVoice = 1; osc.send('/C_auto', autoVoice);}
function acc_IO() { accompaniment ? accompaniment = 0 : accompaniment = 1; osc.send('/C_acc', accompaniment);}
//function autoVoice_IO() { if(autoVoice) autoVoice = 0; else autoVoice = 1; osc.send('/C_auto', autoVoice);}
//function acc_IO() { if(accompaniment) accompaniment = 0; else accompaniment = 1; osc.send('/C_acc', accompaniment);}

/* DRONE ACCOMPANIAMENTS */
function dIO(sel){ droneSettings.IO[sel] = !droneSettings.IO[sel]; osc.send('/droneIO', droneSettings.IO); }
function setDroneNotes(sel, type, array){ 
	if(type){
		if(sel === 1) { droneSettings.NotesA = array;  osc.send('/droneNotes1', droneSettings.NotesA); }
		else if(sel === 2) { droneSettings.NotesB = array; osc.send('/droneNotes2', droneSettings.NotesB); }
		else if(sel === 3) { droneSettings.NotesC = array;  osc.send('/droneNotes3', droneSettings.NotesC); }
		else if(sel === 4) { droneSettings.NotesD = array;  osc.send('/droneNotes4', droneSettings.NotesD); }
	}
	else {
		if(sel === 1) { droneSettings.OctA = array;  osc.send('/droneOct1', droneSettings.OctA); }
		else if(sel === 2) { droneSettings.OctB = array; osc.send('/droneOct2', droneSettings.OctB); }
		else if(sel === 3) { droneSettings.OctC = array; osc.send('/droneOct3', droneSettings.OctC); }
		else if(sel === 4) { droneSettings.OctD = array; osc.send('/droneOct4', droneSettings.OctD); }
	}
}


/* QUICK CONTROLS*/
function resetGOSC(){
	const length = activeChords.length;
	setG( utils.fill(7,length) ); // set the velocity.
	setO( utils.fill(1,length) ); // set the velocity.
	setS( utils.fill(2,length) ); // set the velocity.
	setc( utils.fill(1,length) ); // set the velocity.
}
function randomSeq(num){
	let randOutput = utils.generateArray(num,1,6,1);
	//console.log('randOutput'); console.log(randOutput)
	setChords(randOutput);
}
function repeatSeq(){
	const useArr = lastArray;
	let out = [];
	if(lastArray.length > 8) return;
	else {
		out = useArr.concat(lastArray);
	}
	setChords(out);
}

/* ADVANCED CONTROLS*/
function subChord(idx, subNum){
	//console.log('debug');
	//console.log(currentChords);
	substituteChord(activeChords, idx, subNum, 0 ); 
	//console.log(currentChords);
	sendChords(currentChords);
}
function importProgression(ID){
	let chordProgression = templates.basicProgressions(ID);
	setChords(template.Y); 
	// reset GOSC function..
}


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  */
/* SERVER CONTROL STOPS HERE. THIS IS ALL INTERNAL  */
function chordInversion(chordIndex, inversion){
	const _inv = getChordInversions(currentChords[chordIndex-1]);
	console.log('_inv');console.log(_inv);
	currentChords[chordIndex-1] = _inv[inversion];
	console.log(currentChords);
	sendChords(currentChords);
}

function setVoices(chordIndex, voiceNumber) {
	// voiceNumber undef use random value..
	activeVoicings = buildVoicings();
	console.log('activeVoicings'); console.log(activeVoicings);
	if(chordIndex === 0){
		for(let i = 0 ; i < Object.keys(currentChords).length; i++){
			currentChords[i] = activeVoicings[i][voiceNumber]
		}
	}
	else currentChords[chordIndex] = activeVoicings[chordIndex][voiceNumber];
	console.log(currentChords);
	sendChords(currentChords);
}
function setX(array){
	_X = array;
	dist = utils.calculateDistances(_X,32); // distance between each note on X axis
	osc.send('/chord_pos', _X); //send generated X coords
	osc.send('/chord_dist', dist); //send generated X coords
}
// takes an array of numbers and uses them to select chords from the available chord degrees.
function setChords(array, pos, oct){
	// add a default value for oct?
	if(array === undefined) array = lastArray;
	lastArray = array; //keep value for repeat, etc 
	activeChords = buildChords(sequenceChords(array)); // use to decl let activeChords here
	for(let i = 0 ; i < array.length; i++){
		currentChords[i] = activeChords[i].midi;
		if( oct === undefined ) continue;
		else if(oct[i] === 2) currentChords[i] = currentChords[i].map(octMaths)
}
	/*
	if(pos === undefined)generateX(array.length); 
	else _X = templates.chordPatterns(Number(pos), array.length); // templates for chord positions?  if > than #chords stretch....
	dist = utils.calculateDistances(_X,32); // distance between each note on X axis
	*/
	//console.log('_X');console.log(_X); console.log('pos');console.log(pos); console.log('dist');console.log(dist);
	//console.log('active?'); console.log(activeChords); // find substitute chords list here	
	//console.log('current'); console.log(currentChords);
		// autoVoice chords...
	let voicedChords = autoChordVoicing(currentChords);
	//console.log('voiced?'); console.log(voicedChords);
		// if autoVoice.. sendVoiced else send CurrentChords
	if(autoVoice)sendChords(voicedChords);
	else sendChords(currentChords);
	scales.getChordScales(activeChords); // v2 needs to check active chord sub and adapt.
}
function octMaths(num){ return num +12  };

// imports templates from chord_templates.js
function importTemplate(ID){
	templates.call(ID); // populates "T" make a list
	const template = templates.T; // 
	let chordkeys = Object.keys(template);
	//console.log(template.Y);
	// gets the root chords from chord degrees
	setChords(template.Y, template.X, template.O); 
	//currently send values straight from call template, change later maybe...
	osc.sendArray('/chords_vel' , template.G);
	osc.sendArray('/chords_oct' , template.O);
	osc.sendArray('/chords_sus' , template.S);
	osc.sendArray('/chords_chan' , template.C);
}

/* CORE FUNCTIONALITY */

//sends the raw chord MIDI values to usine.
function sendChords(chordOut) {
	const seqKeys = Object.keys(chordOut);
	//console.log(chordOut[0].length);
	for(let i = 0 ; i < seqKeys.length; i++){
		osc.send('/chords' ,  chordOut[i], (i+1) );
		//osc.send('/chords' ,  currentChords[i], (i+1) );
		//console.log(currentChords[i]);
	}
	//add option to use patterns here?
	//osc.send('/chord_pos', _X); //send generated X coords
	//osc.send('/chord_dist', dist); //send generated X coords
}

// run from setChords() line 88.
function buildChords(inputChords) {
	const out_Chords = inputChords;
	const availableSubs = scales.subList(inputChords);	
	//console.log('Active Progression Debug'); console.log(inputChords);
	//console.log(availableSubs); console.log(out_Chords);
	const outputChords = [];
	let output_subs = [];
	for (let i = 0; i < out_Chords.length; i++) {
        const getChord = out_Chords[i];
		const chordLabel = getChord.label;
		const chordNameStr = getChord.note + getChord.label;
		const chordScale = getChord.scale.slice();
		const chordValue = getChord.chord.slice();
		const chordOct = getChord.chord.slice();
		for(let j = 0; j < chordValue.length; j++) {
			chordOct[j] += master_octave;
		}
		output_subs = availableSubs[i];
		const use_subs = Object.values(output_subs);//[i];
		//console.log(output_subs); console.log('use_subs'); console.log(use_subs);
		outputChords.push({
			tag : chordNameStr,
			label: chordLabel,
			scale: chordScale,
			chord : chordValue,
			midi : chordOct,
			...use_subs,
		});	
	}
	//console.log(outputChords);
	return outputChords;
}
//gets the root note and scale, builds the chords, finds the associated subs,
function sequenceChords(progression){
	const chordProg = [];	
	chords = scales.getChordDegrees(scales.getScale(scales.getKey(), scales.getKeyScale() ));	
    for (let i = 0; i < progression.length; i++) {
        chordProg[i] = chords[progression[i] - 1];
    };
	//console.log('sequence debug');    console.log(chordProg);
		//do I do anyhting with this? //const testSubs = scales.get_subs(chordProg, 1);
	//console.log('Sequence Subs Debug'); console.log(testSubs);
    return chordProg;
}

function substituteChord(input, chordIndex, subIndex, inv){
	const subKeys = Object.keys(currentChords);
	const chordToSub = input[chordIndex];
	let newChord = chordToSub[subIndex].slice(); //set a variable	
	const findStr = prog.getChordFromNotes(newChord);
	const findRoot = scales.returnNote(newChord[0]);
	chordToSub.label = findRoot + findStr;
	console.log('findStr'); console.log(findStr);
	for(let i = 0; i < inv; i++) {
		newChord =  invertChord(newChord);
	}
	chordToSub.chord = newChord.slice(); // apply the chord

	for(let j = 0; j < newChord.length; j++) {
		newChord[j] += master_octave;
	}
	chordToSub.midi = newChord; 
	console.log('chord to sub'); console.log(chordToSub.midi);
	console.log('key sub'); console.log( subKeys[chordIndex] );
	currentChords[ subKeys[chordIndex] ] = chordToSub.midi;
	// send chordToSub somewhere useful... (activeChords)
}

/* VOICING CHORDS - CHORD COMPARISION AND INVERSION CHOICE..  */
//we probably shouldnt call these voices, rather chord spread or something....
// point of access for note arrangement/voicings
function buildVoicings() {
	//console.log('foundChords'); console.log(currentChords);
	
	const foundVoices = voiceList(currentChords);
	//console.log('foundVoices'); console.log(foundVoices);
	const output = [];
	let output_voices = []
	//const voices = 
	for (let i = 0; i < Object.keys(currentChords).length; i++) {	
		const chordIndex = i.toString(); 
		const chord = currentChords[chordIndex];
		//console.log('chord'); console.log(chord);
		output_voices = foundVoices[i];
		const use_voices = Object.values(output_voices);
		output.push({
			//tag : chordNameStr,
			...use_voices,
		});	
	}
	return output;
}
//runs a loop which finds all voicings for each chord in selection. used in above function
function voiceList(inChords) {
	//console.log('chordIn'); console.log(Object.keys(inChords).length);
	////console.log('tried to find Voice');
	let voiceStack = [];
	for (let i = 0; i < Object.keys(inChords).length; i++) {
		voiceStack[i] = findVoices(inChords[i]);
		console.log('inChords i'); console.log(inChords[i]);	
	}
	//console.log('stacked Voices'); console.log(voiceStack);
	
	return voiceStack;
}
// for use with stacked thirds only? run by voiceList above function.
function findVoices(chord) {
	//console.log('tried to find Voice');
	//console.log('chordIn findVoices'); console.log(chord);
	
	const use = chord.slice();
	const dropRoot = 	[	use[0]-12,	use[1],		use[2],		use[3]		] ;
	const open_1_7a = 	[	use[0]-12,	use[1]+12,	use[2]+12,	use[3]		];
	const open_1_7b = 	[	use[0]-12,	use[1]+24,	use[2]+12,	use[3]		];
	const open_1_10a = 	[	use[0]-12,	use[1],		use[2]+12,	use[3]+12	];
	const open_1_10b = 	[	use[0]-12,	use[1],		use[2]+24,	use[3]+12	];
	const open_1_3a = 	[	use[0],		use[1],		use[2]+12,	use[3]+12	];
	const open_1_3b = 	[	use[0],		use[1],		use[2]+24,	use[3]+12	];
	const raiseThird = 	[	use[0],		use[1]+12,	use[2],		use[3]		];
	
	return {
		a0 : use,
		a1 : dropRoot,
		a2 : open_1_7a,
		a3 : open_1_7b,
		a4 : open_1_10a,
		a5 : open_1_10b,
		a6 : open_1_3a,
		a7 : open_1_3b,
		a8 : raiseThird,
		a9 : open_1_3
	}
}

//toDo, consider subs, opening and closing chords, consider types of motion (contary, parallel etc)
function autoChordVoicing(inputChords) {
  const rootNotes = Object.values(inputChords).map(chord => chord[0]); // Get the root notes of all the chords
  const rootNoteDiff = rootNotes.map((rootNote, index) => {
    const nextRootNote = rootNotes[index + 1] || rootNotes[0]; // Get the next root note or the first root note if at the end of the array
    return (nextRootNote - rootNote + 12) % 12; // Calculate the difference between the two root notes
  });
  const outputChords = {};
  let prevChord;
  for (let i = 0; i < Object.keys(inputChords).length; i++) {
    const chordIndex = i.toString();
    const chord = inputChords[chordIndex];
	if (!prevChord) {
		//prevChord = inputChords[Object.keys(inputChords)[0]];
	}
    const inversions = getChordInversions(chord); // Get all the inversions of the chord
	let newInversions = inversions;
	if (prevChord) {
		const prevRoot = prevChord[0];
		for (let j = 0; j < inversions.length; j++) {
			const inversion = inversions[j];
			const rootNote = inversion[0];
			const prevRoot = prevChord[0];
			if (rootNote - prevRoot > 11) {
				const octaveDiff = Math.floor((rootNote - prevRoot) / 12);
			newInversions[j] = inversion.map(note => note - octaveDiff * 12);
			}
		}
	//console.log('prevChord');
	//console.log(prevChord);
	//console.log('newInversions');
	//console.log(newInversions);
	}
    let minDiff = Infinity;
    let minDiffIndex = 0;
    if (prevChord) {
		for (let j = 0; j < inversions.length; j++) { // Loop over the inversions of the current chord
			const diff = getChordDifference(prevChord, newInversions[j]); // Calculate the difference between the previous chord and the current inversion
			if (diff < minDiff) { // If the difference is smaller than the current minimum, update the minimum
				minDiff = diff;
				minDiffIndex = j;
			}
		}
    }
    prevChord = inversions[minDiffIndex]; // Set the current inversion as the previous chord for the next iteration
    outputChords[chordIndex] = prevChord; // Add the inversion with the smallest difference to the output object
	}
  //console.log('outputChords');
  //console.log(outputChords);
  return outputChords;
}
function getChordInversions(chord) {
  const inversions = [chord.slice()]; // Add the original chord as the first inversion
  let previousInversion = chord.slice(); // Store the previous inversion
  for (let i = 1; i < chord.length; i++) { // Loop over the chord notes (excluding the root note)
    const inversion = previousInversion.slice(); // Start with a copy of the previous inversion
    const firstNote = inversion.shift(); // Remove the root note and store it separately
    inversion.push(firstNote + 12); // Add the root note one octave higher
    inversions.push(inversion); // Add the new inversion to the list
    previousInversion = inversion; // Store the current inversion as the previous inversion for the next iteration
  }
  //console.log('inversions');
  //console.log(inversions);
  return inversions;
}
// Helper function to calculate the difference between two chords
function getChordDifference(chord1, chord2) {
	//console.log('chords');
  //console.log(chord1);
  //console.log(chord2);
  let difference = [];
  for (let i = 0; i < chord1.length; i++) {
    difference[i] = chord1[i] - chord2[i];
  }
  let absDifference = difference.map(Math.abs);
  let sum = absDifference.reduce((a, b) => a + b, 0);
  //console.log('dif');
  //console.log(difference);
  //console.log(sum);
  return sum;
}

module.exports = {
	setX,
	setChords,
	
	setClock,
	sequenceChords,
	buildChords,
	substituteChord,
	chordInversion,
	invertChord,
	setChords,
	setVoices,
	importTemplate,
	importProgression,
	resetGOSC,
	repeatSeq,
	randomSeq,
	subChord,
	
	generateX,
	autoVoice_IO,
	updateKey,
}