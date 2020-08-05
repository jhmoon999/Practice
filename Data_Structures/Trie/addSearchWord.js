//* August 5: Add and Search Word - Data Structure Design

// Design a data structure that supports the following two operations:

// void addWord(word)
// bool search(word)
// search(word) can search a literal word or a regular expression string containing only letters a-z or '.'
// A '.' means it can represent any one letter.

// Example:
// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true

/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.trie = {};
    this.isEnd = false;
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    // ex. addWord("blue")
    // => this.trie = {b: {l: {u: {e: {isEnd: true}}}}}
    let currObj = this.trie;
    for (let i = 0; i < word.length; i++) {
        if (!currObj[word[i]]) currObj[word[i]] = {};
        currObj = currObj[word[i]];
    }
    currObj.isEnd = true;   // indicate end of word reached
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    const dfsTraversal = function(i, currObj) {
        if (i === word.length) return currObj.isEnd === true;
        if (word[i] === '.') {
            // Since '.' can represent any letter, we have to dfs all keys
            // in the current object for the next letter
            for (let next in currObj) {
                if (dfsTraversal(i + 1, currObj[next])) return true;
            }
        }
        else if (currObj[word[i]]) {
            return dfsTraversal(i + 1, currObj[word[i]]);
        }
        return false;
    }
    return dfsTraversal(0, this.trie);
};

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */