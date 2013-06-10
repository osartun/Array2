function squaredBrackets() {
	// This is meant to be the equivalent to ["this", "notation"]
	return (new Array2(0)).concat(arguments);
}

String.prototype.split2 = function (delimiter) {
	// This is like "string".split, but returns an instance of Array2
	// Poorly designed, but whatever.
	var res = new Array2(0), lastIndex = 0, nextIndex, str = this, flags = "g", delStr;
	if (Object.prototype.toString.call(delimiter) === "[object RegExp]") {
		// get the current flags, if there are any
		delStr = delimiter.toString();
		flags = delStr.substr(delStr.lastIndexOf("/") + 1);
		// add the "g" flag if it's missing
		delimiter = new RegExp(delimiter.source, flags.indexOf("g") > -1 ? flags : flags + "g");
	} else {
		delimiter = new RegExp(delimiter, "g");
	}
	str.replace(delimiter, function (match, index) {
		res.push(str.slice(nextIndex, index));
		lastIndex = index;
		nextIndex = index + match.length;
	});
	if (lastIndex < str.length - 1) {
		res.push(str.substr(lastIndex + 1));
	}
	return res;
}

function Array2(length) {
	if (arguments.length === 1 && typeof length === "number") {
		if (length > -1) {
			this.length = length;
		} else {
			throw new RangeError("Invalid array length")
		}
	} else if (arguments.length) {
		this.splice.apply(this, squaredBrackets(0, 0).concat(arguments));
	}
}
Array2.prototype = {
	length: 0,
	slice: function (begin, end) {
		if (typeof begin !== "number") {
			begin = 0;
		} else if (begin < 0) {
			begin = this.length >= -begin ? this.length + begin : 0;
		}

		if (typeof end !== "number") {
			end = this.length;
		} else if (end < 0) {
			end = this.length >= -end ? this.length + end : 0;
		}

		var length = end - begin, res = new Array2(length), i = 0;
		for (; i < length; i++) {
			res[i] = this[begin + i];
		}
		return res;
	},
	splice: function (index, nrOfItemsToRemove) {
		// normalize arguments
		if (typeof index !== "number") {
			index = 0;
		} else if (index < 0) {
			index = this.length > -index ? this.length + index : 0; 
		}
		if (typeof nrOfItemsToRemove !== "number" || nrOfItemsToRemove < 0) {
			nrOfItemsToRemove = 0;
		} else if (nrOfItemsToRemove > this.length) {
			nrOfItemsToRemove = this.length - 1;
		}

		// This code is astonishingly inefficient, but whatever.

		// Remove items

		var i, j, args = arguments, argOffset = 2, diff, removedItems = new Array2(0);

		while (nrOfItemsToRemove--) {
			removedItems.push(this[index]);
			delete this[index];
			for (i = index + 1; i < this.length; i++) {
				this[i - 1] = this[i];
			}
			delete this[this.length - 1];
			this.length--;
		}

		// Add items

		if ((diff = args.length - argOffset) > 0) {
			for (j = this.length - 1; j >= index; j--) {
				this[j + diff] = this[j];
			}
			this.length += diff;

			for (i = 0; i < diff; i++) {
				this[index + i] = args[argOffset + i];
			}
		}
		return removedItems;
	},
	pop: function () {
		// We could use splice, but this one is more efficient:
		var
		lastIndex = this.length - 1,
		lastItem = this[lastIndex];
		this.length--;
		delete this[lastIndex];
		return lastItem;
	},
	push: function () {
		// We could use splice, but this one is more efficient:
		for (var i = 0; i < arguments.length; i++) {
			this[this.length] = arguments[i];
			this.length++;
		}
		return this.length;
	},
	shift: function () {
		return this.splice(0, 1);
	},
	unshift: function () {
		this.splice.apply(this, squaredBrackets(this.length, 0).concat(arguments));
		return this.length;
	},
	concat: function () {
		var res = this.slice(), resLen = res.length, i = 0, len = arguments.length, arg, j;
		for (; i < len; i++) {
			arg = arguments[i];
			if (arg && arg.length === +arg.length && arg.length > -1) {
				for (j = 0; j < arg.length; j++) {
					res[resLen] = arg[j];
					resLen++;
				}
			} else {
				res[resLen] = arg;
				resLen++;
			}
		}
		res.length = resLen;
		return res;
	},
	reverse: function () {
		var res = this.slice(), i = this.length - 1, j = 0;
		for (; i > -1; i--, j++) {
			res[j] = this[i];
		}
		return res;
	},
	join: function (delimiter) {
		var res = "", i = 0, end = this.length - 1;
		for (; i <= end; i++) {
			if (this[i] !== undefined) {
				res += this[i];
			}
			if (i < end) {
				res += delimiter;
			}
		}
		return res;
	},
	toString: function () {
		return this.join(",");
	}
}
