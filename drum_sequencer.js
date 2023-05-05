const templates = require('./drum_templates')
var utils = require('./utils');
const pats = require('./patternList');
const osc = require('./OSC');
const volumes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const samples = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var seqMem = {};
var seq = {
	kick1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	snare1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	hh1 : [	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	hho1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	kick2 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	snare2 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	hh2 : [	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	ride1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
};
var pitch = {
	kick1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	snare1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	hh1 : [	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	hho1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	kick2 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	snare2 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	hh2 : [	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	],
	ride1 : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
};

const seqKeys = Object.keys(seq);

function initSeq() { return seq }

function setVolume(channel, level) {
	var outVol = [];
	volumes[channel-1] = level;
	osc.send( '/D_VOL' ,  volumes, channel);
}

function setSample(channel, sample){
	let output = pitch[ seqKeys[ channel ] ].slice();
	let seqArray = seq[ seqKeys[ channel ] ].slice();
	//console.log('sample');
	//console.log(sample);
	//console.log('channel');
	//console.log(channel);
	if( channel != 0 ){	
		if(sample === -1){ // random all to same sample
			var randomValue = utils.rand(127) + 1;
			console.log('randomValue');
			console.log(randomValue);
			for(let i=0;i<64;i++){
				output[i] = randomValue;
			}
		}
		else if(sample === -2){ // random all samples in channel
			console.log('working!');
			for(let i=0;i<64;i++){
				var randomValue = utils.rand(127) + 1;
				output[i] = utils.rand(127) + 1;
				
			}
		}
		else if(sample > 0) {
			for(let i=0;i<64;i++){
				output[i] = Number(sample);
			}
		}
		
	}
	else if (channel === 0) {
		for(let i=0;i<8;i++){
			var randomValue = utils.rand(127) + 1;
			for(let j=0;j<64;j++){
				output[i][j] = randomValue;
			}
		}
	}
	//update to change pitch variable to output. then send pitch
	osc.send('/drums_pitch', output, channel);
	//console.log(output)
}
	
	/*
	var useSample = sample;
	if( channel != 0 ){
		if(sample === -1 ) useSample = utils.rand(100);
		samples[channel-1] = useSample;
		osc.send('/drums_pitch', channel ,useSample);
	}
	else if (channel === 0) {
		for(let i=0;i<8;i++){
			if(sample === -1 ) useSample = utils.rand(100);
			console.log(useSample);
			samples[i] = useSample;
			osc.send('/drums_pitch', i ,useSample); // better to send array after loop..
		}
	}
	*/


function setPattern(channel, ID, page) {
	let output = pats.patternLibrary(ID);
	if(page === undefined){
		seq[ seqKeys[ channel ] ] = [output, output, output, output].flat();
	}
	else if (page === 0); // wrap array around 64, requires utils.wrap function to be done here..?
	else {
		//take slice, replace subarr, send to seq. update!
		var pg = (page-1)*16;
		let takeHalf1 = seq[ seqKeys[ channel ] ].slice(0, pg);
		let takeHalf2 = seq[ seqKeys[ channel ] ].slice(pg+16);
		let send = [takeHalf1, output, takeHalf2].flat();
		
		//console.log('takeArray');
		//console.log(send);
		seq[ seqKeys[ channel ] ] = send;
	}
}

function clearRow( channel ) {
	seq[ seqKeys[ channel ] ] = 
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	]
}
function buildRow( channel, array, page) {
	let output = array.split("").map(Number); // required?
	if(page === undefined){
		seq[ seqKeys[ channel ] ] = [output, output, output, output].flat();
	}
	else if (page === 0); // wrap array around 64, requires utils.wrap function to be done here..?
	else {
		//take slice, replace subarr, send to seq. update!
		var pg = (page-1)*16;
		let takeHalf1 = seq[ seqKeys[ channel ] ].slice(0, pg);
		let takeHalf2 = seq[ seqKeys[ channel ] ].slice(pg+16);
		let send = [takeHalf1, output, takeHalf2].flat();
		
		//console.log('takeArray');
		//console.log(send);
		seq[ seqKeys[ channel ] ] = send;
	}
}
function repeatRow( channel, page ) {
	if(page === undefined)page = 1;
	var pg = (page-1)*16;
	let output = seq[ seqKeys[ channel ] ].slice(pg,pg+16)
	let send = [output, output, output, output].flat();
		//console.log(send);
	seq[ seqKeys[ channel ] ] = send;
}
function generateRandom(channel, page){
	let output = utils.generateArray(16,1,7);
	if(page === undefined){
		seq[ seqKeys[ channel ] ] = [output, output, output, output].flat();
	}
	else if (page === 0); // wrap array around 64, requires utils.wrap function to be done here..?
	else {
		//take slice, replace subarr, send to seq. update!
		var pg = (page-1)*16;
		let takeHalf1 = seq[ seqKeys[ channel ] ].slice(0, pg);
		let takeHalf2 = seq[ seqKeys[ channel ] ].slice(pg+16);
		let send = [takeHalf1, output, takeHalf2].flat();
		//console.log(send);
		seq[ seqKeys[ channel ] ] = send;
	}
}
function fillRandom(channel, page) {
	var pg = (page-1)*16;
	let output = [];
	if(page === undefined){
		let useArray = seq[ seqKeys[ channel ] ].slice()
		for(let i=0;i<64;i++){
			if(useArray[i] > 0)  output[i] = useArray[i];
			else output[i] = utils.rand(5) + 1; 
		}
		seq[ seqKeys[ channel ] ] = output.flat();
		//console.log(output);
	}
	else if (page === 0); // wrap array around 64, requires utils.wrap function to be done here..?
	else {
		let useArray = seq[ seqKeys[ channel ] ].slice(pg,pg+16)
		for(let i=0;i<16;i++){
			if(useArray[i] > 0)  output[i] = useArray[i];
			else output[i] = utils.rand(5) + 1; 
		}
		let takeHalf1 = seq[ seqKeys[ channel ] ].slice(0, pg);
		let takeHalf2 = seq[ seqKeys[ channel ] ].slice(pg+16);
		let send = [takeHalf1, output, takeHalf2].flat();
		//console.log(send);
		seq[ seqKeys[ channel ] ] = send;
	}
}

function shuffleRandom( channel, page ) {
	var pg = (page-1)*16;
	let output = [];
	if(page === undefined){
		let useArray = seq[ seqKeys[ channel ] ].slice()
		useArray.sort( () => Math.random() - 0.5 );
		seq[ seqKeys[ channel ] ] = useArray;
		//console.log(useArray);
	}
	else if (page === 0); // wrap array around 64, requires utils.wrap function to be done here..?
	else {
		let useArray = seq[ seqKeys[ channel ] ].slice(pg,pg+16)
		useArray.sort( () => Math.random() - 0.5 );
		let takeHalf1 = seq[ seqKeys[ channel ] ].slice(0, pg);
		let takeHalf2 = seq[ seqKeys[ channel ] ].slice(pg+16);
		let send = [takeHalf1, output, takeHalf2].flat();
		//console.log(send);
		seq[ seqKeys[ channel ] ] = send;
	}
}
function invertGrid( channel, page) {
	var pg = (page-1)*16;
	let output = [];
	if(page === undefined){
		let useArray = seq[ seqKeys[ channel ] ].slice()
		for(let i=0;i<64;i++){
			output[i] = 7- useArray[i];
		}	
		seq[ seqKeys[ channel ] ] = output;
		//console.log(output);
	}
	else if (page === 0); // wrap array around 64, requires utils.wrap function to be done here..?
	else {
		let useArray = seq[ seqKeys[ channel ] ].slice(pg,pg+16)
		for(let i=0;i<16;i++){
			output[i] = 7- useArray[i];
		}
		let takeHalf1 = seq[ seqKeys[ channel ] ].slice(0, pg);
		let takeHalf2 = seq[ seqKeys[ channel ] ].slice(pg+16);
		let send = [takeHalf1, output, takeHalf2].flat();
		console.log(send);
		seq[ seqKeys[ channel ] ] = send;
	}
}
// do this in seq! in order to include fill-ins... ditry fix for now to include patterns..
function buildSeq(pattern, channel){
  var sections = [];
  console.log(pattern.length);
  if(pattern.length === 16){
    sections = [
		seq[channel].slice(0, 16),
		seq[channel].slice(16, 32),
		seq[channel].slice(32, 48),
		seq[channel].slice(48, 64)
	];
  }
  else if (pattern.length === 32){
	sections = [
		seq[channel].slice(0, 32),
		seq[channel].slice(32,64),
	];  
  }
  else if (pattern.length === 64) {
	sections = [
		seq[channel].slice(0, 64),
	];  
  }
  for (var i = 0; i < sections.length; i++) {
    //if(page)
	sections[i] = pattern;
  }
  seq[channel] = sections.flat();
}
function buildFill(input, channel){
	var output = [];
	//seqMem[channel] = seq[channel].slice();
	output = seq[channel].slice(0, (64-input.length));
	//console.log('mid-accesstemplate');
	//console.log(seq[channel].slice(0, (64-input.length);
	output.push(input);
	seq[channel] = output.flat();
}

function importTemplate(ID){
	// if genre...
	//templates.dnb_basics1(); // populates "T" make a list
	templates.call_dnb(ID); // populates "T" make a list
	const template = templates.T; // 
	let drumkeys = Object.keys(template);
	for(let i=0;i< (drumkeys.length-1);i++){
		buildSeq(template[drumkeys[i]] , drumkeys[i]);
	}		
	//console.log('accesstemplate');
	//console.log(template);
	//buildSeq(template.kick1 , 'kick1');
}
function importFill(ID){
	// if genre...
	//templates.dnb_basics1(); // populates "T" make a list
	//console.log('pre-accesstemplate');
	//console.log(templates.T);
	templates.call_fill(ID); // populates "T" make a list
	const template = templates.T; // 
	let drumkeys = Object.keys(template);
	for(let i=0;i< (drumkeys.length-1);i++){
		buildFill(template[drumkeys[i]] , drumkeys[i]);
	}		
	//console.log('post-accesstemplate');
	//console.log(seq);
	//buildSeq(template.kick1 , 'kick1');
}

module.exports = {
	seq,
	initSeq,
	setSample,
	buildSeq,
	importTemplate,
	importFill,
	clearRow,
	repeatRow,
	generateRandom,
	fillRandom,
	shuffleRandom,
	invertGrid,
	buildRow,
	setPattern,
	setVolume,
}