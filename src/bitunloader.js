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

	var mode = {
		string: function() {
			return input.toString(2).padStart(options.padding, '0');
		},
		array: function() {
			let type = {
				bit: function() {
					let result = input.toString(2).padStart(options.padding, '0').split('').reverse();
					for (var i in result) {
						result[i] = Number(result[i]);
					}
					return result;
				},
				bool: function() {
					let result = input.toString(2).padStart(options.padding, '0').split('').reverse();
					for (let i in result) {
						result[i] = result[i] == '1' ? true : false;
					}
					return result;
				}
			};
			if (!type.hasOwnProperty(options.type)) {
				throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Array output mode.`);
			} else {
				return type[options.type]();
			}
		},
		object: function() {
			let type = {
				bit: function() {
					input = input.toString(2).padStart(options.padding, '0').split('').reverse();
					let result = {};
					for (let i in input) {
						result[`b${i}`] = Number(input[i]);
					}
					return result;
				},
				bool: function() {
					input = input.toString(2).padStart(options.padding, '0').split('').reverse();
					let result = {};
					for (let i in input) {
						result[`b${i}`] = input[i] == '1' ? true : false;
					}
					return result;
				}
			};
			if (!type.hasOwnProperty(options.type)) {
				throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Object output mode.`);
			} else {
				return type[options.type]();
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
