module.exports = function bitunloader(input, options = {mode: 'string', padding: 0}) {
	function checkInput(input) {
		if (isNaN(input)) {
			throw new Error(`Argument is not a number or parsable string: ${input}`);
		} else {
			let result = Math.abs(parseInt(input));
			return result;
		}
	}

	if (input == undefined){
		throw new Error('Function expects at least one argument');
	}

	input = checkInput(input);

	var mode = {
		_toArray: function(input) {
			return mode.string(input).split('').reverse();
		},
		string: function(input) {
			return input.toString(2).padStart(options.padding, '0');
		},
		array: function() {
			let type = {
				bit: function(input) {
					let result = mode._toArray(input);
					result.forEach((value, index) => {
						result[index] = Number(value);
					});
					return result;
				},
				bool: function(input) {
					let result = mode._toArray(input);
					result.forEach((value, index) => {
						result[index] = value == true;
					});
					return result;
				}
			};
			if (!type.hasOwnProperty(options.type)) {
				throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Array output mode.`);
			} else {
				return type[options.type](input);
			}
		},
		object: function() {
			let type = {
				bit: function(input) {
					input = mode._toArray(input);
					let result = {};
					input.forEach((value, index) => {
						result[`b${index}`] = Number(value);
					});
					return result;
				},
				bool: function(input) {
					input = mode._toArray(input);
					let result = {};
					input.forEach((value, index) => {
						result[`b${index}`] = value == true;
					});
					return result;
				}
			};
			if (!type.hasOwnProperty(options.type)) {
				throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Object output mode.`);
			} else {
				return type[options.type](input);
			}
		}
	};

	if (typeof options != 'object') {
		throw new Error(`Options argument invalid: '${options}' is not a valid object. Options argument must be an Object`);
	}

	options.mode = options.mode || 'string';

	if (options.padding) {
		checkInput(options.padding);
	} else {
		options.padding = 0;
	}
	if (!mode.hasOwnProperty(options.mode)) {
		throw new Error(`Options argument invalid: '${options.mode}' is not a valid mode property.`);
	}
	return mode[options.mode](input);
};
