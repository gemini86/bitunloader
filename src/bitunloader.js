module.exports = function bitunloader(input, output, padding = 0) {
	if (input == undefined || output == undefined){
		throw new Error('bitunloader() expects exactly two arguments');
	}

	function checkInput(input) {
		let result = parseInt(input);
		if (isNaN(result)) {
			throw new Error(`Argument is not a number or parsable string: ${input}`);
		} else {
			return result;
		}
	}

	input = checkInput(input);
	padding = checkInput(padding);

	/*output param should be an Object containing property 'mode'. Mode options are 'string', 'array' and 'object'. If mode is 'string' then no other properties are required. If 'array' or 'object', then an additional property 'type', which can be either 'bool' or 'bit'*/
	if (output.mode == undefined) {
		throw new Error('Output mode argument invalid: must be an object with \'mode\' property set to \'string\', \'array\', or \'object\'.');
	}
	if (output.mode === 'string') {
		return input.toString(2).padStart(padding, '0');
	} else if (output.mode === 'array') {
		if (output.type == 'bit') {
			let result = input.toString(2).padStart(padding, '0').split('').reverse();
			for (var i in result) {
				result[i] = Number(result[i]);
			}
			return result;
		} else if (output.type == 'bool') {
			let result = input.toString(2).padStart(padding, '0').split('').reverse();
			for (let i in result) {
				result[i] = result[i] == '1' ? true : false;
			}
			return result;
		} else {
			throw new Error(`Output mode argument invalid: Type: '${output.type}' is not valid, must be 'bit' or 'bool' for Array output mode.`);
		}
	} else if (output.mode === 'object') {
		if (output.type == 'bit') {
			input = input.toString(2).padStart(padding, '0').split('').reverse();
			let result = {};
			for (let i in input) {
				result[i] = Number(input[i]);
			}
			return result;
		} else if ( output.type == 'bool') {
			input = input.toString(2).padStart(padding, '0').split('').reverse();
			let result = {};
			for (let i in input) {
				result[i] = input[i] == '1' ? true : false;
			}
			return result;
		} else {
			throw new Error(`Output mode argument invalid: Type: '${output.type}' is not valid, must be 'bit' or 'bool' for Object output mode.`);
		}
	} else {
		throw new Error(`Output mode argument invalid: '${output.mode}' is not a valid mode property.`);
	}
};
