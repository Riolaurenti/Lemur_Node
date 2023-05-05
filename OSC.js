//const tmi = require('tmi.js');
const osc = require("osc");

const EventEmitter = require('events');
const request = new EventEmitter();

//const BAR_START = 1;
//const BAR_LAST = 12;
//var currentSection = 1; // every 8 bars..
//var sectionFlag = 0;
//const maxSections = 8; 
//let _CLOCK = 0;
//function getClock() { return _CLOCK; }

const udpPort = new osc.UDPPort({
    localAddress: "192.168.1.103",
    localPort: 10099,
    remoteAddress: "192.168.1.103",
    remotePort: 10000,
    metadata: true
});
udpPort.open();

//handles incoming message requests from lemur.
udpPort.on('message', function (oscMsg) {
	console.log('oscMsg',oscMsg);
	console.log(`Message: ${oscMsg.address}`);
	const builtArray = buildArray(oscMsg.args);
	switch( oscMsg.address ) {
		// Chord Sequencer Controls
		case '/C/X' : request.emit('C', builtArray, 'X'); break;
		case '/C/Y' : request.emit('C', builtArray, 'Y'); break;
		case '/C/G' : request.emit('C', builtArray, 'G'); break;
		case '/C/O' : request.emit('C', builtArray, 'O'); break;
		case '/C/S' : request.emit('C', builtArray, 'S'); break;
		case '/C/C' : request.emit('C', builtArray, 'C'); break;
		case '/C_IO' : request.emit('C', builtArray, 'IO'); break;
		case '/C_CLK' : request.emit('C', builtArray, 'CLK'); break;
		case '/C_autoVoice' : request.emit('C', builtArray, 'autoV'); break;
		// Chord Sequencer Drone Controls
		case '/drones_IO' : request.emit('C', builtArray, 'DIO'); break;
		case '/D/A' : request.emit('C', builtArray, 'DA'); break;
		case '/D/B' : request.emit('C', builtArray, 'DB'); break;
		case '/D/C' : request.emit('C', builtArray, 'DC'); break;
		case '/D/D' : request.emit('C', builtArray, 'DD'); break;
		case '/D_octA' : request.emit('C', builtArray, 'DAo'); break;
		case '/D_octB' : request.emit('C', builtArray, 'DBo'); break;
		case '/D_octC' : request.emit('C', builtArray, 'DCo'); break;
		case '/D_octD' : request.emit('C', builtArray, 'DDo'); break;
		// Arp Sequencer Controls
		case '/A/X' : request.emit('A', builtArray, 'X'); break;
		case '/A/Y' : request.emit('A', builtArray, 'Y'); break;
		case '/A/G' : request.emit('A', builtArray, 'G'); break;
		case '/A/O' : request.emit('A', builtArray, 'O'); break;
		case '/A/S' : request.emit('A', builtArray, 'S'); break;
		case '/A/C' : request.emit('A', builtArray, 'C'); break;
		case '/A_IO' : request.emit('A', builtArray, 'IO'); break;
		case '/A_CLK' : request.emit('A', builtArray, 'CLK'); break;
		case '/A_SWING' : request.emit('A', builtArray, 'SWING'); break;
		// Bass Sequencer Controls
		case '/B/X' : request.emit('B', builtArray, 'X'); break;
		case '/B/Y' : request.emit('B', builtArray, 'Y'); break;
		case '/B/G' : request.emit('B', builtArray, 'G'); break;
		case '/B/O' : request.emit('B', builtArray, 'O'); break;
		case '/B/S' : request.emit('B', builtArray, 'S'); break;
		case '/B/C' : request.emit('B', builtArray, 'C'); break;
		case '/B_IO' : request.emit('B', builtArray, 'IO'); break;
		case '/B_CLK' : request.emit('B', builtArray, 'CLK'); break;
		case '/B_SWING' : request.emit('B', builtArray, 'SWING'); break;

	}
  });

function buildArray(args){
	let output = [];
	for(let i=0; i< args.length;i++){
		output[i] = Math.round(args[i].value);
	}
		return output;
}
// rename send2Chan // or just undefinded in basic send function...
function send(tgt, val, chan, page) {
	var targetLink = tgt;
	var args = [];
	if(chan != undefined) args.push({ type: "i", value: chan });
	if(page != undefined) args.push({ type: "i", value: page });
	//console.log('val.length');
	//console.log(val.length);
	if(val.length === undefined) args.push({ type: "i", value: val });
	else for (var i = 0; i < val.length; i++) {
		args.push({ type: "i", value: val[i] });
	} 
	var msg = {
		address: targetLink,
		args: args
	};
  console.log("Sending message", msg.address, msg.args, "to", udpPort.options.remoteAddress + ":" + udpPort.options.remotePort);
  udpPort.send(msg);
};


/*
function sendTemplate(seq){
	
	send('/drum_seq', seq.kick1		,1);
	send('/drum_seq', seq.snare1		,2);
	send('/drum_seq', seq.hh1		,3);
	send('/drum_seq', seq.hho1		,4);
	send('/drum_seq', seq.kick2		,5);
	send('/drum_seq', seq.snare2		,6);
	send('/drum_seq', seq.hh2		,7);
	send('/drum_seq', seq.ride1		,8);

}
*/

module.exports = {
	request,
	
	//getClock,
	send,
	//sendTemplate,
}