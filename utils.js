//upgrade to include all lemur functions! :) 
function nonnull(arr) {
  return arr.reduce((indices, value, index) => {
    if (value !== 0 ) {
      indices.push(index);
    }
    return indices;
  }, []);
}
function shuffle(array){
	return array.sort( () => Math.random() - 0.5 );
}

function generateArray(size, max, multiplier, addition) {
	let output = [];
	for(let i = 0; i < size; i++) {
		output[i] = (Math.round(Math.random() * max) * multiplier) + addition;	
	}
	return output;
}

function fill( val, size ){
	let output = [];
	for(let i = 0; i < size; i++) {
		output[i] = val;
	}
	return output;
}

function stretch(originalArray, newLength) {
  const newArray = [];
  const originalLength = originalArray.length;
  
  for (let i = 0; i < newLength; i++) {
    newArray.push(originalArray[i % originalLength]);
  }
  
  return newArray;
}
function invert(array, max){
	let output = [];
	for( let i=0; i < max; i++){
		output[i] = max - array[i]; 
	}
	return output;
}
function add( array, value ){
	let output = [];
	for(let i = 0; i < array.length; i++) {
		output[i] = array[i] + value;
	}
	return output;
}

function generateX(numY) {
  const noteSpacing = 32 / numY;
  const xCoords = [];
  for (let i = 0; i < numY; i++) {
    const xCoord = Math.round(i * noteSpacing);
    xCoords.push(xCoord);
  }
  return xCoords;
}

function calculateDistances(arr, n) {
const size = arr.length;
  let obj = arr;
  let array = obj.filter(x => x !== null);
  let distance = [];
  for (let i = 0; i < array.length; i++) {
    let currDist = array[(i+1) % array.length] - array[i];
    if (currDist < 0) currDist += n;
    distance.push(currDist);
  }
  let lastDist = n - array[array.length - 1] + array[0];
  if (lastDist < 0) lastDist += n;
  if (array.length === 1) lastDist = 0;
  distance.push(lastDist);
  let result = {};
  for (let i = 0; i < array.length; i++) {
    result[array[i]] = distance[i];
  }
  let output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(result[array[i]]);
  }
  return output;
}


module.exports = {
	add,
	fill,
	stretch,
	invert,
	shuffle,
	nonnull,
	generateArray,
	generateX,
	calculateDistances,
	
  rand: function (max) {
	return Math.floor(Math.random() * max);
  },
  //const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

  wrap: function (tgt,arr) {
	var sizeArr = arr.length; // take the length of num_2 array
	var outStrA;
	if(sizeArr <= 4 && sizeArr > 1 ) outStrA = arr.repeat(8);
	else if(sizeArr <= 8) outStrA = arr.repeat(4);
	else if(sizeArr <= 16) outStrA = arr.repeat(2);
	outStrA = outStrA.substr(0,16);	
	console.log("test = " + outStrA + "    length = " + outStrA.length);
	return outStrA;
  },

};

