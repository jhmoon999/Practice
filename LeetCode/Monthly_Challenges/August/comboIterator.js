//* August 13: Iterator for Combination

// Design an Iterator class, which has:

// A constructor that takes a string characters of sorted distinct lowercase English letters and a number combinationLength as arguments.
// A function next() that returns the next combination of length combinationLength in lexicographical order.
// A function hasNext() that returns True if and only if there exists a next combination.
 
// Example:

// CombinationIterator iterator = new CombinationIterator("abc", 2); // creates the iterator.

// iterator.next(); // returns "ab"
// iterator.hasNext(); // returns true
// iterator.next(); // returns "ac"
// iterator.hasNext(); // returns true
// iterator.next(); // returns "bc"
// iterator.hasNext(); // returns false

/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function(characters, combinationLength) {
    const combinations = [];
    const createCombo = function(combo, i) {
        // found valid combination of correct length
        if (combo.length === combinationLength) {
            combinations.push(combo);
            return;
        }
        // run out of characters to create combinations with
        if (i === characters.length) return;
        createCombo(combo + characters[i], i + 1);  // take it or
        createCombo(combo, i + 1);                  // leave it
    }
    createCombo('', 0);
    this.combinations = combinations;
    this.index = 0;   // CombinationIterator.next() increments this
};

/**
 * @return {string}
 */
CombinationIterator.prototype.next = function() {
    // after returning the combination, this.index increments
    return this.combinations[this.index++];
};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function() {
    // hasNext is true if this.combinations[this.index] is not undefined
    return this.index < this.combinations.length;
};

/** 
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */