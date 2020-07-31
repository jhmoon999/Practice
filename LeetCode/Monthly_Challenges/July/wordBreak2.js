//* July 30: Word Break II

// Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.

// Note:
// The same word in the dictionary may be reused multiple times in the segmentation.
// You may assume the dictionary does not contain duplicate words.

// Example 1:
// Input:
// s = "catsanddog"
// wordDict = ["cat", "cats", "and", "sand", "dog"]
// Output:
// [
//   "cats and dog",
//   "cat sand dog"
// ]

// Example 2:
// Input:
// s = "pineapplepenapple"
// wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
// Output:
// [
//   "pine apple pen apple",
//   "pineapple pen apple",
//   "pine applepen apple"
// ]
// Explanation: Note that you are allowed to reuse a dictionary word.

// Example 3:
// Input:
// s = "catsandog"
// wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output:
// []

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
// Depth-first-search with memoization and using a set
// Time: O(n^2) - memoization cuts down O(2^n) to O(n^2) due to avoiding repeat
// substring checks, and using set.has is O(1) vs array.includes which is O(m)
// Space: O(m + n) - uses an object for memoization O(n) and set O(m)
    
    // memo will store previously encountered substrings 
    // ex. "catsanddog", ["cat", "cats", "and", "sand", "dog"]
    // save "and dog" so that both "cat sand" and "cats and" can use it
    const memo = {};
    
    // convert wordDict to a set to reduce time on checking if substring is 
    // within wordDict
    const wordSet = new Set();
    wordDict.forEach(word => wordSet.add(word));
    
    const findWord = function(i) {
        if (memo[i]) return memo[i];
        if (i === s.length) return [''];   
        let strList = [];
        for (let j = i + 1; j <= s.length; j++) {
            if (wordSet.has(s.slice(i, j))) {
                let curr = s.slice(i, j);
                let rest = findWord(j);
                rest.forEach(word => {
                    if (word === '') strList.push(curr); 
                    else strList.push(curr + ' ' + word);
                });
            }
        }
        memo[i] = strList; 
        return strList;
    }
    return findWord(0);
    
// Depth-first-search 
// Time: O(m * 2^n) - there are at worst 2^n-1 possible paritions of a string
// of length n and checking each one with wordDict.includes takes O(m) time
// Space: O(1)
// Time Limit Exceeded - Passed 31/36 cases
    // const findWord = function(i) {
    //     if (i === s.length) return [''];   // indicate end of s 
    //     let strList = [];
    //     for (let j = i + 1; j <= s.length; j++) {
    //         if (wordDict.includes(s.slice(i, j))) {
    //             // if wordDict has the current substring, we want to keep
    //             // the substring and run findWord on the rest of s
    //             // ex. "theskyisblue", ["the", "sky", "is", "blue"]
    //             // => str = "the" + " " + findWord("skyisblue")
    //             // =>     = "the" + " " + "sky" + " " + findWord("isblue")
    //             let curr = s.slice(i, j);
    //             let rest = findWord(j);
    //             // rest can be three things:
    //             // 1) [''] - end of s reached, so nothing is appended to curr
    //             // 2) ["sky is blue"] - valid substring, so append to curr
    //             // 3) [] - invalid substring (not found in wordDict)
    //                 // ex. "theskyisblueX" - since "X" is not found in 
    //                 // wordDict, findWord("X") will return [] which will 
    //                 // make findWord("blueX") also [], and 
    //                 // findWord("isblueX") [], and so on
    //             rest.forEach(word => {
    //                 if (word === '') strList.push(curr); 
    //                 else strList.push(curr + ' ' + word);
    //             });
    //         }
    //     }
    //     return strList;
    // }
    // return findWord(0);
};