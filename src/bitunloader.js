module.exports = function bitunloader(input, options = {mode: 'string', padding: 0}) {
	if (input == undefined){
		throw new Error('Function expects at least one argument');
	}

	function checkInput(input) {
		if (Number.isInteger(input)) {
			return Math.abs(input);
		} else {
			let result = parseInt(input);
			if (isNaN(result)) {
				throw new Error(`Argument is not a number or parsable string: ${input}`);
			} else {
				return Math.abs(result);
			}
		}
	}

	input = checkInput(input);

	if (typeof options != 'object') {
		throw new Error(`Options argument invalid: '${options}' is not a valid object. Options argument must be an Object`);
	}

	options.mode = options.mode || 'string';

	if (options.padding) {
		checkInput(options.padding);
	} else {
		options.padding = 0;
	}

	if (options.mode === 'string') {
		return input.toString(2).padStart(options.padding, '0');
	} else if (options.mode === 'array') {
		if (options.type == 'bit') {
			let result = input.toString(2).padStart(options.padding, '0').split('').reverse();
			for (var i in result) {
				result[i] = Number(result[i]);
			}
			return result;
		} else if (options.type == 'bool') {
			let result = input.toString(2).padStart(options.padding, '0').split('').reverse();
			for (let i in result) {
				result[i] = result[i] == '1' ? true : false;
			}
			return result;
		} else {
			throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Array output mode.`);
		}
	} else if (options.mode === 'object') {
		if (options.type == 'bit') {
			input = input.toString(2).padStart(options.padding, '0').split('').reverse();
			let result = {};
			for (let i in input) {
				result[`b${i}`] = Number(input[i]);
			}
			return result;
		} else if ( options.type == 'bool') {
			input = input.toString(2).padStart(options.padding, '0').split('').reverse();
			let result = {};
			for (let i in input) {
				result[`b${i}`] = input[i] == '1' ? true : false;
			}
			return result;
		} else {
			throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Object output mode.`);
		}
	} else {
		throw new Error(`Options argument invalid: '${options.mode}' is not a valid mode property.`);
	}
};
