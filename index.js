var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var usleep = function(s) {
	var e = new Date().getTime() + (s / 1000);
	while (new Date().getTime() <= e) {
	;
	}
};

var CLOSE_BYTE = 0x55;

var conf = {
	ipaddres: '10.10.100.254',
	port: 8899
}

var Commands = {
	'rgbwAllOn': [0x42, 0x00],
	'rgbwAllOff': [0x41, 0x00],
	'rgbwGroup1On': [0x45, 0x00],
	'rgbwGroup2On': [0x47, 0x00],
	'rgbwGroup3On': [0x49, 0x00],
	'rgbwGroup4On': [0x4B, 0x00],
	'rgbwGroup1Off': [0x46, 0x00],
	'rgbwGroup2Off': [0x48, 0x00],
	'rgbwGroup3Off': [0x4a, 0x00],
	'rgbwGroup4Off': [0x4c, 0x00],
	'rgbwBrightnessMax': [0x4e, 0x1b],
	'rgbwBrightnessMin': [0x4e, 0x02],
	'rgbwDiscoMode': [0x4d, 0x00],
	'rgbwDiscoSlower': [0x43, 0x00],
	'rgbwDiscoFaster': [0x44, 0x00],
	'rgbwAllSetToWhite': [0xc2, 0x00],
	'rgbwGroup1SetToWhite': [0xc5, 0x00],
	'rgbwGroup2SetToWhite': [0xc7, 0x00],
	'rgbwGroup3SetToWhite': [0xc9, 0x00],
	'rgbwGroup4SetToWhite': [0xcb, 0x00],
	'rgbwSetColorToViolet': [0x40, 0x00],
	'rgbwSetColorToRoyalBlue': [0x40, 0x10],
	'rgbwSetColorToBabyBlue': [0x40, 0x20],
	'rgbwSetColorToAqua': [0x40, 0x30],
	'rgbwSetColorToRoyalMint': [0x40, 0x40],
	'rgbwSetColorToSeafoamGreen': [0x40, 0x50],
	'rgbwSetColorToGreen': [0x40, 0x60],
	'rgbwSetColorToLimeGreen': [0x40, 0x70],
	'rgbwSetColorToYellow': [0x40, 0x80],
	'rgbwSetColorToYellowOrange': [0x40, 0x90],
	'rgbwSetColorToOrange': [0x40, 0xa0],
	'rgbwSetColorToRed': [0x40, 0xb0],
	'rgbwSetColorToPink': [0x40, 0xc0],
	'rgbwSetColorToFusia': [0x40, 0xd0],
	'rgbwSetColorToLilac': [0x40, 0xe0],
	'rgbwSetColorToLavendar': [0x40, 0xf0]
};

var sendCommand = function(cmd){
	var buffer = new Buffer(cmd.concat(CLOSE_BYTE), 'hex');

	client.send( buffer, 0, buffer.length, conf.port, conf.ipaddres, cb);

	usleep(100000);
};

cb = function (err, bytes) {
    if (err) {
        console.log("udp error:" + err);
        throw new Error(err);
    }
};

// The actual commands
sendCommand(Commands.rgbwAllOn);
//sendCommand(Commands.rgbwAllOff);