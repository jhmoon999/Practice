//* August 23: Stream of Characters

// Implement the StreamChecker class as follows:

// StreamChecker(words): Constructor, init the data structure with the given words.
// query(letter): returns true if and only if for some k >= 1, the last k characters queried (in order from oldest to newest, including this letter just queried) spell one of the words in the given list.
 
// Example:

// StreamChecker streamChecker = new StreamChecker(["cd","f","kl"]); // init the dictionary.
// streamChecker.query('a');    // return false
// streamChecker.query('b');    // return false
// streamChecker.query('c');    // return false
// streamChecker.query('d');    // return true, because 'cd' is in the wordlist
// streamChecker.query('e');    // return false
// streamChecker.query('f');    // return true, because 'f' is in the wordlist
// streamChecker.query('g');    // return false
// streamChecker.query('h');    // return false
// streamChecker.query('i');    // return false
// streamChecker.query('j');    // return false
// streamChecker.query('k');    // return false
// streamChecker.query('l');    // return true, because 'kl' is in the wordlist

/**
 * @param {string[]} words
 */
var StreamChecker = function(words) {
// The key is inserting the words into a trie in REVERSE order.
// This way, the entire stream of characters can be preserved as a string and
// this string is checked in reverse order whether a fragment exists in trie.
    // ex. add ["blue", "bird"] into trie
    // => trie: {d: {r: {i: {b: {end: true}}}},
    //           e: {u: {l: {b: {end: true}}}}}
    // now query "blue" and "bird"
    // b -> false, no prefix "b"
    // l -> false, no prefix "lb"
    // u -> false, no prefix "ulb"
    // e -> true, "eulb" exists in trie
    // b -> false, no prefix "beulb"
    // i -> false, no prefix "ibeulb"
    // r -> false, no prefix "ribeulb"
    // d -> true, "drib" exists in trie
// Time: O(mn) where n is number of words and m is average length of word
// Space: O(mn)

    // insert all words into trie in reverse order
    this.trie = {};
    words.forEach(word => {
        let currNode = this.trie;
        for (let i = word.length - 1; i >= 0; i--) {
            if (!currNode[word[i]]) currNode[word[i]] = {};
            currNode = currNode[word[i]];
        } 
        currNode["end"] = true;
    });
    
    // if any prefix of str is in trie, return true
    this.hasWord = function(str) {
        let currNode = this.trie;
        for (let i = str.length - 1; i >= 0; i--) {
            if (!currNode[str[i]]) return false;
            currNode = currNode[str[i]];
            if (currNode["end"]) return true;
        }
        return false;
    }
    // currStr holds all the query characters
    this.currStr = '';
};

/** 
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function(letter) {
    this.currStr += letter;
    return this.hasWord(this.currStr);
};

/** 
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */