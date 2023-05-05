/* EDITED FOR LEMUR AND TOUCHSCREEN USE ONLY */

var utils = require('./utils');
const templates = require('./arp_templates');
const osc = require('./OSC');

//Module for controlling High end Melodies Scales and Arpeggios

let arpSettings = [
	IO: 0,
	CLK: 5,
	SWING: 0, //*
	X: [], //*
	Y: [], //*
	G: [],
	O: [],
	S: [],
	C: [],
];
let chordScales = [];

function IO() {  arpSettings.IO = !arpSettings.IO; osc.send('/arp_IO', arpSettings.IO);
function setClock(val) {  arpSettings.CLK = val; osc.send('/aClock', val); }
function setSwing(val) {  arpSettings.SWING = val; osc.send('/aSwing', val); }
function setG(msg){ arpSettings.G = msg; osc.send('/arp_G', msg); }
function setO(msg){ arpSettings.O = msg; osc.send('/arp_O', msg); }
function setS(msg){ arpSettings.S = msg; osc.send('/arp_S', msg); }
function setC(msg){ arpSettings.C = msg; osc.send('/arp_C', msg); }


//XY functions
function setX(array){
	arpSettings.X = array;
	dist = utils.calculateDistances(arpSettings.X,32); // distance between each note on X axis
	osc.send('/arp_pos', arpSettings.X); //send generated X coords
	osc.send('/arp_dist', dist); //send generated X coords
}
function setY(Y){ 
	arpSettings.Y = Y;
	osc.send('/arp_Y' , arpSettings.Y );
}

// GET SCALES FROM CORE for CPU sake this is only done once, not per instrument.
function setChordScale(currentScales, scaleSelection){
	//fix!
	const numScales = Object.keys(currentScales);
	//console.log('numScales');
	//console.log(numScales.length);
	//let activeScales = []; // made global..
	for(let i = 0 ; i < numScales.length; i++){
		let useScale = currentScales[i];
		let keyTest = Object.keys(useScale);
		//console.log('useScale');
		//console.log(useScale);
		//console.log(keyTest);
		if( scaleSelection === undefined ){
			chordScales[i] = useScale[keyTest[0]]; // edit scale type here!
		}
		else {
			chordScales[i] = useScale[keyTest[scaleSelection[i]]]; // edit scale type here!
		}
	}
	//console.log('activeScales');
	//console.log(chordScales);
	//set note progression here!
	sendArps(chordScales); //send core scales defaulted to 0..
}
//OSC functions
function sendArps(active){
	//const scaleKeys = Object.keys(active);
	for(let i = 0 ; i < active.length; i++){
		osc.send('/scales' , active[i], i+1);
	}
}

function setPitch(array) {
	let output = [];
	console.log('array');
	console.log(array);
	if(array.length < position.length) output = array.concat(array);
	console.log('output');
	console.log(output);
	arpSettings.Y = output;
	osc.send('/arp_Y' , arpSettings.Y );
}

//following probably/might not be needed here...
// needs updating for repeating sections...
function repeat(ID) {
	let div = [];
	if(ID === 1) div = [2,16];
	else if (ID === 2) div = [4,8];
	else if(ID === undefined) div = [2,16];
	let _Y = noteArrangement.slice(0, (noteArrangement.length/div[0]) );
	let _X = position.slice(0, (position.length/div[0]) );
	var outY = _Y.concat(_Y);
	var outX = _X.concat( utils.add(_X, div[1]) );
	selectArpNotes(outY, outX);
}
function resetGOSC() {
	sendVelocity( utils.fill(7, noteArrangement.length) );	
	sendOctaves( utils.fill(1, noteArrangement.length) );	
	sendChannel( utils.fill(1, noteArrangement.length) );	
	sendSustains( utils.fill(2, noteArrangement.length) );	
}
function importTemplate(ID){
	templates.call(ID); // populates "T" make a list
	const template = templates.T; // 
	//setChords(template.Y, template.X, template.O); 
	selectArpNotes(template.Y, template.X);
	sendVelocity(template.G);
	sendOctaves(template.O); // sets octaveData variable and sends to Usine.
	sendChannel(template.C);
	sendSustains(template.S);
}


module.exports = {
	selectArpNotes,
	setChordScale,
	sendVelocity,
	sendOctaves,
	sendChannel,
	sendSustains,
	importTemplate,
	resetGOSC,
	repeat,
	randomSeq,
	shuffle,
	invert,
	setPitch,
}