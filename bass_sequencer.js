/* EDITED FOR LEMUR AND TOUCHSCREEN USE ONLY */
// can reduce to a class!
var utils = require('./utils');
const templates = require('./bass_templates');
const osc = require('./OSC');

let bassSettings = [
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

function IO() {  bassSettings.IO = !bassSettings.IO; osc.send('/bass_IO', bassSettings.IO);
function setClock(val) {  bassSettings.CLK = val; osc.send('/bClock', val); }
function setSwing(val) {  bassSettings.SWING = val; osc.send('/bSwing', val); }
function setG(msg){ bassSettings.G = msg; osc.send('/bass_G', msg); }
function setO(msg){ bassSettings.O = msg; osc.send('/bass_O', msg); }
function setS(msg){ bassSettings.S = msg; osc.send('/bass_S', msg); }
function setC(msg){ bassSettings.C = msg; osc.send('/bass_C', msg); }

//XY functions
function setX(array){
	bassSettings.X = array;
	dist = utils.calculateDistances(bassSettings.X,32); // distance between each note on X axis
	osc.send('/bass_pos', bassSettings.X); //send generated X coords
	osc.send('/bass_dist', dist); //send generated X coords
}
function setY(Y){ 
	bassSettings.Y = Y;
	osc.send('/bass_Y' , bassSettings.Y );
}


module.exports = {
	chordScales,
	
	IO,
	setClock,
	setSwing,
	setX,
	setY,
	setG,
	setO,
	setS,
	setC,
	
}