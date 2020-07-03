//* June 30: Word Search II

// Given a 2D board and a list of words from the dictionary, find all words in the board.

// Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

// Example:
// Input: 
// board = [
//   ['o','a','a','n'],
//   ['e','t','a','e'],
//   ['i','h','k','r'],
//   ['i','f','l','v']
// ]
// words = ["oath","pea","eat","rain"]

// Output: ["eat","oath"]
 
// Note:
// All inputs are consist of lowercase letters a-z.
// The values of words are distinct.

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    // Since words can start with the same letters, it is most efficient to 
    // utilize a trie so we only need to scan through the entire board once
    // Time: O(nm) where n is number of words and m is average length of a word
    const createTrie = function() {
        const root = {};
        // trie will be a chain of objects: T: {R: {I: {E: {end: 'trie'}}}}
        for (let word of words) {
            let node = root;
            for (let char of word) {
                if (!node.hasOwnProperty(char)) node[char] = {};
                node = node[char];
            }
            node.end = word;    // finalized word in {} of last char
        }
        return root;
    }
    
    // DFS scanning to see if a neighboring letter is the next one in trie 
    const searchWord = function(node, x, y) {
        // end of word found so push into the found array
        if (node.end !== undefined) {
            found.push(node.end);
            node.end = undefined;   // only one instance of word in found array
        }
        // if out of bounds, then backtrack
        if (x < 0 || x >= board.length) return;
        if (y < 0 || y >= board[0].length) return;
        // for each letter, go in all four directions
        const letter = board[x][y];
        if (!node.hasOwnProperty(letter)) return;
        board[x][y] = '-';      // marked searched so letter is not used twice 
        searchWord(node[letter], x - 1, y);
        searchWord(node[letter], x, y - 1);
        searchWord(node[letter], x + 1, y);
        searchWord(node[letter], x, y + 1);
        board[x][y] = letter;   // revert back to original for next search
    }
    
    const found = [], root = createTrie();
    // implement the DFS helper function on every letter in board
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            searchWord(root, i, j);
        }
    }
    return found;
};