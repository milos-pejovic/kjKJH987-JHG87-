/**
*	Short for document.write();
*/
function d(x) {
	document.write(x);
}

/** 
* Returns a radnom number between 1 and x;
*/
function rand(x) {
	return Math.ceil(Math.random() * x);
}

/** 
* Returns a radnom number between 0 and x - 1;
*/	
function randz(x) {
	return Math.floor(Math.random() * x);
}

/** 
* Capitalizes the first letter of the string. 
*/		
function capitalF(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Return random array array element
 * @param {array} arr 
 */
function arrand(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Return a random number between 1 and diceSize
 * @param {int} diceSize 
 */
function roll(diceSize) {
	return rand(diceSize);
}