var utils = require('./utils');
const prog = require('./chords');
const tensions = require('./tensions');
const arps = require('./arp_sequencer');

const modes = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];
const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var root = 'C'; // change to "key"?
var scaleType = 'ionian';

var scale = getScale(root, scaleType);
var relative = getRelative(scale);
let chords = getChordDegrees(getScale(root, scaleType));

function getKey() {	return root; }
function getKeyScale() {	return scaleType; }		

function setKey(keyStr) { 
	root = chromaticScale[keyStr]; 
	scale = getScale(root, scaleType);
	}
	//useless
function checkKey(){
	console.log(root);
	console.log(scale);
}
function setScale(scaleStr) { scaleType = modes[scaleStr]; }



// Local Arrays
var currentScales = {};
let activeScales = []; 
let arpScales = [];
let bassScales = [];

function getScaleRules(scaleType) {
  switch (scaleType) {
    case 'ionian':
      return [0, 2, 4, 5, 7, 9, 11];
    case 'dorian':
      return [0, 2, 3, 5, 7, 9, 10];
    case 'phrygian':
      return [0, 1, 3, 5, 7, 8, 10];
    case 'lydian':
      return [0, 2, 4, 6, 7, 9, 11];
    case 'mixolydian':
      return [0, 2, 4, 5, 7, 9, 10];
    case 'aeolian':
      return [0, 2, 3, 5, 7, 8, 10];
    case 'locrian':
      return [0, 1, 3, 5, 6, 8, 10];
    default:
      throw new Error(`Scale type "${scaleType}" not found`);
  }
}
function buildScaleFromRoot(root, scaleType) {
	const modes = {
		major: [0, 2, 4, 5, 7, 9, 11],
		dorian: [0, 2, 3, 5, 7, 9, 10],
		phrygian: [0, 1, 3, 5, 7, 8, 10],
		lydian: [0, 2, 4, 6, 7, 9, 11],
		mixolydian: [0, 2, 4, 5, 7, 9, 10],
		minor: [0, 2, 3, 5, 7, 8, 10],
		locrian: [0, 1, 3, 5, 6, 8, 10],
	
		melodicMinor: [0, 2, 3, 5, 7, 9, 11],
		dorianb2: [0, 1, 3, 5, 7, 9, 10],
		lydianaug: [0, 2, 4, 6, 8, 9, 11],
		lydianb7: [0, 2, 4, 6, 7, 9, 10],
		mixolydianb6: [0, 2, 4, 5, 7, 8, 10],
		locrian2: [0, 2, 3, 5, 6, 8, 10],
		altered: [0, 1, 3, 4, 6, 8, 10],
		// 8 note scales...
		//majBebop: [0,2,4,5,7,8,9,11] 
	};
	const modeNotes = modes[scaleType].map((step) => (root + step) );//% 12
	return modeNotes;
}
//RETURNS SINGLE NOTE CHARACTER
function returnNote(note){
    return chromaticScale[note] ;
}
//RETURNS ARRAY OF NOTE CHARACTERS
function returnNotes(scale){
  return scale.map(interval => chromaticScale[interval%12]) ;
}

// finds scale from root and rules..
function getScale(root, scaleType) {
  const rootIndex = chromaticScale.indexOf(root);
  if (rootIndex === -1) {
    throw new Error(`Invalid root note "${root}"`);
  }
  const intervals = getScaleRules(scaleType);
  const scale = intervals.map(interval => chromaticScale[(rootIndex + interval) % 12]);
  const scaleNumerical = intervals.map(interval => (rootIndex + interval));
  //const scaleMidi = intervals.map(interval => (rootIndex + interval + 60) % 12 + 60);
  //return [scale, scaleNumerical, scaleMidi];
  return scaleNumerical; // only need numbers for now?
}
function getRelative(scale) {
	// input scale is minor
	if(scale[2] === (scale[0] + 3))return getScale(returnNote(scale[2]%12), 'ionian');
	// ...major
	else if(scale[2] === (scale[0] + 4)) return getScale(returnNote( scale[5]%12), 'aeolian');
}
//repeated in chords, could not read from scales? not a function, but included in module...
function extendScale(scale) {
  const extendedScale = [...scale, ...scale.map(note => note + 12), ...scale.map(note => note + 24)];
  return extendedScale.map((note, index) => ({
    //note: returnNotes(note),
    interval: note,
    degree: (index % 7)+1,
    oct: Math.floor(index / 7) + 1
  }));
}

/*
should be chords.js but encounter cycle problems.
*/

function getChordDegrees(scale) {
  let stretchedArray = extendScale(scale);
  let chordDegrees = [];

  for (let i = 0; i < 7; i++) {
	  let degreeScale = [];
    let intervals = [];
    for (let j = 0; j < 7; j++) {
		degreeScale.push(stretchedArray[i+j].interval);
      intervals.push(stretchedArray[i + j * 2].interval); // multiply j by 2 to skip over the intervals that are not part of the chord
    }
    chordDegrees.push({
      note: returnNote(scale[i] % 12),
	  scale: degreeScale,
      intervals: intervals, //.join(','),
      chord: intervals.slice(0, 4),
    });

    let chordName = prog.getChordFromNotes(chordDegrees[i].chord);
	let chordTensions =  tensions.get_tensions(chordName); ;
    chordDegrees[i] = {
      ...chordDegrees[i],	 
      label: chordName,
	  tensions: chordTensions,
    };
  }
  return chordDegrees;
}

function subList(in_chords) {
	let subStack = [] ;
	console.log('debug');
	for (let i = 0; i < in_chords.length; i++) {
		subStack[i] = get_subs(in_chords, i);
	}
	return subStack
}

function get_subs(chordInfo, subIndex){
	const usechord = chordInfo[subIndex].chord.slice();
	const tension = chordInfo[subIndex].tensions.slice();
	const intval = chordInfo[subIndex].intervals.slice();
	const root = usechord[0] ; // get first note of each looped chord 
	const keyNote = returnNote(usechord[0]%12);
	const findDegreeIndex = chords.findIndex(item => item.note === keyNote);
	const degreeChords = chords[findDegreeIndex];
	const tensionChords = prog.set_chordTensions( intval, tension);
	const tensionOut = tensionChords[0];
	//console.log('test subs');
	//console.log({ usechord, tension, intval, root, keyNote} );
	//console.log('findDegree');
	//console.log(findDegreeIndex);
	const Median_A = chords[ (findDegreeIndex + 2) % 7].chord;
	const Median_B = chords[ (findDegreeIndex + 5) % 7].chord;
	const tritoneInterval = (root+6) ; // = root + tritone, adjusted for scale.
	const Tritone = [
		tritoneInterval,
		usechord[1] + 6 ,
		usechord[2] + 6 ,
		usechord[3] + 6 ,
	];
	const chord_array = usechord.slice();
	if(chord_array[1] === chord_array[0]+4){ // if input chord is major 
		chord_array[0] = chord_array[0]+1; // add semitone to root
		chord_array[2] = chord_array[2]+1; // augment the 5th
	}
	else if(chord_array[1] === chord_array[0]+3){ // if input chord is minor
		chord_array[0] = chord_array[1]; // build chord from 3rd (2nd note in chord)
		chord_array[1] = chord_array[0]+4; // add major 3rd
		chord_array[2] = chord_array[1]+4; // augmented 5th.
	}
	const AugmentedTriad = chord_array;
	const dominant = [root, root + 4, root + 7, root + 10]; 
	const diminished7 = [root, root + 3, root + 6, root + 9]; 
	
	return {
		//idx : subIndex,
		//nte : keyNote,
		core: usechord,
		sub0: dominant,
		sub1: diminished7,
		sub2: Median_A,
		sub3: Median_B,
		sub4: Tritone,
		sub5: AugmentedTriad,
		
	}
}

/*
Data above is "pre-chords.js", code below is "post-chords.js"
*/

function getSynthetic(coreChords) {
  const currentKeyScale = scale.slice();
  const syntheticScales = [];

  for (let i = 0; i < coreChords.length; i++) {
    const chord = coreChords[i];
    const syntheticScale = currentKeyScale.slice();

    // Find the nearest note(s) to the chord's third and seventh in the current key scale
    const nearestThirdIndex = findNearestNoteIndex(chord[1] % 12, syntheticScale);
    const nearestSeventhIndex = findNearestNoteIndex(chord[3] % 12, syntheticScale);

    // Replace the nearest note(s) in the synthetic scale with the chord's third and seventh
    syntheticScale[nearestThirdIndex] = chord[1] % 12;
    syntheticScale[nearestSeventhIndex] = chord[3] % 12;
	//console.log(nearestThirdIndex);
	//console.log(chord[1]);
	//console.log(nearestSeventhIndex);
	//console.log(chord[3]);
    syntheticScales.push(syntheticScale);
  }

  return syntheticScales;
}

// Helper function to find the index of the nearest note in a scale
function findNearestNoteIndex(note, scale) {
  let nearestIndex = 0;
  let smallestDistance = Infinity;
  for (let i = 0; i < scale.length; i++) {
    const distance = Math.abs(note - scale[i]);    
    if (distance < smallestDistance) {
      smallestDistance = distance;
      nearestIndex = i;
    }
  }
  return nearestIndex;
}
// Helper function to check if a note is in a chord // redundant?
function isNoteInChord(note, chord) {
  return chord.indexOf(note) !== -1;
}

function getChordScales(chords){
	const chordScales = chords.map(obj => obj.scale);
	const chordNames = chords.map(objB => objB.label); 
	const baseChords = chords.map(objC => objC.chord);
	const syntheticScales = getSynthetic(baseChords);
	//const chordTensions = chords.map(item => item.tensions);
	const chordScalesArray = [];
	//console.log('Synthetic scales Base');
	//console.log(baseChords);
	//console.log('Synthetic scales');
	//console.log(syntheticScales);
	for (let i = 0; i < chords.length; i++) {
		var rootNote = chordScales[i][0];
		var scaleArray = [];
		// change to detect chord type (is 3rd maj/min, is 5th flattened, is 7th maj/min)
		//consider "synthetic scaling" or chromaticism.
		if(chordNames[i] === 'maj7'){
			chordScalesArray.push({
				//scale: buildArpScale(chordScales[i]),
				synthetic: syntheticScales[i],
				ionian: buildScaleFromRoot( rootNote , 'major' ),
				lydian: buildScaleFromRoot( rootNote , 'lydian' ),
				lydianaug: buildScaleFromRoot( rootNote , 'lydianaug' ),
				//bebop, or any scale with maj 3 and maj 7...
			});
		}
		else if(chordNames[i] === 'min7'){
			chordScalesArray.push({
				synthetic: syntheticScales[i],
				aeolian: buildScaleFromRoot( rootNote , 'minor' ),
				dorian: buildScaleFromRoot( rootNote , 'dorian' ),
				phrygian: buildScaleFromRoot( rootNote , 'phrygian' ),
				// any scale with min 3 and min 7.
			});
		}
		else if(chordNames[i] === 'min7b5'){
			chordScalesArray.push({
				locrian: buildScaleFromRoot( rootNote , 'locrian' ),
				locrian2: buildScaleFromRoot( rootNote , 'locrian2' ),
				// any scale with min 3, b5 and min 7.
			});
		}
		else if(chordNames[i] === '7'){
			chordScalesArray.push({
				mixolydian: buildScaleFromRoot( rootNote , 'mixolydian' ),
				lydianb7: buildScaleFromRoot( rootNote , 'lydianb7' ),
				mixolydianb6: buildScaleFromRoot( rootNote , 'mixolydianb6' ),
				altered: buildScaleFromRoot( rootNote , 'altered' ),
				dorianb2: buildScaleFromRoot( rootNote , 'dorianb2' ),
				//dorianb2: scales.buildScaleFromRoot( rootNote , 'dorianb2' ),
				
				//5th mode of harmonic minor and major, 
				//pentatonic and blues
				//dom bebop and dom diminished.
				//whole tone
				// any scale with maj 3 and min 7.
			});
		}
		//push Synthetic chords here?
		//else find the root base (3rd 5th and 7th from root and apply...
		// add sus4 #5 and other chordtypes.
	}	
	//console.log(chordScalesArray);
	currentScales = chordScalesArray;
	//console.log('currentScales');
	//console.log(currentScales);
	arps.setChordScale(currentScales); // default is {0,0,0,0,0,0,0,0,0,0,0,0,0}
	//bassScales = setChordScale(); // default is {0,0,0,0,0,0,0,0,0,0,0,0,0}
	//return chordScalesArray;
}


module.exports = {
	root,
	setKey,
	checkKey,
	setScale,
	getKey,
	getKeyScale,
	getScale,
	returnNote,
	returnNotes,
	getRelative,
	extendScale,
	returnNote,
	buildScaleFromRoot,
	getChordScales,
	getChordDegrees,
	get_subs,
	subList,
	arpScales, 
	bassScales,
}
