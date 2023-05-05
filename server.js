//require('dotenv').config();

var utils = require('./utils');
const osc = require('./OSC');
const scales = require('./scales');

const key = scales.getKey(); 
const root = key ;
const scaleType = scales.getKeyScale(); //'ionian';
const scale = scales.getScale(root, scaleType);
const notesStr = scales.returnNotes(scale);
const relative = scales.getRelative(scale);
const chords = scales.getChordDegrees(scale);
const relativeChords = scales.getChordDegrees(relative);

const a_seq = require('./arp_sequencer');
const c_seq = require('./chord_sequencer');

/* Arp Sequencer */
osc.request.on('A', (code, msg) => {
	console.log(`Got Arp Message ${code} and ${msg}`);
	//core codes
	if(msg === 'X')a_seq.setX(code);
	else if(msg === 'Y')a_seq.setY(code);
	else if(msg === 'G')a_seq.setG(code);
	else if(msg === 'O')a_seq.setO(code);
	else if(msg === 'S')a_seq.setS(code);
	else if(msg === 'C')a_seq.setC(code);
	//control codes
	else if(msg === 'IO')a_seq.IO();
	else if(msg === 'CLK')a_seq.setClock(code);
	else if(msg === 'SWING')a_seq.setSwing(code);
	
}
/* Bass Sequencer */
osc.request.on('B', (code, msg) => {
	console.log(`Got Bass Message ${code} and ${msg}`);
	//core codes
	if(msg === 'X')b_seq.setX(code);
	else if(msg === 'Y')b_seq.setY(code);
	else if(msg === 'G')b_seq.setG(code);
	else if(msg === 'O')b_seq.setO(code);
	else if(msg === 'S')b_seq.setS(code);
	else if(msg === 'C')b_seq.setC(code);
	//control codes
	else if(msg === 'IO')b_seq.IO();
	else if(msg === 'CLK')b_seq.setClock(code);
	else if(msg === 'SWING')b_seq.setSwing(code);
	
}
/* Chord Sequencer */
osc.request.on('C', (code, msg) => {
	console.log(`Got Chords Message ${code} and ${msg}`);
	//core codes
	if(msg === 'X')c_seq.setX(code);
	else if(msg === 'Y')c_seq.setChords(code);
	else if(msg === 'G')c_seq.setG(code);
	else if(msg === 'O')c_seq.setO(code);
	else if(msg === 'S')c_seq.setS(code);
	else if(msg === 'C')c_seq.setC(code);
	//control codes
	else if(msg === 'IO')c_seq.IO();
	else if(msg === 'autoV')c_seq.autoVoice_IO();
	else if(msg === 'CLK')c_seq.setClock(code);
	//quick codes ==//might not be needed or useful here...
	else if(msg === 'resetGOSC')c_seq.resetGOSC();
	//else if(msg === 'RAND')c_seq.randomSeq(code);
	//else if(msg === 'repeat')c_seq.repeatSeq();
	//else if(msg === 'template')c_seq.importProgression(code);
	
	//drone IO
	else if(msg === 'DIO')c_seq.dIO(code);
	//drone notes
	else if(msg === 'DA')c_seq.setDroneNotes(1, 1, code);
	else if(msg === 'DB')c_seq.setDroneNotes(2, 1, code);
	else if(msg === 'DC')c_seq.setDroneNotes(3, 1, code);
	else if(msg === 'DD')c_seq.setDroneNotes(4, 1, code);
	//drone octaves
	else if(msg === 'DAo')c_seq.setDroneNotes(1, 0, code);
	else if(msg === 'DBo')c_seq.setDroneNotes(2, 0, code);
	else if(msg === 'DCo')c_seq.setDroneNotes(3, 0, code);
	else if(msg === 'DDo')c_seq.setDroneNotes(4, 0, code);
	}
);
